import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default ({ toggleDarkMode, darkMode }) => {

    return (
        <button className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center position-fixed z-1 btn-dark-mode" onClick={toggleDarkMode}>
            {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
        </button>
    )
}