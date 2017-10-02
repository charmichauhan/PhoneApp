import { types, SortColumns } from '../actions/ContactsActions';

export const initialState = {
  data: [
    {id: 0, name: "Johny", phonenumber: 88228844},
    {id: 1, name: "Bob", phonenumber: 11223344},
    {id: 2, name: "Elisa", phonenumber: 99887766},
    {id: 3, name: "Bart", phonenumber: 22332233}
  ],
  fetching: false,
  fetched: false,
  error: null,
  input: {
    name: "",
    phonenumber: ""
  },
  sorting: {
    asc: true,
    column: SortColumns.ID
  },
  modal: {
    isOpen: false,
    isNestedOpened: false,
    activeId: null,
    activeObject: { name: '', phonenumber: ''}
  }

};

export default (state = initialState, action) => {

  switch (action.type) {
    case types.ADD_CONTACT:
      return {
        ...state,
        data: dataSort([...state.data, action.payload], state.sorting.asc, state.sorting.column),
        input: {
          name: "",
          phonenumber: ""
        }
      };
    case types.REMOVE_CONTACT:
    return Object.assign({}, state, {
        data: state.data.filter((x,i) => i !== action.payload),
        modal: {
          isOpen: false,
          isNestedOpened: false,
          activeId: null,
          activeObject: { name: '', phonenumber: ''}
        }
        });
    case types.UPDATE_CONTACT:
      return {
        ...state,
        data: state.data.map((x,i) => i === action.payload.id ? action.payload.activeObject : x),
        modal: {
          isOpen : false,
          isNestedOpened : false,
          activeId : null,
          activeObject : { name: '', phonenumber: ''}
        }
      };
    case types.INPUT_CONTACT_NAME:
      return action.payload.type ? { //If true we save in modal.activeObject.name else we save in input.name
        ...state,
        modal : {
          ...state.modal,
          activeObject : {
            ...state.modal.activeObject,
            name : action.payload.value
          }
        }
      } : {
        ...state,
        input: { ...state.input, name: action.payload.value }
      };
    case types.INPUT_CONTACT_PHONENUMBER:
    return action.payload.type ? { //If true we save in modal.activeObject.phonenumber else we save in input.phonenumber
      ...state,
      modal : {
        ...state.modal,
        activeObject : {
          ...state.modal.activeObject,
          phonenumber : action.payload.value
        }
      }
    } : {
      ...state,
      input: { ...state.input, phonenumber: action.payload.value }
    };
    case types.CONTACTS_TOGGLE_SORT:
      let sortDirection = state.sorting.column === action.payload ? !state.sorting.asc : true;
        return {
        ...state,
        data: dataSort(state.data, sortDirection, action.payload),
        sorting: {
          asc: sortDirection,
          column: action.payload
        }
      };
    case types.TOGGLE_CONTACT_MODAL_STATE:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: action.payload !== null,
          activeId: action.payload,
          activeObject: action.payload >=0 ? state.data[action.payload] : { name: '', phonenumber: ''}

        }
      };
      case types.TOGGLE_CONTACT_NESTED_MODAL_STATE:
        return {
          ...state,
          modal: {
            ...state.modal,
            isNestedOpened: action.payload.isNestedOpened
          }
        };
    default:
      return state;

  // eslint-disable-next-line
  };

};

const dataSort = (data, asc, column) => {
  let sortedData = [];

  switch (column){
    case SortColumns.PHONENUMBER:
      sortedData = data.sort((a, b) => { return a.phonenumber < b.phonenumber });
      break;
    case SortColumns.NAME:
      sortedData = data.sort((a, b) => { return a.name.toLowerCase() < b.name.toLowerCase() });
      break;
    case SortColumns.ID:
    default:
      sortedData = data.sort((a, b) => { return a.id - b.id; });
      break;
  }

  return asc ? sortedData : sortedData.reverse();
};