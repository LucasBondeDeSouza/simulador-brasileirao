import React, { useEffect } from "react";
import axios from 'axios';

export default ({ sortTeams, selectedOption, teams, setTeams, highlightedTeams }) => {

    const fetchStandings = () => {
        axios.get('http://localhost:5000/api/standings')
            .then(response => {
                const sortedTeams = sortTeams(response.data);
                setTeams(sortedTeams);
            })
            .catch(error => {
                console.error("Error fetching matches: ", error);
            });
    };

    useEffect(() => {
        fetchStandings();
    }, []);

    const filteredTeams = selectedOption === 'MLS'
        ? teams
        : teams.filter(team => team.conference === selectedOption);

    return (
        <table className="my-2">
            <thead className="text-secondary fw-bold">
                <tr>
                    <th className="text-center">#</th>
                    <th colSpan="7">Time</th>
                    <th className="text-center">J</th>
                    <th className="text-center d-none d-sm-table-cell">V</th>
                    <th className="text-center d-none d-sm-table-cell">E</th>
                    <th className="text-center d-none d-sm-table-cell">D</th>
                    <th className="text-center d-none d-sm-table-cell">Gols</th>
                    <th className="text-center d-table-cell d-sm-none">Dif</th>
                    <th className="text-center">PTS</th>
                </tr>
            </thead>

            <tbody className="text-white">
                {filteredTeams.map((team, index) => (
                    <tr 
                        key={team.id} 
                        className={highlightedTeams.includes(team.id) ? 'highlighted-row' : ''}
                    >
                        <td className={`${index < 4 ? 'text-success' : ''} ${index > 15 ? 'text-danger' : ''} text-center fw-bold`}>{index + 1}</td>
                        <td colSpan="7">
                            <img src={team.logo_url} alt={`Logo ${team.name}`} />
                            {team.name}
                        </td>
                        <td className="text-center">{team.games}</td>
                        <td className="text-center d-none d-sm-table-cell">{team.wins}</td>
                        <td className="text-center d-none d-sm-table-cell">{team.draws}</td>
                        <td className="text-center d-none d-sm-table-cell">{team.losses}</td>
                        <td className="text-center d-none d-sm-table-cell">{team.goals_for}:{team.goals_against}</td>
                        <td className="text-center d-table-cell d-sm-none">{team.goal_difference}</td>
                        <td className="text-center">{team.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};