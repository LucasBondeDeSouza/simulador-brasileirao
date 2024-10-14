import React, { useState } from "react";
import Table from "./Table";
import SelectTable from "./SelectTable";

export default ({ sortTeams, teamWinner, teamLosses, teams, setTeams }) => {
    const [selectedOption, setSelectedOption] = useState('MLS');

    return (
        <div className="col-12 col-lg-7">
            <div className="card shadow mt-5">
                <SelectTable selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                <Table sortTeams={sortTeams} selectedOption={selectedOption} teamWinner={teamWinner} teamLosses={teamLosses} teams={teams} setTeams={setTeams} /> 
            </div>
        </div>
    );
};