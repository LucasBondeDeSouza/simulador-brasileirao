import React, { useState } from "react";
import Header from "./components/Header";
import Standings from "./components/Standings";
import Matches from "./components/Matches";

export default () => {
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);
  const [highlightedTeams, setHighlightedTeams] = useState([]);

  const updatedTable = (home_id, away_id, home_score, away_score) => {
    const resetTeamStats = (team) => {
      return {
        ...team,
        games: team.games - 1,
        goals_for: team.goals_for - (team.last_goals_for || 0),
        goals_against: team.goals_against - (team.last_goals_against || 0),
        goal_difference: team.goal_difference - (team.last_goals_for || 0) + (team.last_goals_against || 0),
        points: team.points - (team.last_points || 0),
        wins: team.wins - (team.last_win || 0),
        draws: team.draws - (team.last_draw || 0),
        losses: team.losses - (team.last_loss || 0)
      };
    };

    const updateTeamStats = (team, isHome) => {
      const goalsFor = isHome ? home_score : away_score;
      const goalsAgainst = isHome ? away_score : home_score;
      const points = isHome ? (home_score > away_score ? 3 : (home_score === away_score ? 1 : 0)) : (away_score > home_score ? 3 : (away_score === home_score ? 1 : 0));
      const win = isHome ? (home_score > away_score ? 1 : 0) : (away_score > home_score ? 1 : 0);
      const draw = (home_score === away_score ? 1 : 0);
      const loss = isHome ? (home_score < away_score ? 1 : 0) : (away_score < home_score ? 1 : 0);

      return {
        ...team,
        games: team.games + 1,
        goals_for: team.goals_for + goalsFor,
        goals_against: team.goals_against + goalsAgainst,
        goal_difference: (team.goals_for + goalsFor) - (team.goals_against + goalsAgainst),
        points: team.points + points,
        wins: team.wins + win,
        draws: team.draws + draw,
        losses: team.losses + loss,
        last_goals_for: goalsFor,
        last_goals_against: goalsAgainst,
        last_points: points,
        last_win: win,
        last_draw: draw,
        last_loss: loss
      };
    };

    const updatedTeams = teams.map(team => {
      if (team.id === home_id) {
        const resetTeam = resetTeamStats(team);
        return updateTeamStats(resetTeam, true); // Atualiza os dados do time mandante
      } else if (team.id === away_id) {
        const resetTeam = resetTeamStats(team);
        return updateTeamStats(resetTeam, false); // Atualiza os dados do time visitante
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
        <div className="container">
          <div className="row">
            <Standings sortTeams={sortTeams} teams={teams} setTeams={setTeams} highlightedTeams={highlightedTeams} />
            <Matches setScores={setScores} updatedTable={updatedTable} setHighlightedTeams={setHighlightedTeams} />
          </div>
        </div>
      </main>
    </>
  );
};