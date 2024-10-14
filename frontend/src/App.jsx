import React, { useState } from "react";
import Header from "./components/Header";
import Standings from "./components/Standings"
import Matches from "./components/Matches";

export default () => {
  const [teams, setTeams] = useState([]);

  const updatedTable = (home_id, away_id, home_score, away_score) => {
    const updatedTeams = prevTeams.map(team => {
      // Vitória mandante
      if (home_score > away_score) {
        if (team.id === home_id) {
          return {
            ...team,
            games: team.games + 1,
            wins: team.wins + 1,
            goals_for: team.goals_for + home_score,
            goals_against: team.goals_against + away_score,
            goal_difference: (team.goals_for + home_score) - (team.goals_against + away_score),
            points: team.points + 3
          }
        }
        // Vitória visitante
      } else if (away_score > home_score) {
        if (team.id === away_id) {
          return {
            ...team,
            games: team.games + 1,
            wins: team.wins + 1,
            goals_for: team.goals_for + away_score,
            goals_against: team.goals_against + home_score,
            goal_difference: (team.goals_for + away_score) - (team.goals_against + home_score),
            points: team.points + 3
          }
        }
        // Empate
      } 

      return teams
    })

    return sortTeams(updatedTeams);
  }

  const teamWinner = (team_id) => {
    // Atualiza a tabela localmente e reordena os times
    setTeams(prevTeams => {
      const updatedTeams = prevTeams.map(team => {
        if (team.id === team_id) {
          return {
            ...team,
            games: team.games + 1,
            wins: team.wins + 1,
            goals_for: team.goals_for + 2,
            goals_against: team.goals_against + 1,
            goal_difference: (team.goals_for + 2) - (team.goals_against + 1),
            points: team.points + 3
          };
        }
        return team;
      });
      return sortTeams(updatedTeams); // Ordena os times após a atualização
    });
  };

  const teamLosses = (team_id) => {
    // Atualiza a tabela localmente e reordena os times
    setTeams(prevTeams => {
      const updatedTeams = prevTeams.map(team => {
        if (team.id === team_id) {
          return {
            ...team,
            games: team.games + 1,
            losses: team.losses + 1,
            goals_for: team.goals_for + 1,
            goals_against: team.goals_against + 2,
            goal_difference: (team.goals_for + 1) - (team.goals_against + 2)
          }
        }
        return team
      })
      return sortTeams(updatedTeams); // Ordena os times após a atualização
    })
  }

  const draw = (home_id, away_id) => {

  }

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
            <Standings sortTeams={sortTeams} teamWinner={teamWinner} teamLosses={teamLosses} teams={teams} setTeams={setTeams} />
            <Matches />
          </div>
        </div>
      </main>
    </>
  )
}