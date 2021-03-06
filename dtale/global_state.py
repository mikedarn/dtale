
DATA = {}
DTYPES = {}
SETTINGS = {}
METADATA = {}
CONTEXT_VARIABLES = {}


def get_data(data_id=None):
    global DATA

    if data_id is None:
        return DATA
    return DATA.get(data_id)


def get_dtypes(data_id=None):
    global DTYPES

    if data_id is None:
        return DTYPES
    return DTYPES.get(data_id)


def get_settings(data_id=None):
    global SETTINGS

    if data_id is None:
        return SETTINGS
    return SETTINGS.get(data_id)


def get_metadata(data_id=None):
    global METADATA

    if data_id is None:
        return METADATA
    return METADATA.get(data_id)


def get_context_variables(data_id=None):
    global CONTEXT_VARIABLES

    if data_id is None:
        return CONTEXT_VARIABLES
    return CONTEXT_VARIABLES.get(data_id)


def set_data(data_id, val):
    global DATA

    DATA[data_id] = val


def set_dtypes(data_id, val):
    global DTYPES

    DTYPES[data_id] = val


def set_settings(data_id, val):
    global SETTINGS

    SETTINGS[data_id] = val


def set_metadata(data_id, val):
    global METADATA

    METADATA[data_id] = val


def set_context_variables(data_id, val):
    global CONTEXT_VARIABLES

    CONTEXT_VARIABLES[data_id] = val


def cleanup():
    """
    Helper function for cleanup up state related to a D-Tale process with a specific port

    :param port: integer string for a D-Tale process's port
    :type port: str
    """
    global DATA, DTYPES, SETTINGS, METADATA, CONTEXT_VARIABLES

    DATA = {}
    SETTINGS = {}
    DTYPES = {}
    METADATA = {}
    CONTEXT_VARIABLES = {}
