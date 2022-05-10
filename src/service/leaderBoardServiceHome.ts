import Imapeando from '../interfaces/mapeando';
import Matchs from '../database/models/matches';
import Teams from '../database/models/teams';
import IWinOrLose from '../interfaces/winOrLose';
import { ImatchComplete } from '../interfaces/match';
import ITeam from '../interfaces/team';
// import Imatch from '../interfaces/match';

export default class ClassService {
  constructor(private match = Matchs, private team = Teams) {}

  allMatch = async () => {
    const result = await this.match.findAll({ where: { inProgress: false } });

    return result;
  };

  totalPoints = (homeGoals: number, awayGoals: number) => {
    if (homeGoals > awayGoals) {
      return 3;
    } if (homeGoals === awayGoals) {
      return 1;
    }
    return 0;
  };

  winOrLOSE = (homeGoals: number, awayGoals: number) => {
    const res = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };
    if (homeGoals > awayGoals) {
      res.totalVictories = 1;
    } else if (homeGoals === awayGoals) {
      res.totalDraws = 1;
    } else {
      res.totalLosses = 1;
    }

    return res;
  };

  balanceGols = (homeGoals: number, awayGoals: number) => homeGoals - awayGoals;

  structureLeaderBoard = () => {
    const LeaderBoard: Imapeando = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
    return LeaderBoard;
  };

  teamsObeject = async (LeaderBoard: Imapeando, id: ITeam) => {
    const mapeado = await this.firstStap();
    const LeaderBoard2 = LeaderBoard;
    mapeado.forEach((match) => {
      if (id.id === match.name) {
        LeaderBoard2.name = id.teamName;
        LeaderBoard2.totalPoints += match.totalPoints;
        LeaderBoard2.totalGames += match.totaGames;
        LeaderBoard2.totalVictories += match.totalVictories;
        LeaderBoard2.totalDraws += match.totalDraws;
        LeaderBoard2.totalLosses += match.totalLosses;
        LeaderBoard2.goalsFavor += match.goalsFavor;
        LeaderBoard2.goalsOwn += match.goalsOwn;
        LeaderBoard2.goalsBalance += match.goalsBalance;
        LeaderBoard2.efficiency = Number((
          (LeaderBoard2.totalPoints / (LeaderBoard2.totalGames * 3)) * 100).toFixed(2));
      }
    });

    return LeaderBoard2;
  };

  teams = async () => {
    const allTeams = await this.team.findAll();
    const teams = Promise.all(allTeams.map((id) => {
      const LeaderBoard = this.structureLeaderBoard();
      const secondLoopLeaderBoard = this.teamsObeject(LeaderBoard, id);
      return secondLoopLeaderBoard;
    }));
    return teams;
  };

  firstStapObject =
  (totalPoints: number, winOrLose: IWinOrLose, goalsBalance: number, match: ImatchComplete) => {
    const object = { id: match.id,
      name: match.homeTeam,
      totalPoints,
      totaGames: winOrLose.totalDraws + winOrLose.totalLosses + winOrLose.totalVictories,
      totalVictories: winOrLose.totalVictories,
      totalDraws: winOrLose.totalDraws,
      totalLosses: winOrLose.totalLosses,
      goalsFavor: match.homeTeamGoals,
      goalsOwn: match.awayTeamGoals,
      goalsBalance,
    };
    return object;
  };

  async firstStap() {
    const result = await this.allMatch();
    const mapeando = result.map((match) => {
      const totalPoints = this.totalPoints(match.homeTeamGoals, match.awayTeamGoals);
      const winOrLose = this.winOrLOSE(match.homeTeamGoals, match.awayTeamGoals);
      const goalsBalance = this.balanceGols(match.homeTeamGoals, match.awayTeamGoals);
      const res = this.firstStapObject(totalPoints, winOrLose, goalsBalance, match);
      return res;
    });

    return mapeando;
  }

  async classificacao() {
    const result = await this.teams();

    result.sort((a, b) => b.goalsOwn - a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return { code: 200, data: result };
  }

  sumefficiency = async (home: Imapeando[], away: Imapeando[]) => {
    const result = await this.sumHomeTeamWithAwayTeam(home, away);

    result.forEach((team) => {
      const newTeam = team;
      newTeam.efficiency = Number((
        (team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
    });
    return result;
  };

  sumHomeTeamWithAwayTeam = async (home: Imapeando[], away: Imapeando[]) => {
    const result = home.map((teamhome) => {
      const newTeamHome = teamhome;
      away.forEach((teamaway) => {
        if (teamhome.name === teamaway.name) {
          newTeamHome.totalPoints += teamaway.totalPoints;
          newTeamHome.totalGames += teamaway.totalGames;
          newTeamHome.totalVictories += teamaway.totalVictories;
          newTeamHome.totalDraws += teamaway.totalDraws;
          newTeamHome.totalLosses += teamaway.totalLosses;
          newTeamHome.goalsFavor += teamaway.goalsFavor;
          newTeamHome.goalsOwn += teamaway.goalsOwn;
          newTeamHome.goalsBalance += teamaway.goalsBalance;
        }
      });
      return newTeamHome;
    });
    return result;
  };

  classificacaoGeral = async (home: Imapeando[], away: Imapeando[]) => {
    const result = await this.sumefficiency(home, away);

    result.sort((a, b) => b.goalsOwn - a.goalsOwn)
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalVictories - a.totalVictories)
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return { code: 200, data: result };
  };
}
