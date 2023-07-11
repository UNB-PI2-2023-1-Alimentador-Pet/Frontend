import esp32 from './esp32';
import api from './api';

export const sendWiFiData = async data => {
  let response = {};

  console.log(data);

  try {
    response = await esp32.post('/wifi', data);
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const getStatus = async () => {
  let response = {};

  try {
    response = await esp32.get('/verify_connection');
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const restart = async () => {
  let response = {};

  try {
    response = await esp32.post('/restart');
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const getFeeders = async (hash, token) => {
  let response = {};

  try {
    response = await api.get(`/feeders/${hash}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const updateFeeder = async (data, hash, token) => {
  let response = {};

  try {
    response = await api.put(`/feeders/${hash}`, data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return response;
};
