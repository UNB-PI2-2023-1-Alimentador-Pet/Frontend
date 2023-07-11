export const getJWTfromCookie = cookieArray => {
  const [cookie] = cookieArray;
  const token = cookie.split(';')[0].split('=')[1];
  return 'Bearer ' + token;
};

export const convertDaysOfWeek = days => {
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const convertedDays = days.map(day => daysOfWeek[day]);
  return convertedDays.join(', ');
};
