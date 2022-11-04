import Leaderboards from '../utils/LeaderBoardUtil';
import Teams from '../database/models/Teams';
import Matches from '../database/models/Match';
import Leaderboard from '../interfaces/Leaderboard';

export default class LeaderboardService {
  private sortLeaderboard = (leaderboard: Leaderboard[]) => leaderboard
    .sort((a: Leaderboard, b: Leaderboard) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);

  public filterMatchesAndTeams = async () => {
    const getTeams = await Teams.findAll();
    const getResultsMatchesFinished = await Matches.findAll({ where: { inProgress: false } });
    return { getTeams, getResultsMatchesFinished };
  };

  public getTeamHomeResults = async () => {
    const { getTeams, getResultsMatchesFinished } = await this.filterMatchesAndTeams();

    const result = getTeams.map((team) => {
      const matches = getResultsMatchesFinished.filter((match) => match.homeTeam === team.id);
      return new Leaderboards(matches).buildResultTeams(team);
    });
    return this.sortLeaderboard(result);
  };

  public getTeamAwayResults = async () => {
    const { getTeams, getResultsMatchesFinished } = await this.filterMatchesAndTeams();

    const result = getTeams.map((team) => {
      const matches = getResultsMatchesFinished.filter((match) => match.awayTeam === team.id);
      return new Leaderboards(matches).buildResultTeams(team);
    });
    return this.sortLeaderboard(result);
  };

  public getAllTeamResults = async () => {
    const { getTeams, getResultsMatchesFinished } = await this.filterMatchesAndTeams();

    const result = getTeams.map((team) => {
      const matches = getResultsMatchesFinished
        .filter((match) => match.homeTeam === team.id || match.awayTeam === team.id);
      return new Leaderboards(matches).buildResultTeams(team);
    });
    return this.sortLeaderboard(result);
  };
}
