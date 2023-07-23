import api from './api';

export const getHistories = async (hash, token) => {
  let response = {};

  try {
    response = await api.get(`/histories/${hash}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return response;
};
