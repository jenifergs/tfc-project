import Teams from '../database/models/Teams';

class TeamsService {
  getTeams = async () => Teams.findAll({ raw: true, nest: true });

  getTeamById = async (id: number) => Teams.findOne({ where: { id }, raw: true, nest: true });
}

export default TeamsService;
