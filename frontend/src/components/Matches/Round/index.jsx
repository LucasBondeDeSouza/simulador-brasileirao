import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default ({ round, setRound, darkMode }) => {

    const addRound = () => {
        setRound(round + 1)
    }

    const removeRound = () => {
        setRound(round - 1)
    }

    return (
        <div className={`d-flex align-items-center justify-content-around py-2 round`}>
            <button onClick={round == 1 ? null : removeRound} >
                <FontAwesomeIcon 
                    icon={faArrowLeft} 
                    className={`fs-5 ${round == 1 ? (darkMode ? 'text-secondary' : 'arrow-light') : (darkMode ? 'text-white' : 'text-dark')}`} 
                />
            </button>

            <h3 className={`${darkMode ? 'text-white' : 'text-dark'} text-center`}>Rodada {round > 0 && round < 10 ? `0${round}` : round}</h3>
            
            <button onClick={round == 38 ? null : addRound} >
                <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className={`fs-5 ${round == 38 ? (darkMode ? 'text-secondary' : 'arrow-light') : (darkMode ? 'text-white' : 'text-dark')}`} 
                />
            </button>
        </div>
    )
}