import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Standings from "./components/Standings";
import Matches from "./components/Matches";

export default () => {
  const [teams, setTeams] = useState([]); // Lista de times
  const [scores, setScores] = useState([]); // Placar das partidas
  const [highlightedTeams, setHighlightedTeams] = useState([]);
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
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

  const updateTeams = (homeTeamId, awayTeamId, homeScore, awayScore, prevHomeScore = null, prevAwayScore = null) => {
    setTeams(prevTeams => {
      const updatedTeams = prevTeams.map(team => {
        let isHomeTeam = team.id === homeTeamId;
        let isAwayTeam = team.id === awayTeamId;
  
        // Se houver placar anterior, reverta suas estatísticas
        if (prevHomeScore !== null && prevAwayScore !== null) {
          if (isHomeTeam) {
            team = {
              ...team,
              games: team.games - 1,
              wins: prevHomeScore > prevAwayScore ? team.wins - 1 : team.wins,
              draws: prevHomeScore === prevAwayScore ? team.draws - 1 : team.draws,
              goals_for: team.goals_for - prevHomeScore,
              goals_against: team.goals_against - prevAwayScore,
              goal_difference: team.goal_difference - (prevHomeScore - prevAwayScore),
              points: prevHomeScore > prevAwayScore ? team.points - 3 : prevHomeScore === prevAwayScore ? team.points - 1 : team.points,
            };
          } else if (isAwayTeam) {
            team = {
              ...team,
              games: team.games - 1,
              wins: prevAwayScore > prevHomeScore ? team.wins - 1 : team.wins,
              draws: prevHomeScore === prevAwayScore ? team.draws - 1 : team.draws,
              goals_for: team.goals_for - prevAwayScore,
              goals_against: team.goals_against - prevHomeScore,
              goal_difference: team.goal_difference - (prevAwayScore - prevHomeScore),
              points: prevAwayScore > prevHomeScore ? team.points - 3 : prevHomeScore === prevAwayScore ? team.points - 1 : team.points,
            };
          }
        }
  
        // Agora aplique o novo placar
        if (isHomeTeam || isAwayTeam) {
          const teamGoalsFor = isHomeTeam ? homeScore : awayScore;
          const teamGoalsAgainst = isHomeTeam ? awayScore : homeScore;
          const isWinner = homeScore > awayScore ? isHomeTeam : awayScore > homeScore ? isAwayTeam : false;
          const isDraw = homeScore === awayScore;
          const teamPoints = isWinner ? 3 : isDraw ? 1 : 0;
  
          return {
            ...team,
            games: team.games + 1,
            wins: isWinner ? team.wins + 1 : team.wins,
            draws: isDraw ? team.draws + 1 : team.draws,
            goals_for: team.goals_for + teamGoalsFor,
            goals_against: team.goals_against + teamGoalsAgainst,
            goal_difference: team.goal_difference + (teamGoalsFor - teamGoalsAgainst),
            points: team.points + teamPoints,
          };
        }
  
        return team;
      });
  
      return sortTeams(updatedTeams);
    });
  };

  const removeScore = (match_id) => {
    setScores(prevScores => {
      const newScores = { ...prevScores };
      delete newScores[match_id];  // Remove o placar específico do `match_id`
      return newScores;
    });
  };  

  useEffect(() => {
    console.log("Scores updated:", scores);
  }, [scores]);

  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} />

      <main className={`min-vh-100 ${darkMode ? 'background-dark' : 'background-light'}`}>
        <div className="container">
          <div className="row">
            <Standings 
              sortTeams={sortTeams} 
              teams={teams} setTeams={setTeams} 
              highlightedTeams={highlightedTeams} 
              darkMode={darkMode}
            />

            <Matches 
              setHighlightedTeams={setHighlightedTeams} 
              setScores={setScores} 
              scores={scores} 
              updateTeams={updateTeams} 
              removeScore={removeScore} 
              darkMode={darkMode}
            />
          </div>
        </div>
      </main>
    </>
  );
};