# Python OpenPGP Packet parser and assembler

This module has for puropse to parse and create openPGP packets, following the
[RFC 4880](https://tools.ietf.org/html/rfc4880) specifications.

It convert a nested S-Expression describing the packets to be converted in a
stream of packets which can then be turned into a RADIX64 file.

It can also take a RADIX64 file as an input and generate a nested S-Expression
representing all the packets given in input.
