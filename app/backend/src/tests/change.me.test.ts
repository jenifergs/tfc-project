// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import  User  from '../database/models/Users';
// import UserController from '../controller/UserController';
// import UserService from '../services/UserService';


// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Seu teste', () => {
//   let service: UserService;
//   let controller: UserController;
//   beforeEach(() => {
//     service = { login: sinon.stub(), validateToken: sinon.stub() }as unknown as UserService;
//     controller = new UserController(service);
//     });

//   it('Deve retornar 200', async () => {
//     const req = { body: { email: 'teste@teste.com', password: '123456' } };
//     const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
//     controller.loginUser(req, res as unknown as Response);
//   });
//   /**
//    * Exemplo do uso de stubs com tipos
//    */

//   // let chaiHttpResponse: Response;

//   // before(async () => {
//   //   sinon
//   //     .stub(Example, "findOne")
//   //     .resolves({
//   //       ...<Seu mock>
//   //     } as Example);
//   // });

//   // after(()=>{
//   //   (Example.findOne as sinon.SinonStub).restore();
//   // })

//   // it('...', async () => {
//   //   chaiHttpResponse = await chai
//   //      .request(app)
//   //      ...

//   //   expect(...)
//   // });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });
