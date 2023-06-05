export const getJWTfromCookie = cookieArray => {
  const [cookie] = cookieArray;
  const token = cookie.split(';')[0].split('=')[1];
  return 'Bearer ' + token;
};
