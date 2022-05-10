import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { mockLeaderBoardFindAll, mockLeaderBoardFindOneTeam, mockLeaderBoardFinalAway, mockLeaderBoardFinalAll } from './mock/mockLeaderBoard';

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams'

chai.use(chaiHttp);

const { expect } = chai;

describe('testa se retorna o LeaderBoardAway', () => {
  const findAll = mockLeaderBoardFindAll
  const findOneTeam = mockLeaderBoardFindOneTeam
  const finalSearch = mockLeaderBoardFinalAway
  let chaiHttpResponse: Response;
  
  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(findAll as unknown as Matches[]);

      sinon
      .stub(Teams, "findAll")
      .resolves(findOneTeam as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('testa se retorna o LeaderBoardHome', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(finalSearch);
  });
});

describe('testa a camada de serviceMatch', () => {
  const findAll = mockLeaderBoardFindAll
  const findOneTeam = mockLeaderBoardFindOneTeam
  const finalSearch = mockLeaderBoardFinalAll
  let chaiHttpResponse: Response;
  
  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(findAll as unknown as Matches[]);

      sinon
      .stub(Teams, "findAll")
      .resolves(findOneTeam as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('testa se retorna o LeaderBoardAway', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(finalSearch);
  });
});

// describe('testa a camada de serviceMatch patch placar', () => {
//   let chaiHttpResponse: Response;
  
//   before(async () => {
//     sinon
//       .stub(Matches, "update")
//       .resolves();
//   });

//   after(()=>{
//     (Matches.update as sinon.SinonStub).restore();
//   })

//   it('testa se retorna atualiza o placar da partida', async () => {
//     chaiHttpResponse = await chai.request(app).patch('/matches/48').send({
//       "homeTeamGoals": 3,
//       "awayTeamGoals": 2
//     })

//     expect(chaiHttpResponse).to.have.status(200);
//   });
// });

// describe('testa a camada de serviceMatch patch finaliza o jogo', () => {
//   let chaiHttpResponse: Response;
  
//   before(async () => {
//     sinon
//       .stub(Matches, "update")
//       .resolves();
//   });

//   after(()=>{
//     (Matches.update as sinon.SinonStub).restore();
//   })

//   it('testa se retorna atualiza o placar da partida', async () => {
//     chaiHttpResponse = await chai.request(app).patch('/matches/48/finish')

//     expect(chaiHttpResponse).to.have.status(200);
//   });
// });

// describe('testa a camada de serviceMatch post cria uma partida', () => {
//   let chaiHttpResponse: Response;
//   const response = mockcreateMatch;

//   before(async () => {
//     sinon
//       .stub(Matches, "create")
//       .resolves(response as Matches);
//   });

//   after(()=>{
//     (Matches.create as sinon.SinonStub).restore();
//   })
  
//   it('testa se retorna a partida criada', async () => {
//     chaiHttpResponse = await chai.request(app).post('/matches').set({
//       authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJpYXQiOjE2NTE2ODUwMzIsImV4cCI6MTY1MTc3MTQzMn0.Jy0WBSBATVY1_7L46S4yiMZNk77oOwQcystmnb1ya5E'
//     }).send({
//       "homeTeam": 8,
//       "awayTeam": 1,
//       "homeTeamGoals": 11,
//       "awayTeamGoals": 21,
//       "inProgress": true
//     })

//     expect(chaiHttpResponse).to.have.status(201);
//     expect(chaiHttpResponse.body).to.have.deep.equal(response)
//     expect(chaiHttpResponse.body).to.have.property("homeTeam");
//     expect(chaiHttpResponse.body).to.have.property("awayTeam");
//     expect(chaiHttpResponse.body).to.have.property("homeTeamGoals");
//     expect(chaiHttpResponse.body).to.have.property("awayTeamGoals");
//     expect(chaiHttpResponse.body).to.have.property("inProgress");
//   });

//   it('testa erro se os dois times forem iguais', async () => {
//     chaiHttpResponse = await chai.request(app).post('/matches').set({
//       authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJpYXQiOjE2NTE2ODUwMzIsImV4cCI6MTY1MTc3MTQzMn0.Jy0WBSBATVY1_7L46S4yiMZNk77oOwQcystmnb1ya5E'
//     }).send({
//       "homeTeam": 1,
//       "awayTeam": 1,
//       "homeTeamGoals": 11,
//       "awayTeamGoals": 2,
//       "inProgress": true
//     })

//     expect(chaiHttpResponse).to.have.status(401);
//     expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams')
//   });

//   it('testa erro se o ID nao existir', async () => {
//     (Matches.create as sinon.SinonStub).restore();

//       sinon
//         .stub(Matches, "create")
//         .throws('error');

//     chaiHttpResponse = await chai.request(app).post('/matches').set({
//       authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJpYXQiOjE2NTE2ODUwMzIsImV4cCI6MTY1MTc3MTQzMn0.Jy0WBSBATVY1_7L46S4yiMZNk77oOwQcystmnb1ya5E'
//     }).send({
//       "homeTeam": 111,
//       "awayTeam": 1,
//       "homeTeamGoals": 11,
//       "awayTeamGoals": 2,
//       "inProgress": true
//     })

//     expect(chaiHttpResponse).to.have.status(404);
//     expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!')
//   });
// });

// describe('testa a camada de serviceMatch get verefica os jogos que finalizaram', () => {
//   let chaiHttpResponse: Response;
//   const response = mockMatchTrue;
  
//   it('testa se retorna os jogos somente finalizados', async () => {
//     chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true')

//     expect(chaiHttpResponse).to.have.status(200);
//     // expect(chaiHttpResponse.body).to.be.deep.equal(response);
//   });
// });