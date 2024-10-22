import React from "react";

export default ({ toggleDarkMode }) => {

    return (
        
        <header>
            <div className="container d-flex justify-content-center align-items-center gap-2 py-2">
                <img src="https://api.sofascore.app/api/v1/unique-tournament/325/image/dark" alt="" />
                <h1 className="text-white">Simulador Brasileirão</h1>

                <div className="form-check form-switch m-0">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleDarkMode} />
                </div>
            </div>
        </header>
    )
}