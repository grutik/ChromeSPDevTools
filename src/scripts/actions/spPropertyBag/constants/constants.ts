export const ActionsId  = {
    CREATE_PROPERTY: 'CREATE_PROPERTY',
    UPDATE_PROPERTY: 'UPDATE_PROPERTY',
    DELETE_PROPERTY: 'DELETE_PROPERTY',
    SET_ALL_PROPERTIES: 'SET_ALL_PROPERTIES',
    SET_FILTER_TEXT: 'SET_FILTER_TEXT',
    SET_WORKING_ON_IT: 'SET_WORKING_ON_IT',
    SET_MESSAGE_DATA: 'SET_MESSAGE_DATA',
    SET_USER_PERMISSIONS: 'SET_USER_PERMISSIONS'
}


export const constants  = {
    COMPONENT_DIV_ID: 'spPropBaseDiv',
    TEXTBOX_PREFIX: 'spPropInput_',
    UNDEFINED_STRING: 'undefined',
    STRING_STRING: 'string',
    EMPTY_STRING: '',
    PERCET_STRING:'%',
    MODAL_DIALOG_TITLE: 'Web Property bags',
    MODAL_DIALOG_WIDTH: '700px',
    CONFIRM_DELETE_PROPERTY: 'Are you sure you want to remove this property?',
    EMPTY_TEXTBOX_ERROR_MESSAGE: 'The value can not be empty',
    SAVE_TEXT:'Save',
    DELETE_TEXT:'Delete',
    CANCEL_TEXT:'Cancel',
    EDIT_TEXT:'Edit',
    CREATE_TEXT: 'Create',
    NEW_PROPERTY_TITLE: 'New web property',
    NEW_PROPERTY_KEY_TITLE: 'New property name',
    NEW_PROPERTY_KEY_PLACEHOLDER: 'Property Name',
    NEW_PROPERTY_VALUE_TITLE: 'New property value',
    NEW_PROPERTY_VALUE_PLACEHOLDER: 'Property Value',
    MESSAGE_USER_NO_PERMISSIONS:'The current user does NOT have permissions to work with the web property bags.',
    MESSAGE_PROPERTY_CREATED:'A new property has been created.',
    MESSAGE_PROPERTY_DELETED:'The selected property has been deleted.',
    MESSAGE_PROPERTY_UPDATED:'The selected property has been updated.',
    PROPERTY_REST_REQUEST_URL: '/_api/web/allProperties',
    PROPERTY_REST_PREFIX: 'OData_',
    PROPERTY_REST_DECODE_REGEX:/_x00([0-9A-F]{2})_/gi,
    PROPERTY_REST_UNDERSCORE_REGEX:/_/gi,
    PROPERTY_REST_UNDERSCORE_PREFIX_REGEX:/x00/gi,
    PROPERTY_REST_DOUBLEQUOTES_REGEX:/"/g,
    PROPERTY_REST_DOUBLEQUOTES: '&quot;'
}
