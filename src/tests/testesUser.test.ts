import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { loginUser } from './mock/mockUser';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testa a camada de serviceUser POST ', () => {
  const response = loginUser
  let chaiHttpResponse: Response;

  it('testa se ao colocar os dados corretos consegue logar', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    })
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.user).to.deep.equal(response.user);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('testa se ao colocar o password errado retorna um erro', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admi"
    })
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
  });
});

describe('testa a camada de serviceUser GET', () => {
  let chaiHttpResponse: Response;

  it('testa se consegue fazer a requisição do get para receber a "role"', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set({authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJpYXQiOjE2NTE2NzczMTgsImV4cCI6MTY1MTc2MzcxOH0.Nx3TiGFDZ47gHNaexJC72lXtsr-YezsN-OMSe1DWaIQ'})
    
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.equal('admin');
  });
});
