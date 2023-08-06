positional arguments
====================

:path:     path to newroot
:command:  optional command to run

	Similar to chroot(1), if unspecified this defaults to $SHELL from the
	host environment and if that's unset it executes /bin/sh.

optional arguments
==================

-h, --help                              show this help message and exit

--version                               show program's version number and exit

--no-mounts                             disable the default bind mounts

	Use this to obtain a standard chroot environment without any bind
	mounts that you'd expect when using chroot(1).

--hostname HOSTNAME                     specify the chroot hostname

	In order to set the domain name as well, pass an FQDN instead of a
	singular hostname.

--skip-chdir                            do not change working directory to '/'

	Unlike chroot(1), this currently doesn't limit you to only using it
	when the new root isn't '/'. In other words, you can use a new chroot
	environment on the current host system rootfs with one caveat: any
	absolute paths will use the new rootfs.

-B SRC[:DEST], --bind SRC[:DEST]        specify custom bind mount

	In order to mount the same source to multiple destinations, use the
	SRC:DEST syntax. For example, the following will bind mount '/srv/data'
	to /srv/data and /home/user/data in the chroot::
	
	    pychroot -B /srv/data -B /srv/data:/home/user/data /path/to/chroot

-R SRC[:DEST], --rbind SRC[:DEST]       specify custom recursive bind mount

--ro SRC[:DEST], --readonly SRC[:DEST]  specify custom readonly bind mount

	Readonly, recursive bind mounts aren't currently supported on Linux so
	this has to be a standalone option for now. Once they are, support for
	them and other mount attributes will be added as an extension to the
	mount point argument syntax.
