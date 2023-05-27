import api from './api';

export const getUser = async (id, token) => {
  let response = {};

  try {
    response = await api.get(`/users/${id}`, {
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
    response = await api.post('/user/login', data);
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const createUser = async data => {
  let response = {};

  try {
    response = await api.post('/user/signup', data);
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const updateUser = async (data, id, token) => {
  const response = await api.patch(`/users/${id}`, data, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
