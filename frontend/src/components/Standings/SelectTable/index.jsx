import React from "react";

export default ({ selectedOption, setSelectedOption }) => {

    const handleSelect = (value) => {
        setSelectedOption(value);
    };

    return (
        <div>
            <div className="dropdown p-3">
                <button
                    className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <img
                        src="https://api.sofascore.app/api/v1/unique-tournament/242/image/dark"
                        alt=""
                    />
                    {selectedOption}
                </button>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" onClick={() => handleSelect('MLS')}>MLS</a>
                    <a className="dropdown-item" onClick={() => handleSelect('Eastern')}>Eastern Conference</a>
                    <a className="dropdown-item" onClick={() => handleSelect('Western')}>Western Conference</a>
                </div>
            </div>
        </div>
    );
};