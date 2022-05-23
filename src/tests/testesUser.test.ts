import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import chaiHttp = require('chai-http');
import { loginUser } from './mock/mockUser';

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('testa a camada de serviceUser POST ', () => {
  const response = loginUser
  let chaiHttpResponse: Response;

  beforeEach(() => {
    sinon
      .stub(Users, "findOne")
      .resolves(response as unknown as Users);
  });

  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('testa se ao colocar os dados corretos consegue logar', async () => {
    sinon
    .stub(bcryptjs, "compare")
    .resolves('true');

    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    })
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });
});

describe('testa a camada de serviceUser GET', () => {
  let chaiHttpResponse: Response;

  it('testa se consegue fazer a requisição do get para receber a "role"', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set({authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJpYXQiOjE2NTMzNDIwNzMsImV4cCI6MTY4NDg5OTY3M30.ZysGl2cEwvkHQb0XdhctG_KghWmpLNoIZOHT8X7pBEg'})
    
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.equal('admin');
  });
});
