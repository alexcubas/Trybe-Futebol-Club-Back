import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { mockTeam, mockTeamId } from './mock/mockTeam';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testa a camada de serviceTeam', () => {
  const response = mockTeam
  let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/teams')
  });

  it('testa se retorna todos os times', async () => {
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(response);
  });
});

describe('testa a camada de serviceTeam by Id', () => {
  const response = mockTeamId
  let chaiHttpResponse: Response;

    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/3')
  });

  it('testa se retorna o time com o id indicado', async () => {
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(response);
  });
});

