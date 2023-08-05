import pbr.version

from .core import Store  # noqa
from .utils import apply_middleware, combine_reducers  # noqa

# compatibility alias
create_store = Store


__version__ = pbr.version.VersionInfo(
    'aioredux').version_string()
