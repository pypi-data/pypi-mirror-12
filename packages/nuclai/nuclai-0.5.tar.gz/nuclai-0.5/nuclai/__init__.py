# Package information for PYPI.
__name__ = 'nuclai'
__author__ = 'alexjc'

# Check version numbers.
import sys
ver = sys.version_info
assert ver.major == 3 and ver.minor >= 4, "Unsupported Python version."

# Call the main entry point.
def run():
    from .__main__ import main
    sys.exit(main(sys.argv))
