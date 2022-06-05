import config from '@config';
import { verify } from 'jsonwebtoken';

const authCookieName = '_vanhack_session';

const validateAccessToken = token => {
  try {
    if (!token) return false;

    const secret = config.API_SECRET;
    verify(token, secret);
    return true;
  } catch (e) {
    return false;
  }
};

const getCookie = (cname, cookies) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(cookies);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

// important to avoid 400 Bad Request Request Header Or Cookie Too Large
// this function can be removed in the future
const clearOldCookies = () => {
  const cookies = ['a8d7b36x', '2a17a939', 'd449d1f4', 'c655851d'];
  cookies.forEach(cookie => {
    document.cookie = `${cookie}=;domain=.vanhack.com;expires=Thu,01 Jan 1970 00:00:00 GMT;path=/`;
    document.cookie = `${cookie}=;domain=.vanhack.dev;expires=Thu,01 Jan 1970 00:00:00 GMT;path=/`;
    document.cookie = `${cookie}=;expires=Thu,01 Jan 1970 00:00:00 GMT;path=/`;
  });
};

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};domain=${config.COOKIE_DOMAIN};${expires};path=/`;

  if (config.MODE === 'local') {
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  } else {
    document.cookie = `${cname}=${cvalue};domain=${config.COOKIE_DOMAIN};${expires};path=/`;
  }
};

const getAccessTokenFromCookie = cookies => {
  try {
    const state = getCookie(authCookieName, cookies);
    // console.log('state', state);
    return state;
  } catch {
    return undefined;
  }
};

const setAccessTokenCookie = token => {
  setCookie(authCookieName, token, 365);
};

const clearAccessTokenCookie = () => {
  setCookie(authCookieName, null, -1);
  try {
    window.INITIAL_STATE = null;
  } catch {
    // do nothing
  }
};

const doesSessionHaveValidCookie = cookies => {
  try {
    const parsedAccessToken = getAccessTokenFromCookie(cookies);

    return validateAccessToken(parsedAccessToken);
  } catch {
    return false;
  }
};

export {
  getCookie,
  setCookie,
  clearAccessTokenCookie,
  getAccessTokenFromCookie,
  authCookieName,
  setAccessTokenCookie,
  validateAccessToken,
  doesSessionHaveValidCookie,
  clearOldCookies,
};
