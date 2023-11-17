const onLogout = () => {
  const env = process.env;
  const API_BASE_URL = env['NEXT_PUBLIC_BASE_URL'];
  const isEn = window.location.href.indexOf('/en/');
  if (isEn) {
    window.location.replace(`${API_BASE_URL}/en/auth/signout`);
  } else {
    window.location.replace(`${API_BASE_URL}/id/auth/signout`);
  }
};

export default onLogout;
