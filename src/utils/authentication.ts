import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';


function createToken(user: string): string {
  const payload = { user };
const token = jwt.sign(payload, 'aslkjdlkasjdlasow', { expiresIn: '1h' });
 return token.toString();
}

function verifyToken(req: Request, res: Response) {
  const token: string | undefined = Array.isArray(req.headers['x-access-token']) ? req.headers['x-access-token'][0] : req.headers['x-access-token'];
  let next: boolean = true;
  if (!token) {
    return false;
  }
  try {
    jwt.verify(token, 'aslkjdlkasjdlasow', (err) => {
      if (err) {
        next = false;
      } else {
        next = true;
      }
    });
  } catch (err) {
    console.error(err);
    next = false;
  }
  return next;
}



export {
  verifyToken,
  createToken,
};
