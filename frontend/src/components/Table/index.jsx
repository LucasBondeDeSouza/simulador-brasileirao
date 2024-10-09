import React, { useState, useEffect } from "react";
import axios from 'axios'

export default () => {
    const [selectedOption, setSelectedOption] = useState('MLS');
    const [teams, setTeams] = useState([]);

    const handleSelect = (value) => {
        setSelectedOption(value);
    };

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teams');
                setTeams(response.data);
            } catch (error) {
                console.error('Erro ao buscar os times:', error);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-7">
                    <div className="card shadow mt-5">
                        <div className="dropdown p-3">
                            <button
                                className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://api.sofascore.app/api/v1/unique-tournament/242/image/dark"
                                    alt=""
                                />
                                {selectedOption}
                            </button>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={() => handleSelect('MLS')}>MLS</a>
                                <a className="dropdown-item" onClick={() => handleSelect('Eastern Conference')}>Eastern Conference</a>
                                <a className="dropdown-item" onClick={() => handleSelect('Western Conference')}>Western Conference</a>
                            </div>
                        </div>

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
                                {teams.map((team, index) => {
                                    return (
                                        <tr key={team.id}>
                                            <td className="text-center fw-bold">{index + 1}</td>
                                            <td colSpan="7">
                                                <img src={team.logo_url} alt={`Logo ${team.name}`} />
                                                {team.name}
                                            </td>
                                            <td className="text-center">0</td>
                                            <td className="text-center d-none d-sm-table-cell">0</td>
                                            <td className="text-center d-none d-sm-table-cell">0</td>
                                            <td className="text-center d-none d-sm-table-cell">0</td>
                                            <td className="text-center d-none d-sm-table-cell">0:0</td>
                                            <td className="text-center d-table-cell d-sm-none">0</td>
                                            <td className="text-center">0</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}