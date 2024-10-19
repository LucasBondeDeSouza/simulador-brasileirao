import React, { useState } from "react";
import Round from "./Round";
import Games from "./Games";

export default ({ setHighlightedTeams, setScores, scores, updateTeams, removeScore }) => {
    const [round, setRound] = useState(30)

    return (
        <div className="col-12 col-lg-5">
            <div className="card shadow p-3 mt-5">
                <Round round={round} setRound={setRound} />
                <Games 
                    round={round} 
                    setHighlightedTeams={setHighlightedTeams} 
                    setScores={setScores} 
                    scores={scores}
                    updateTeams={updateTeams}
                    removeScore={removeScore}
                />
            </div>
        </div>
    )
}