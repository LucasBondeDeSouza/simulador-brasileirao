import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ round, setScores, updatedTable }) => {
    const [matches, setMatches] = useState([]);
    const [storedScores, setStoredScores] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/matches')
            .then(response => {
                setMatches(response.data);
            })
            .catch(error => {
                console.error("Error fetching matches: ", error);
            });
    }, []);

    const filteredRound = matches.filter(match => match.round === round);

    const updateScores = (match_id, team_id, type, value) => {
        setScores(prevScores => {
            const updatedScores = [...prevScores];
            const matchIndex = updatedScores.findIndex(score => score.match_id === match_id);
            
            if (matchIndex !== -1) {
                updatedScores[matchIndex][type] = value;
            } else {
                updatedScores.push({
                    match_id: match_id,
                    home_team_id: team_id.home,
                    home_score: type === 'home_score' ? value : null,
                    away_team_id: team_id.away,
                    away_score: type === 'away_score' ? value : null
                });
            }
    
            const homeScore = updatedScores.find(score => score.match_id === match_id)?.home_score;
            const awayScore = updatedScores.find(score => score.match_id === match_id)?.away_score;
    
            if (homeScore !== null && awayScore !== null) {
                // Chama updatedTable com os IDs corretos
                updatedTable(team_id.home, team_id.away, homeScore, awayScore);
            }

            setScores(updatedScores);
            return updatedScores;
        });
    };

    const handleScoreChange = (match_id, team, score, home_team_id, away_team_id) => {
        const parsedScore = score.trim() === '' ? null : parseInt(score); 
        const type = team === 'home' ? 'home_score' : 'away_score';
        
        // Atualiza os storedScores localmente
        setStoredScores(prevScores => ({
            ...prevScores,
            [match_id]: {
                ...prevScores[match_id],
                [team]: parsedScore
            }
        }));

        // Passa os IDs corretos para updateScores e updateTable
        updateScores(match_id, { home: home_team_id, away: away_team_id }, type, parsedScore);
    };

    return (
        <>
            {filteredRound.map(match => (
                <div key={match.match_id} className="border-top border-secondary p-3 d-flex align-items-center justify-content-between gap-2 games">
                    <p className="text-white">{match.match_id}</p>
                    <div className="d-flex align-items-center justify-content-between gap-3 info-teams">
                        <img src={match.home_team_logo} alt={match.home_team_name} />
                        <p className="text-white fs-5 mb-0">{match.home_team_name}</p>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        {
                            match.home_score == null ?
                            <input
                                type="number"
                                name="home_score"
                                value={storedScores[match.match_id]?.home ?? ''}
                                onChange={(e) => handleScoreChange(match.match_id, 'home', e.target.value, match.home_team_id, match.away_team_id)}
                            /> :
                            <p className="text-white m-0 score">{match.home_score}</p>
                        }
                        <p className="text-white fs-5 mb-0">X</p>
                        {
                            match.away_score == null ?
                            <input
                                type="number"
                                name="away_score"
                                value={storedScores[match.match_id]?.away ?? ''}
                                onChange={(e) => handleScoreChange(match.match_id, 'away', e.target.value, match.home_team_id, match.away_team_id)}
                            /> :
                            <p className="text-white m-0 score">{match.away_score}</p>
                        }
                    </div>

                    <div className="d-flex align-items-center justify-content-between gap-3 info-teams">
                        <p className="text-white fs-5 mb-0">{match.away_team_name}</p>
                        <img src={match.away_team_logo} alt={match.away_team_name} />
                    </div>
                </div>
            ))}
        </>
    );
};