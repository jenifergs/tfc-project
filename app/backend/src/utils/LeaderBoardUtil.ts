import Teams from '../database/models/Teams';
import Matches from '../database/models/Match';
import Leaderboard from '../interfaces/Leaderboard';

export default class Leaderboards {
  constructor(private leaderboard: Matches[]) { }

  private getTotalPoints(teams: Teams) {
    let points = 0;
    const wins = this.takeMatchesWithWins(teams);
    const draws = this.takeMatchesWithDraws();

    this.leaderboard.forEach((match) => {
      if (match.homeTeam === teams.id || match.awayTeam === teams.id) points = wins * 3 + draws;
    });
    return points;
  }

  private totalMatches(teams: Teams) {
    let matches = 0;
    this.leaderboard.forEach((match) => {
      if (match.homeTeam === teams.id || match.awayTeam === teams.id) matches += 1;
    });
    return matches;
  }

  private calculateTeamEfficiency(teams: Teams) {
    const P = this.getTotalPoints(teams);
    const J = this.totalMatches(teams);
    const result = ((P / (J * 3)) * 100);
    return result.toFixed(2);
  }

  private getGoalsScoreInFavor(teams: Teams) {
    const GP = this.leaderboard.reduce((acc, current) => {
      if (current.homeTeam === teams.id) {
        return acc + current.homeTeamGoals;
      }
      if (current.awayTeam === teams.id) return acc + current.awayTeamGoals;
      return acc;
    }, 0);
    return GP;
  }

  private getGoalsConceded(teams: Teams) {
    const GC = this.leaderboard.reduce((acc, current) => {
      if (current.awayTeam === teams.id) {
        return acc + current.homeTeamGoals;
      }
      if (current.homeTeam === teams.id) {
        return acc + current.awayTeamGoals;
      }
      return acc;
    }, 0);
    return GC;
  }

  private getGoalsBalance(teams: Teams) {
    const GP = this.getGoalsScoreInFavor(teams);
    const GC = this.getGoalsConceded(teams);
    const goalBalance = GP - GC;
    return goalBalance;
  }

  private takeMatchesWithWins(teams: Teams) {
    const victories = this.leaderboard.reduce((acc, current) => {
      if (current.awayTeam === teams.id && current.homeTeamGoals < current.awayTeamGoals) {
        return acc + 1;
      }
      if (current.homeTeam === teams.id && current.homeTeamGoals > current.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return victories;
  }

  private takeMatchesWithDraws() {
    const draws = this.leaderboard.reduce((acc, current) => {
      if (current.awayTeamGoals === current.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return draws;
  }

  private takeLosingMacthes(teams: Teams) {
    const losing = this.leaderboard.reduce((acc, current) => {
      if (teams.id === current.awayTeam
        && current.homeTeamGoals > current.awayTeamGoals) return acc + 1;
      if (teams.id === current.homeTeam
        && current.homeTeamGoals < current.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return losing;
  }

  public buildResultTeams(teams: Teams):Leaderboard {
    return ({
      name: teams.teamName,
      totalPoints: this.getTotalPoints(teams),
      totalGames: this.totalMatches(teams),
      totalVictories: this.takeMatchesWithWins(teams),
      totalDraws: this.takeMatchesWithDraws(),
      totalLosses: this.takeLosingMacthes(teams),
      goalsFavor: this.getGoalsScoreInFavor(teams),
      goalsOwn: this.getGoalsConceded(teams),
      goalsBalance: this.getGoalsBalance(teams),
      efficiency: this.calculateTeamEfficiency(teams),

    });
  }
}
