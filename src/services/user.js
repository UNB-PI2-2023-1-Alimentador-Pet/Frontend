import api from './api';

export const changePassword = async data => {
  let response = {};

  try {
    response = await api.post('/users/reset-password', data);
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const sendToken = async data => {
  let response = {};

  try {
    response = await api.post('/users/forgot-password', data);
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const getUser = async (hash, token) => {
  let response = {};

  try {
    response = await api.get(`/users/${hash}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const authUser = async data => {
  let response = {};

  try {
    response = await api.post('/users/login', data);
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const createUser = async data => {
  let response = {};

  try {
    response = await api.post('/users/signup', data);
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const updateUser = async (data, hash, token) => {
  let response = {};

  try {
    response = await api.put(`/users/edit/${hash}`, data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return response;
};
