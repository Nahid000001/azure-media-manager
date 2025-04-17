import axios from 'axios';

const postURL = process.env.REACT_APP_POST_URL;
const getURL = process.env.REACT_APP_GET_URL;
const putURL = process.env.REACT_APP_PUT_URL;
const deleteURL = process.env.REACT_APP_DELETE_URL;

export const createMedia = async (data) => {
  return axios.post(postURL, data);
};

export const fetchMedia = async () => {
  return axios.get(getURL);
};

export const updateMedia = async (data) => {
  return axios.put(putURL, data);
};

export const deleteMedia = async (id) => {
  return axios.delete(`${deleteURL}?id=${id}`);
};
