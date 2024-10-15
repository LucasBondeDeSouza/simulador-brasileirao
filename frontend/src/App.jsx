import React, { useState } from "react";
import Header from "./components/Header";
import Standings from "./components/Standings";
import Matches from "./components/Matches";

export default () => {
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);

  const updatedTable = (home_id, away_id, home_score, away_score) => {
    const updateTeamStats = (team, isHome) => {
      const goalsFor = isHome ? home_score : away_score;
      const goalsAgainst = isHome ? away_score : home_score;

      return {
        ...team,
        games: team.games + 1,
        goals_for: team.goals_for + goalsFor,
        goals_against: team.goals_against + goalsAgainst,
        goal_difference: (team.goals_for + goalsFor) - (team.goals_against + goalsAgainst),
        points: team.points + (isHome ? (home_score > away_score ? 3 : (home_score === away_score ? 1 : 0)) : (away_score > home_score ? 3 : (away_score === home_score ? 1 : 0))),
        wins: team.wins + (isHome ? (home_score > away_score ? 1 : 0) : (away_score > home_score ? 1 : 0)),
        draws: team.draws + (home_score === away_score ? 1 : 0),
        losses: team.losses + (isHome ? (home_score < away_score ? 1 : 0) : (away_score < home_score ? 1 : 0)) // Incrementa as derrotas
      };
    };

    const updatedTeams = teams.map(team => {
      if (team.id === home_id) {
        return updateTeamStats(team, true); // Atualiza os dados do time mandante
      } else if (team.id === away_id) {
        return updateTeamStats(team, false); // Atualiza os dados do time visitante
      }
      return team; // Retorna o time inalterado se não for nem mandante nem visitante
    });

    const sortedTeams = sortTeams(updatedTeams); // Ordena as equipes
    setTeams(sortedTeams); // Atualiza o estado com as equipes ordenadas

    return sortedTeams; // Retorna as equipes ordenadas
  };

  const sortTeams = (teams) => {
    return teams.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.goal_difference !== a.goal_difference) return b.goal_difference - a.goal_difference;
      if (b.goals_for !== a.goals_for) return b.goals_for - a.goals_for;
      return 0;
    });
  };

  return (
    <>
      <Header />

      <main className="min-vh-100">
        <div className="">
          {scores.map((score, index) => (
            <div className="d-flex gap-2" key={index}>
              <p className="text-white">ID MATCH: <span className="text-success">{score.match_id}</span></p>
              <p className="text-white">ID HOME: {score.home_team_id}</p>
              <p className="text-white">HOME SCORE: {score.home_score}</p>
              <p className="text-white">AWAY ID: {score.away_team_id}</p>
              <p className="text-white">AWAY SCORE: {score.away_score}</p>
            </div>
          ))}
        </div>
        <div className="container">
          <div className="row">
            <Standings sortTeams={sortTeams} teams={teams} setTeams={setTeams} />
            <Matches setScores={setScores} updatedTable={updatedTable} />
          </div>
        </div>
      </main>
    </>
  );
};