#
# Copyright (c) 2014 LexisNexis Risk Data Management Inc.
#
# This file is part of the RadSSH software package.
#
# RadSSH is free software, released under the Revised BSD License.
# You are permitted to use, modify, and redsitribute this software
# according to the Revised BSD License, a copy of which should be
# included with the distribution as file LICENSE.txt
#

'''
KnownHosts Module
Alternative to Paramiko HostKey checking, with better support for more
elaborate constructs in the known_hosts file format.
'''
from __future__ import print_function  # Requires Python 2.6 or higher


import binascii
import os
import threading
import base64
import fnmatch
import warnings
import logging
from collections import defaultdict

import paramiko


# Keep a dict of the files we have loaded
_loaded_files = {}
_lock = threading.RLock()
unconditional_add = False


def printable_fingerprint(k):
    '''Convert key fingerprint into OpenSSH printable format'''
    fingerprint = k.get_fingerprint()
    # Handle Python3 bytes or Python2 8-bit string style...
    if isinstance(fingerprint[0], int):
        seq = [int(x) for x in fingerprint]
    else:
        seq = [ord(x) for x in fingerprint]
    return ':'.join(['%02x' % x for x in seq])


def load(filename):
    '''Load a known_hosts file, if not already loaded'''
    with _lock:
        if filename not in _loaded_files:
            try:
                _loaded_files[filename] = KnownHosts(filename)
            except IOError:
                _loaded_files[filename] = KnownHosts()
    return _loaded_files[filename]


def find_first_key(hostname, known_hosts_files, port=22):
    '''
    Look for first matching host key in a sequence of known_hosts files
    '''
    for f in known_hosts_files:
        x = load(f)
        try:
            entry = next(x.matching_keys(hostname, port))
            return entry
        except StopIteration:
            pass
    return None


class KnownHosts (object):
    '''
    Implementation of SSH known_hosts file as a searchable object.
    Instead of Paramiko's lookup() returning a Dict (forcing a 1:1
    relation of (host, key_type) to key), KnownHosts search is an
    iterator of all matching keys, including support for markers
    @revoked and @cert-authority. See sshd man page for details.
    '''

    def __init__(self, filename=None):
        '''
        Load known_hosts file, or create an empty dictionary
        '''
        self._lines = []
        self._index = defaultdict(list)
        self._hashed_hosts = []
        self._wildcards = []
        self._filename = filename
        if filename is not None:
            self.load(filename)

    def add(self, hostname, key, hash_hostname=False):
        '''
        Add a host key entry to the table.  Any existing entries for
        ``hostname`` pair will be preserved.  Deletion or replacement
        is not implemented, but _lines entries can be flagged for
        deletion by setting entry to None.
        '''
        # Per sshd man page on known_hosts:
        # It is permissible (but not recommended) to have several lines or
        # different host keys for the same names.
        # So if called to add, it is not necessary to check for duplication
        # here, and hope that the caller is handling conflicts.
        with _lock:
            lineno = len(self._lines)
            keyval = key.get_base64()
            keytype = key.get_name()
            if hash_hostname or hostname.startswith('|'):
                if not hostname.startswith('|'):
                    # Add index entry for unhashed hostname
                    self._index[hostname].append(lineno)
                    hostname = paramiko.HostKeys.hash_host(hostname)
                else:
                    self._hashed_hosts.append((hostname, lineno))
            else:
                self._index[hostname].append(lineno)
            self._lines.append('%s %s %s' %
                               (hostname, keytype, keyval))
        logging.getLogger('radssh.keys').info('Added new known_hosts entry for %s [%s]' % (hostname, printable_fingerprint(key)))
        return HostKeyEntry([hostname], key, lineno=lineno)

    def load(self, filename):
        '''
        Load and index keys from OpenSSH known_hosts file. In order to
        preserve lines, the text content is stored in a list (_lines),
        and indexes are used to keep line number(s) per host, as well as
        index lists for hashed hosts and wildcard matches, which would
        both need to be sequentially scanned if the host is not found
        in the primary index lookup.

        If this method is called multiple times, the host keys are appended,
        not cleared.  So multiple calls to `load` will produce a concatenation
        of the loaded files, in order.
        '''
        offset = len(self._lines)
        with open(filename, 'r') as f:
            for lineno, line in enumerate(f):
                self._lines.append(line.rstrip('\n'))
                try:
                    e = HostKeyEntry.from_line(line, lineno)
                    if e is not None:
                        # Just construct the host index entries during load
                        # Identify as hashed entry, negation, wildcard, or regular
                        # Keep the index by the source lineno (plus offset, if
                        # loading multiple files), as the matching needs the
                        # whole line for negation logic, and to pick up the
                        # optional @marker...
                        for h in e.hostnames:
                            if h.startswith('|'):
                                self._hashed_hosts.append((h, offset + lineno))
                            elif h.startswith('!'):
                                # negation - do not index
                                pass
                            elif '*' in h or '?' in h:
                                self._wildcards.append((h, offset + lineno))
                            else:
                                self._index[h].append(offset + lineno)
                except (UnreadableKey, TypeError) as e:
                    logging.getLogger('radssh.keys').warning(
                        'Skipping unloadable key line (%s:%d): %s' % (filename, lineno + 1, line))
                    pass

    def save(self, filename=None):
        '''
        Save host keys into a file, in the format used by OpenSSH.  Keys added
        or modified after load will appear at the end of the file.  Original
        lines will be preserved (format and comments).  If multiple files
        were loaded, the saved file will be the concatenation of the loaded
        source files.
        '''
        if not filename:
            filename = self._filename
        with open(filename, 'w') as f:
            for line in self._lines:
                if line is not None:
                    f.write(line + '\n')

    def matching_keys(self, hostname, port=22):
        '''
        Generator for identifying all the matching HostKey entries for
        a given hostname or IP. Finds matches on exact lookup, hashed
        lookup, and wildcard matching, and pays heed to negation entries.
        '''
        if hostname and port != 22:
            hostname = '[%s]:%d' % (hostname, port)
        for lineno in self._index[hostname]:
            e = HostKeyEntry.from_line(self._lines[lineno], lineno)
            if e and not e.negated(hostname):
                yield e
        for h, lineno in self._hashed_hosts:
            if h.startswith('|1|') and paramiko.HostKeys.hash_host(hostname, h) == h:
                e = HostKeyEntry.from_line(self._lines[lineno], lineno)
                if e:
                    yield e
        for pattern, lineno in self._wildcards:
            if HostKeyEntry.wildcard_match(hostname, pattern):
                e = HostKeyEntry.from_line(self._lines[lineno], lineno)
                if e and not e.negated(hostname):
                    yield e

    def check(self, hostname, key):
        '''
        Return True if the given key is associated with the given hostname
        for any non-negated matched line. If a marker is associated with the
        line, the line does not qualify as a direct key comparison, as it
        is either @revoked, or @cert-authority, which needs a different
        comparison to check.
        '''
        for e in self.matching_keys(hostname):
            if e.key.get_name() == key.get_name() and not e.marker:
                if e.key.get_base64() == key.get_base64():
                    return True
        return False

    def clear(self):
        """
        Remove all host keys from the dictionary.
        """
        self._lines = []
        self._index = defaultdict(list)
        self._hashed_hosts = []
        self._wildcards = []

    def conditional_add(self, host, key, sshconfig):
        '''
        Add new host key, with optional confirmation by the user
        '''
        global unconditional_add
        fingerprint = printable_fingerprint(key)
        with _lock:
            if sshconfig.get('stricthostkeychecking', 'ask') == 'no' or unconditional_add:
                self.add(host, key, sshconfig.get('hashknownhosts', 'no') == 'yes')
            else:
                reply = ''
                while reply.upper() not in ('Y', 'N', 'A'):
                    # reply = raw_input('Accept new %s key [%s] for host %s ? (y/n/a) ' % (key.get_name(), str(key.get_fingerprint()), host))
                    reply = raw_input('Accept new %s key with fingerprint [%s] for host %s ? (y/n/a) ' % (key.get_name(), fingerprint, host))
                if reply.upper() == 'N':
                    return False
                if reply.upper() == 'A':
                    unconditional_add = True
                self.add(host, key, sshconfig.get('hashknownhosts', 'no') == 'yes')
            if self._filename:
                self.save()
        return True


class UnreadableKey(Exception):
    pass


class HostKeyEntry:
    '''
    Close reimplementation of Paramiko HostKeys.HostKeyEntry, with added
    support for markers (@revoked, @cert-authority), SSH1 key format, and
    inclusion of line number for found matches.
    '''

    def __init__(self, hostnames=None, key=None, marker=None, lineno=None):
        self.hostnames = hostnames
        self.key = key
        self.marker = marker
        self.lineno = lineno

    @classmethod
    def from_line(cls, line, lineno=None):
        '''
        Parses the given line of text to find the name(s) for the host,
        the type of key, and the key data.
        '''
        if not line:
            return None
        fields = line.strip().split(' ')
        if not fields or fields[0].startswith('#'):
            return None
        if fields[0].startswith('@'):
            marker = fields[0]
            fields = fields[1:]
        else:
            marker = None

        if len(fields) < 3:
            raise UnreadableKey('Invalid known_hosts line', line, lineno)

        names, keytype, key = fields[:3]
        names = names.split(',')

        # Decide what kind of key we're looking at and create an object
        # to hold it accordingly.
        key = key.encode('ascii')
        # SSH-2 Key format consists of 2 (text) fields
        #     keytype, base64_blob
        if keytype == 'ssh-rsa':
            key = paramiko.RSAKey(data=base64.b64decode(key))
        elif keytype == 'ssh-dss':
            key = paramiko.DSSKey(data=base64.b64decode(key))
        elif keytype == 'ecdsa-sha2-nistp256':
            key = paramiko.ECDSAKey(data=base64.b64decode(key), validate_point=False)
        elif len(fields) > 3:
            # SSH-1 Key format consists of 3 integer fields
            #     bits, exponent, modulus (RSA Only)
            try:
                bits = int(fields[1])
                exponent = int(fields[2])
                modulus = long(fields[3])
                key = paramiko.RSAKey(vals=(exponent, modulus))
            except ValueError:
                raise UnreadableKey('Invalid known_hosts line', line, lineno)
        else:
            raise UnreadableKey('Invalid known_hosts line', line, lineno)

        return cls(names, key, marker, lineno)

    def negated(self, hostname):
        '''
        Check if the hostname is in the entry list of hostnames as a matching
        negated pattern. This indicates that the key represented on the line
        fails to match for the given host, even if it does match other pattern(s)
        on the current line.
        '''
        for pattern in self.hostnames:
            if pattern.startswith('!'):
                if self.wildcard_match(hostname, pattern[1:]):
                    return True
        return False

    @staticmethod
    def wildcard_match(hostname, pattern):
        '''
        Match against patterns using '*' and '?' using simplified fnmatch
        '''
        # Simplified = add steps to disable fnmatch handling of [ and ]
        fn_pattern = ''
        for c in pattern:
            if c == '[':
                fn_pattern += '[[]'
            elif c == ']':
                fn_pattern += '[]]'
            else:
                fn_pattern += c
        return fnmatch.fnmatch(hostname, fn_pattern)
