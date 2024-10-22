import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default ({ toggleDarkMode, darkMode }) => {

    return (
        <button className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center position-fixed z-1" style={{ bottom: '20px', right: '20px', height: '40px', width: '40px' }} onClick={toggleDarkMode}>
            {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
        </button>
    )
}