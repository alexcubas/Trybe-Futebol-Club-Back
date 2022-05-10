import Matchs from '../database/models/matches';
import Teams from '../database/models/teams';
import Imatch from '../interfaces/match';

export default class MatchService {
  constructor(private match = Matchs) {}

  async games() {
    const result = await this.match.findAll({ include:
    [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
    });

    return { code: 200, data: result };
  }

  async gameInMatch(inProgress: boolean) {
    const result = await this.match.findAll({ include:
      [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    where: { inProgress } });

    return { code: 200, data: result };
  }

  async createMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }: Imatch) {
    const existHomeTeam = await this.match.findOne({ where: { homeTeam } });
    const existAwayTeam = await this.match.findOne({ where: { awayTeam } });

    if (!existAwayTeam || !existHomeTeam) {
      return { code: 404, data: { message: 'There is no team with such id!' } };
    }

    if (homeTeam === awayTeam) {
      return { code: 401,
        data:
         { message: 'It is not possible to create a match with two equal teams' } };
    }
    const result = await
    this.match.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    return { code: 201, data: result };
  }

  async finishGame(id: string) {
    const result = await this.match.update({ inProgress: false }, { where: { id } });

    return { code: 200, data: result };
  }

  async changeGoals(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    const result = await this.match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { code: 200, data: result };
  }
}
