import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default ({ round, setRound }) => {

    const addRound = () => {
        setRound(round + 1)
    }

    const removeRound = () => {
        setRound(round - 1)
    }

    return (
        <div className="d-flex align-items-center justify-content-around py-3 round">
            <button onClick={round == 1 ? null : removeRound} >
                <FontAwesomeIcon 
                    icon={faArrowLeft} 
                    className={`fs-5 ${round == 1 ? 'text-secondary' : 'text-white'}`} 
                />
            </button>

            <h3 className="text-white text-center">Round {round > 0 && round < 10 ? `0${round}` : round}</h3>
            
            <button onClick={round == 38 ? null : addRound} >
                <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className={`fs-5 ${round == 38 ? 'text-secondary' : 'text-white'}`} 
                />
            </button>
        </div>
    )
}