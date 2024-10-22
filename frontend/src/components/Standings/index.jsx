import React, { useState } from "react";
import Table from "./Table";
import InfoTable from "./InfoTable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default ({ sortTeams, teams, setTeams, highlightedTeams, darkMode }) => {
    const [hideTable, setHideTable] = useState(false)

    const toggleHidden = () => {
        setHideTable(!hideTable)
    }

    return (
        <div className="col-12 col-lg-7">
            <div className={`card shadow border-0 my-5 ${darkMode ? 'card-dark' : 'card-light'}`}>
                {/*<SelectTable selectedOption={selectedOption} setSelectedOption={setSelectedOption} />*/}
                <button className="btn btn-primary col-1 m-4 mb-2 d-flex justify-content-center" onClick={toggleHidden}>
                    {hideTable ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                </button>
                <div className={`${hideTable ? 'hide-table' : ''}`}>
                    <Table 
                        sortTeams={sortTeams}
                        teams={teams} 
                        setTeams={setTeams} 
                        highlightedTeams={highlightedTeams}
                        darkMode={darkMode}
                    /> 
                </div>

                <InfoTable darkMode={darkMode} />
            </div>
        </div>
    );
};