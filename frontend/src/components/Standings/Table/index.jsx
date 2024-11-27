import React, { useEffect } from "react";
import axios from 'axios';

export default ({ sortTeams, teams, setTeams, highlightedTeams, darkMode }) => {

    const fetchStandings = () => {
        axios.get('https://simulador-server.vercel.app/api/standings')
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

    const setColor = (index) => {
        if (index < 4) {
            return 'color-libertadores';
        } else if (index < 6) {
            return 'color-qualificacao';
        } else if (index < 12) {
            return 'color-sulamericana';
        } else if (index >= 16 && index < 20) {
            return 'color-rebaixamento';
        }
    };
    

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

            <tbody className={`${darkMode ? 'text-white' : 'text-dark'}`}>
                {teams.map((team, index) => (
                    <tr 
                        key={team.id} 
                        className={highlightedTeams.includes(team.id) ? (darkMode ? 'highlighted-dark-row' : 'highlighted-light-row') : ''}
                    >
                        <td className={`${setColor(index)} text-center fw-bold`}>{index + 1}</td>
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
                        <td className="text-center fw-bold">{team.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};