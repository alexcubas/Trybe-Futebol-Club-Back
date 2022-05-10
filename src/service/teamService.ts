import Teams from '../database/models/teams';

export default class TeamService {
  constructor(private team = Teams) {}

  async time() {
    const result = await this.team.findAll();

    return { code: 200, data: result };
  }

  async timeId(id: string) {
    const result = await this.team.findOne({ where: { id } });

    return { code: 200, data: result };
  }

  // static async role(decoded: { data: string }) {
  //   return { code: 200, data: decoded.data };
  // }
}
