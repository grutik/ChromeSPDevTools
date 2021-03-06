import { ActionsId as actions, constants } from './../constants/constants'
import { IProperty, ISpPropertyBagActionCreatorsMapObject } from '../interfaces/spPropertyBagInterfaces'
import { ActionCreator, ActionCreatorsMapObject, Dispatch } from 'redux'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import SpPropertyBagApi from '../api/spPropertyBagApi'
import { IMessageData, IAction } from './../../common/interfaces'


const api = new SpPropertyBagApi();

const modifyProperty: ActionCreator<IAction<IProperty>> = (property: IProperty): IAction<IProperty> => {
    return {
        type: actions.UPDATE_PROPERTY,
        payload: property
    }
}
const removeProperty: ActionCreator<IAction<IProperty>> = (property: IProperty): IAction<IProperty> => {
    return {
        type: actions.DELETE_PROPERTY,
        payload: property
    }
}
const addProperty: ActionCreator<IAction<IProperty>> = (property: IProperty): IAction<IProperty> => {
    return {
        type: actions.CREATE_PROPERTY,
        payload: property
    }
}
const setAllProperties: ActionCreator<IAction<Array<IProperty>>> = (properties: Array<IProperty>): IAction<Array<IProperty>> => {
    return {
        type: actions.SET_ALL_PROPERTIES,
        payload: properties
    }
}
const setFilterText: ActionCreator<IAction<string>> = (filterText: string): IAction<string> => {
    return {
        type: actions.SET_FILTER_TEXT,
        payload: filterText
    }
}
const setWorkingOnIt: ActionCreator<IAction<boolean>> = (isWorkingOnIt: boolean): IAction<boolean> => {
    return {
        type: actions.SET_WORKING_ON_IT,
        payload: isWorkingOnIt
    }
}
const setUserHasPermissions: ActionCreator<IAction<boolean>> = (userHasPermission: boolean): IAction<boolean> => {
    return {
        type: actions.SET_USER_PERMISSIONS,
        payload: userHasPermission
    }
}
const setMessageData: ActionCreator<IAction<IMessageData>> = (messageData: IMessageData): IAction<IMessageData> => {
    return {
        type: actions.SET_MESSAGE_DATA,
        payload: messageData
    }
}

const getAllProperties = () => {
    return function (dispatch: Dispatch<IAction<Array<IProperty>>>) {
        return api.getProperties().then(
            (properties: Array<IProperty>) => {
                dispatch(setAllProperties(properties));
            }
        );
    };
}

const createProperty = (property: IProperty) => {
    return function (dispatch: Dispatch<IAction<IProperty>>) {
        dispatch(setWorkingOnIt(true));
        return api.createProperty(property).then(
            (property: IProperty) => {
                dispatch(addProperty(property));
            }
        );
    };
}

const updateProperty = (property: IProperty) => {
    return function (dispatch: Dispatch<IAction<IProperty>>) {
        dispatch(setWorkingOnIt(true));
        return api.updateProperty(property).then(
            (property: IProperty) => {
                dispatch(modifyProperty(property));
            }
        );
    };
}

const deleteProperty = (property: IProperty) => {
    return function (dispatch: Dispatch<IAction<IProperty>>) {
        dispatch(setWorkingOnIt(true));
        return api.deleteProperty(property).then(
            (property: IProperty) => {
                dispatch(removeProperty(property));
            }
        );
    };
}
const checkUserPermissions = (permissionKing: SP.PermissionKind) => {
    return function (dispatch: Dispatch<IAction<IProperty>>) {
        return api.checkUserPermissions(permissionKing).then(
            (hasPermissions: boolean) => {
                if (hasPermissions) {
                    dispatch(setUserHasPermissions(true));
                    dispatch(getAllProperties());
                } else {
                    dispatch(setWorkingOnIt(false));
                    dispatch(setMessageData({
                        showMessage: true,
                        message: constants.MESSAGE_USER_NO_PERMISSIONS,
                        type: MessageBarType.error
                    }));
                }
            }
        );
    };
}

const spPropertyBagActionsCreatorMap: ISpPropertyBagActionCreatorsMapObject = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    checkUserPermissions,
    setFilterText,
    setWorkingOnIt,
    setUserHasPermissions,
    setMessageData
}

export default spPropertyBagActionsCreatorMap;
