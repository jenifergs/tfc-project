export default interface Token {
  generateToken(payload: object): string;
}
