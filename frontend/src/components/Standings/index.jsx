import React, { useState } from "react";
import Table from "./Table";
import SelectTable from "./SelectTable";

export default ({ sortTeams, teams, setTeams, highlightedTeams }) => {
    const [selectedOption, setSelectedOption] = useState('MLS');

    return (
        <div className="col-12 col-lg-7">
            <div className="card shadow mt-5">
                {/*<SelectTable selectedOption={selectedOption} setSelectedOption={setSelectedOption} />*/}
                <Table sortTeams={sortTeams} selectedOption={selectedOption} teams={teams} setTeams={setTeams} highlightedTeams={highlightedTeams} /> 
            </div>
        </div>
    );
};