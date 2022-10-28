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
    nest: true });
}

export default MatchService;
