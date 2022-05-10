export default interface Imatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

interface ImatchComplete extends Imatch {
  id: number;
}

export {
  ImatchComplete,
};
