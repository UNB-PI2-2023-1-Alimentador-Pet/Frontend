import esp32 from './esp32';

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

export const getDeviceStatus = async () => {
  let response = {};

  try {
    response = await esp32.get('/verify_connection');
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const restartDevice = async () => {
  let response = {};

  try {
    response = await esp32.post('/restart');
  } catch (err) {
    console.log(err);
  }

  return response;
};
