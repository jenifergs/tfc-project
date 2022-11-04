import ErrorUtil from '../utils/errorUtil';
import Match from '../database/models/Match';
import Teams from '../database/models/Teams';

class MatchService {
  getMatches = async () => Match.findAll({
    include: [{
      model: Teams,
      as: 'teamHome',
      attributes: { exclude: ['id'] },
    },
    {
      model: Teams,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    }],
    raw: true,
    nest: true,
  });

  getMatchesInProgress = async (inProgress: string) => Match.findAll({
    where: { inProgress: inProgress === 'true' },
    include: [{
      model: Teams,
      as: 'teamHome',
      attributes: { exclude: ['id'] },
    },
    {
      model: Teams,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    }],
    raw: true,
    nest: true,
  });

  createMatch = async (
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    const findHome = await Teams.findOne({ where: { id: homeTeam }, raw: true, nest: true });
    const findAway = await Teams.findOne({ where: { id: awayTeam }, raw: true, nest: true });
    if (!findHome || !findAway) throw new ErrorUtil('There is no team with such id!', 404);
    const match = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match;
  };

  finishMatch = async (id: number) => {
    const match = await Match.findOne({ where: { id } });
    if (match) {
      match.inProgress = false;
      await match.save();
      return match;
    }
    if (!match) {
      throw new Error('Match not found');
    }
  };

  updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const match = await Match.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: { id },
    });

    return match;
  };
}

export default MatchService;
