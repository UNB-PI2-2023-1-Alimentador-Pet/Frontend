import api from './api';

export const getSchedules = async (userHash, token) => {
  let response = {};

  try {
    response = await api.get(`/schedules/${userHash}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return response;
};

// export const authUser = async data => {
//   let response = {};

//   try {
//     response = await api.post('/users/login', data);
//   } catch (err) {
//     console.log(err);
//   }

//   return response;
// };

export const createSchedule = async (data, token) => {
  let response = {};

  try {
    response = await api.post('/schedules/new', data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const updateSchedule = async (hour, quantity, userHash, token, data) => {
  let response = {};

  try {
    response = await api.put(
      `/schedules/edit/${hour}_${quantity}_${userHash}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      },
    );
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const deleteSchedule = async (hour, quantity, userHash, token) => {
  let response = {};

  try {
    response = await api.delete(
      `/schedules/delete/${hour}_${quantity}_${userHash}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
  } catch (err) {
    console.log(err);
  }

  return response;
};

// export const updateUser = async (data, hash, token) => {
//   let response = {};

//   try {
//     response = await api.put(`/users/edit/${hash}`, data, {
//       headers: {
//         Authorization: token,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }

//   return response;
// };
