import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Users from '../database/models/Users';
import { mockLogin } from './mock.login';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota de "/login"', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Verifica se efetua login com sucesso', async () => {
    sinon.stub(Users, 'findOne').resolves(mockLogin as Users)

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' })

    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.have.any.keys('token')
  })

  it('Verifica se não é possível efetuar um Login sem um Email', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'secret_admin' })

      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
  })

  it('Verifica se não é possível efetuar um Login sem um Password', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' })

      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
  })

})