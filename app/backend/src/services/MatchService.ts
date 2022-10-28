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
}

export default MatchService;
