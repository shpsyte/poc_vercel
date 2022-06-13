import {
  doesSessionHaveValidCookie,
  getAccessTokenFromCookie,
} from '@helpers/Cookie';
import { verify } from 'jsonwebtoken';
import config from '@config';

function parseToken(token) {
  try {
    const secret = config.API_SECRET;
    const verified = verify(token, secret);
    return verified;
  } catch (e) {
    return '';
  }
}

export function authorizeAsAdmin(req, res, next) {
  const isAuthenticated = doesSessionHaveValidCookie(req.headers.cookie);
  const token = getAccessTokenFromCookie(req.headers.cookie);
  const user = parseToken(token);
  const roles =
    user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const isAdmin = roles.includes('Admin');

  if (isAuthenticated && isAdmin) {
    next();
  } else {
    res.status(401).end('unauthorized');
  }
}

export default function authorize(req, res, next) {
  const isAuthenticated = doesSessionHaveValidCookie(req.headers.cookie);

  if (isAuthenticated) {
    next();
  } else {
    res.status(401).end('unauthorized');
  }
}
