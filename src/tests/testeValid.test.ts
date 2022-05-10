// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import {  } from './mock/mockLeaderBoard';

// import { app } from '../app';

// import { Response } from 'superagent';
// import Matches from '../database/models/matches';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('testa se retorna o LeaderBoardAway', () => {
//   let chaiHttpResponse: Response;
  
//   // before(async () => {
//   //   sinon
//   //     .stub(Matches, "findAll")
//   //     .resolves(findAll as unknown as Matches[]);
//   // });

//   // after(()=>{
//   //   (Matches.findAll as sinon.SinonStub).restore();
//   // })

// //   it('testa se retorna o LeaderBoardHome', async () => {
// //     chaiHttpResponse = await chai.request(app).get('/leaderboard/away')

// //     expect(chaiHttpResponse).to.have.status(200);
// //     expect(chaiHttpResponse.body).to.deep.equal(finalSearch);
// //   });
// // });

// // describe('testa a camada de serviceMatch', () => {
// //   const findAll = mockLeaderBoardFindAll
// //   const findOneTeam = mockLeaderBoardFindOneTeam
// //   const finalSearch = mockLeaderBoardFinalAll
// //   let chaiHttpResponse: Response;
  
// //   before(async () => {
// //     sinon
// //       .stub(Matches, "findAll")
// //       .resolves(findAll as unknown as Matches[]);

// //       sinon
// //       .stub(Teams, "findAll")
// //       .resolves(findOneTeam as unknown as Matches[]);
// //   });

// //   after(()=>{
// //     (Matches.findAll as sinon.SinonStub).restore();
// //     (Teams.findAll as sinon.SinonStub).restore();
// //   })

// //   it('testa se retorna o LeaderBoardAway', async () => {
// //     chaiHttpResponse = await chai.request(app).get('/leaderboard')

// //     expect(chaiHttpResponse).to.have.status(200);
// //     expect(chaiHttpResponse.body).to.deep.equal(finalSearch);
// //   });
// // });
