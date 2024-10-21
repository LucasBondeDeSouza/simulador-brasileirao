import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ round, setHighlightedTeams, setScores, scores, updateTeams, removeScore }) => {
    const [matches, setMatches] = useState([]);
    const [storedScores, setStoredScores] = useState({});

    useEffect(() => {
        axios.get('https://simulador-server.vercel.app/api/matches')
            .then(response => {
                setMatches(response.data);
            })
            .catch(error => {
                console.error("Error fetching matches: ", error);
            });
    }, []);

    const filteredRound = matches.filter(match => match.round === round);

    const handleScoreChange = (match_id, team, score, home_team_id, away_team_id) => {
        const parsedScore = score.trim() === '' ? null : parseInt(score);
    
        setStoredScores(prevScores => ({
            ...prevScores,
            [match_id]: {
                ...prevScores[match_id],
                [team]: parsedScore
            }
        }));
    
        const updatedScores = {
            ...storedScores[match_id],
            [team]: parsedScore
        };
    
        if (updatedScores.home !== undefined && updatedScores.home !== null && updatedScores.away !== undefined && updatedScores.away !== null) {
            const previousScore = scores[match_id];
    
            // Remove o placar anterior se existir
            if (previousScore) {
                removeScore(match_id);
            }
    
            // Atualiza o placar
            setScores(prevScores => ({
                ...prevScores,
                [match_id]: {
                    match_id: match_id,
                    home_team_id: home_team_id,
                    away_team_id: away_team_id,
                    home_score: updatedScores.home,
                    away_score: updatedScores.away
                }
            }));
    
            // Atualiza os times com o novo placar e subtrai o placar anterior
            updateTeams(home_team_id, away_team_id, updatedScores.home, updatedScores.away, previousScore?.home_score, previousScore?.away_score);
        }
    };           

    const handleFocus = (home_team_id, away_team_id) => {
        // Destaca os times quando o input é focado
        setHighlightedTeams([home_team_id, away_team_id]);
    };

    const handleBlur = () => {
        // Limpa o destaque quando o input perde o foco
        setHighlightedTeams([]);
    };

    return (
        <>
            {filteredRound.map(match => (
                <div key={match.match_id} className="border-top border-secondary p-3 d-flex align-items-center justify-content-between gap-2 games">
                    {/*<p className="text-white">{match.match_id}</p>*/}
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
                                onFocus={() => handleFocus(match.home_team_id, match.away_team_id)} // Destaca ao focar
                                onBlur={handleBlur} // Remove destaque ao desfocar
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
                                onFocus={() => handleFocus(match.home_team_id, match.away_team_id)} // Destaca ao focar
                                onBlur={handleBlur} // Remove destaque ao desfocar
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