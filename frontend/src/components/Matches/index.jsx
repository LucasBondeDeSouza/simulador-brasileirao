import React, { useState } from "react";
import Round from "./Round";
import Games from "./Games";

export default ({ setHighlightedTeams, setScores, scores, updateTeams, removeScore, darkMode }) => {
    const [round, setRound] = useState(34)

    return (
        <div className="col-12 col-lg-5">
            <div className={`card border-0 shadow p-3 mt-5 ${darkMode ? 'card-dark' : 'card-light'}`}>
                <Round 
                    round={round} 
                    setRound={setRound}
                    darkMode={darkMode}
                />

                <Games 
                    round={round} 
                    setHighlightedTeams={setHighlightedTeams} 
                    setScores={setScores} 
                    scores={scores}
                    updateTeams={updateTeams}
                    removeScore={removeScore}
                    darkMode={darkMode}
                />
            </div>
        </div>
    )
}
