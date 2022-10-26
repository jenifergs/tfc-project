import { compare } from 'bcryptjs';
import Users from '../database/models/Users';
import Token from '../interfaces/Token';

export default class UserService {
  private jwtUtil: Token;

  constructor(jwtUtil: Token) {
    this.jwtUtil = jwtUtil;
  }

  login = async (email: string, password: string) => {
    const user = await Users.findOne({ where: { email } });
    if (!user || !await compare(password, user.password)) {
      throw new Error('Incorrect email or password');
    }

    const token = this.jwtUtil.generateToken(user);
    return token;
  };
}
