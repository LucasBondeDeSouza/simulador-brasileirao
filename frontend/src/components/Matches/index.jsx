import React, { useState } from "react";
import Round from "./Round";
import Games from "./Games";

export default () => {
    const [round, setRound] = useState(1)

    return (
        <div className="col-12 col-lg-5">
            <div className="card shadow p-3 mt-5">
                <Round round={round} setRound={setRound} />
                <Games round={round} />
            </div>
        </div>
    )
}