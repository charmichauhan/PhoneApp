const BASE_URL = 'http://localhost:8080';

export const GetContactsRequest = () => BASE_URL + '/contacts';
export const DeleteContactReqest = () => BASE_URL + '/contact/id';
export const CreateContactReqest = () => BASE_URL + '/contact';
export const UpdateContactReqest = () => BASE_URL + '/contact/id';
