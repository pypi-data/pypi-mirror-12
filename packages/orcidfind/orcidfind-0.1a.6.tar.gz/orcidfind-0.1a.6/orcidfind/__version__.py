# Single source of metadata about the project that's used by setup.py and
# docs/conf.py

# Some segments of public version identifer (PEP 440)
VERSION_RELEASE = "0.1"
VERSION_PRE_RELEASE = "a.6"    # e.g., "a4", "b1", "rc3" or "" (final release)
VERSION_POST_RELEASE = ""   # e.g., ".post1"

VERSION = VERSION_RELEASE + VERSION_PRE_RELEASE + VERSION_POST_RELEASE
