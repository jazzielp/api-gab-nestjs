import { AuthToken, IUseToken } from '../auth/interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  const decoded = jwt.decode(token) as AuthToken;

  const currentDate = new Date();
  const expiresDate = new Date(decoded.exp);

  try {
    return {
      sub: decoded.sub,
      role: decoded.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token invalid';
  }
};
