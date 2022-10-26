import { compareSync } from 'bcryptjs';
import Users from '../database/models/Users';
import Token from '../interfaces/Token';

export default class UserService {
  private jwtUtil: Token;

  constructor(jwtUtil: Token) {
    this.jwtUtil = jwtUtil;
  }

  async login(email: string, password: string) {
    // https://stackoverflow.com/questions/21961818/sequelize-convert-entity-to-plain-object
    const user = await Users.findOne({ where: { email }, raw: true, nest: true });

    if (!user || !compareSync(password, user.password)) {
      throw new Error('Incorrect email or password');
    }

    const token = this.jwtUtil.generateToken(user);
    return token;
  }

  async validateToken(token: string) {
    const user = await this.jwtUtil.validateToken(token);
    return user.role;
  }
}
