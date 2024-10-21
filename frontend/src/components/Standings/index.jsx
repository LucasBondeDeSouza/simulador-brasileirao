import React, { useState } from "react";
import Table from "./Table";
import InfoTable from "./InfoTable";
import SelectTable from "./SelectTable";

export default ({ sortTeams, teams, setTeams, highlightedTeams, darkMode }) => {
    const [selectedOption, setSelectedOption] = useState('MLS');

    return (
        <div className="col-12 col-lg-7">
            <div className={`card shadow border-0 mt-5 ${darkMode ? 'card-dark' : 'card-light'}`}>
                {/*<SelectTable selectedOption={selectedOption} setSelectedOption={setSelectedOption} />*/}
                <Table 
                    sortTeams={sortTeams} 
                    selectedOption={selectedOption} 
                    teams={teams} setTeams={setTeams} 
                    highlightedTeams={highlightedTeams}
                    darkMode={darkMode}
                /> 

                <InfoTable darkMode={darkMode} />
            </div>
        </div>
    );
};