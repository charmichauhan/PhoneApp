import axios from 'axios';
import * as API from '../api';

export const types = {
  ADD_CONTACT: 'ADD_CONTACT',
  REMOVE_CONTACT: 'REMOVE_CONTACT',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  INPUT_CONTACT_NAME: 'INPUT_CONTACT_NAME',
  INPUT_CONTACT_LASTNAME: 'INPUT_CONTACT_LASTNAME',
  INPUT_CONTACT_DOB: 'INPUT_CONTACT_DOB',
  INPUT_CONTACT_PHONENUMBER: 'INPUT_CONTACT_PHONENUMBER',
  INPUT_SEARCH_PARAM: 'INPUT_SEARCH_PARAM',
  CONTACTS_TOGGLE_SORT: 'CONTACTS_TOGGLE_SORT',
  TOGGLE_CONTACT_MODAL_STATE : 'TOGGLE_CONTACT_MODAL_STATE',
  TOGGLE_CONTACT_NESTED_MODAL_STATE : 'TOGGLE_CONTACT_NESTED_MODAL_STATE',
  TOGGLE_FAVORITE_CONTACT: 'TOGGLE_FAVORITE_CONTACT',
  TOGGLE_LIST_TYPE: 'TOGGLE_LIST_TYPE',
  FILTER_SEARCH_RESULT: 'FILTER_SEARCH_RESULT',
  GET_CONTACTS_START: 'GET_CONTACTS_START',
  GET_CONTACTS_FINISHED: 'GET_CONTACTS_FINISHED',
  GET_CONTACTS_ERROR: 'GET_CONTACTS_ERROR'
};

export const SortColumns = {
  ID: "ID",
  NAME: "NAME",
  LASTNAME: "LASTNAME",
  DOB: "DOB",
  PHONENUMBER: "PHONENUMBER"
};

export const ListTypes = {
  ALL: "ALL",
  FAVORITES: "FAVORITES"
};

export const getContacts = () => {
    debugger
  return function (dispatch) {
    dispatch({
      type: types.GET_CONTACTS_START
    });

    axios.get(API.GetContactsRequest())
      .then(res => {
        dispatch({
          type: types.GET_CONTACTS_FINISHED,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: types.GET_CONTACTS_ERROR,
          payload: err.data
        });
      })
  }
}

export const sortByColumn = (column = SortColumns.ID) => {
  return function (dispatch) {
    dispatch({
      type: types.CONTACTS_TOGGLE_SORT,
      payload: column
    });
  };
};

export const add = (id, name, lastname, DOB, phonenumber) => {
  return function (dispatch) {

    axios.post(API.CreateContactReqest(), { Id:id, name: name, lastname: lastname, DOB: DOB, TelNo: phonenumber })
      .then(res => {
        dispatch({
          type: types.ADD_CONTACT,
          payload: { id, name, lastname, DOB, phonenumber }
        });
      })
      .catch(err => console.log(err.data))
  };
};

export const remove = (id) => {
  return function (dispatch) {

    axios.delete(API.DeleteContactReqest(), { data: {Id: id} })
      .then(x => {
        dispatch({
          type: types.REMOVE_CONTACT,
          payload: id
        });
      })
      .catch(err => console.log(err.data))
  };
};

export const update = (id, activeObject = {}) => {
  return function (dispatch) {
    axios.put(API.UpdateContactReqest(), { name: activeObject.name,  lastname: activeObject.lastname,  DOB: activeObject.DOB, tel_no: activeObject.phonenumber,  Id: id} )
      .then(x => {
        dispatch({
          type: types.UPDATE_CONTACT,
          payload: {
            Id: id,
            activeObject: activeObject
          }
        });
      })
      .catch(err => console.log(err.data))
  };
};
export const inputName = (value = "", type = false) => {
    return function (dispatch) {
        dispatch({
            type: types.INPUT_CONTACT_NAME,
            payload: {
                value: value,
                type: type
            }
        });
    };
};
export const inputlastName = (value = "", type = false) => {
  return function (dispatch) {
    dispatch({
      type: types.INPUT_CONTACT_LASTNAME,
      payload: {
        value: value,
        type: type
      }
    });
  };
};
export const inputDOB = (value = "", type = false) => {
    return function (dispatch) {
        dispatch({
            type: types.INPUT_CONTACT_DOB,
            payload: {
                value: value,
                type: type
            }
        });
    };
};
export const inputPhonenumber = (value = "", type = false) => {
  return function (dispatch) {
    dispatch({
      type: types.INPUT_CONTACT_PHONENUMBER,
      payload: {
        value: value,
        type: type
      }
    });
  };
};

export const inputSearchParam = (value = "") => {
  return function (dispatch) {
    dispatch({
      type: types.INPUT_SEARCH_PARAM,
      payload: value
    });
  };
};

export const toggleModal = (objectId = null) => {
  return function (dispatch) {
    dispatch({
      type: types.TOGGLE_CONTACT_MODAL_STATE,
      payload: objectId
    });
  };
};

export const toggleNestedModal = (object = null) => {
  return function (dispatch) {
    dispatch({
      type: types.TOGGLE_CONTACT_NESTED_MODAL_STATE,
      payload: {
        isNestedOpened : object.isNestedOpened,
        id: object.objectId
      }
    });
  };
};

export const toggleFavorite = (contactId, isFavorite) => {
  return function (dispatch) {

    axios.put(API.UpdateContactReqest(), { id: contactId, isFavorite: isFavorite ? 0 : 1 })
    .then(x => {

      dispatch({
          type: types.TOGGLE_FAVORITE_CONTACT,
          payload: contactId
      });
    }).catch(error => console.error(error));
  };
};



export const toggleListType = (listType = ListTypes.ALL) => {
  return function (dispatch) {
      dispatch({
          type: types.TOGGLE_LIST_TYPE,
          payload: listType
      });
  };
};

export const filterSearchResult = (value = "") => {
  return function (dispatch) {
      dispatch({
          type: types.FILTER_SEARCH_RESULT,
          payload: value
      });
  };
};
