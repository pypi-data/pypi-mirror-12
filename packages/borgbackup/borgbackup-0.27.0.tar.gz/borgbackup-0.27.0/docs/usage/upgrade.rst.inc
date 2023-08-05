.. _borg_upgrade:

borg upgrade
------------
::

    usage: borg upgrade [-h] [-v] [--no-files-cache] [--umask M]
                        [--remote-path PATH] [-n]
                        [REPOSITORY]
    
    upgrade a repository from a previous version
    
    positional arguments:
      REPOSITORY          path to the repository to be upgraded
    
    optional arguments:
      -h, --help          show this help message and exit
      -v, --verbose       verbose output
      --no-files-cache    do not load/update the file metadata cache used to
                          detect unchanged files
      --umask M           set umask to M (local and remote, default: 63)
      --remote-path PATH  set remote path to executable (default: "borg")
      -n, --dry-run       do not change repository

Description
~~~~~~~~~~~

upgrade an existing Borg repository in place. this currently
only support converting an Attic repository, but may
eventually be extended to cover major Borg upgrades as well.

it will change the magic strings in the repository's segments
to match the new Borg magic strings. the keyfiles found in
$ATTIC_KEYS_DIR or ~/.attic/keys/ will also be converted and
copied to $BORG_KEYS_DIR or ~/.borg/keys.

the cache files are converted, from $ATTIC_CACHE_DIR or
~/.cache/attic to $BORG_CACHE_DIR or ~/.cache/borg, but the
cache layout between Borg and Attic changed, so it is possible
the first backup after the conversion takes longer than expected
due to the cache resync.

it is recommended you run this on a copy of the Attic
repository, in case something goes wrong, for example:

    cp -a attic borg
    borg upgrade -n borg
    borg upgrade borg

upgrade should be able to resume if interrupted, although it
will still iterate over all segments. if you want to start
from scratch, use `borg delete` over the copied repository to
make sure the cache files are also removed:

    borg delete borg

the conversion can PERMANENTLY DAMAGE YOUR REPOSITORY! Attic
will also NOT BE ABLE TO READ THE BORG REPOSITORY ANYMORE, as
the magic strings will have changed.

you have been warned.
