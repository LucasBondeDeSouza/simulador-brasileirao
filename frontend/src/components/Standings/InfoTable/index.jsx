import React from "react";

export default ({ darkMode }) => {
    return (
        <div className={`d-flex flex-row flex-md-row align-items-start justify-content-between px-2 py-3 info ${darkMode ? 'text-light' : 'text-dark'}`}>
            <div className="d-flex align-items-center gap-1">
                <div className="info-table libertadores"></div>
                <p className="m-0">Libertadores</p>
            </div>

            <div className="d-flex align-items-center gap-1">
                <div className="info-table qualificacao"></div>
                <p className="m-0">Pré-Libertadores</p>
            </div>

            <div className="d-flex align-items-center gap-1">
                <div className="info-table sulamericana"></div>
                <p className="m-0">Sul-Americana</p>
            </div>

            <div className="d-flex align-items-center gap-1">
                <div className="info-table rebaixamento"></div>
                <p className="m-0">Rebaixamento</p>
            </div>
        </div>
    )
}