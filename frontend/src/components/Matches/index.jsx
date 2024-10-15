import React, { useState } from "react";
import Round from "./Round";
import Games from "./Games";

export default ({ setScores, updatedTable }) => {
    const [round, setRound] = useState(5)

    return (
        <div className="col-12 col-lg-5">
            <div className="card shadow p-3 mt-5">
                <Round round={round} setRound={setRound} />
                <Games round={round} setScores={setScores} updatedTable={updatedTable} />
            </div>
        </div>
    )
}