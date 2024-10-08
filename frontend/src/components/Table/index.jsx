import React, { useState } from "react";

export default () => {
    const [selectedOption, setSelectedOption] = useState('MLS');

    const handleSelect = (value) => {
        setSelectedOption(value);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-7">
                    <div className="card shadow mt-5">
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
                                    src="https://images.mlssoccer.com/image/upload/v1665849438/assets/logos/MLS-Crest-FFF-480px_tmwlkh.png"
                                    alt=""
                                />
                                {selectedOption}
                            </button>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={() => handleSelect('MLS')}>MLS</a>
                                <a className="dropdown-item" onClick={() => handleSelect('Eastern Conference')}>Eastern Conference</a>
                                <a className="dropdown-item" onClick={() => handleSelect('Western Conference')}>Western Conference</a>
                            </div>
                        </div>

                        <table className="my-2">
                            <thead className="text-secondary fw-bold">
                                <tr>
                                    <th className="">#</th>
                                    <th colSpan="7">Time</th>
                                    <th className="text-center">J</th>
                                    <th className="text-center d-none d-sm-table-cell">V</th>
                                    <th className="text-center d-none d-sm-table-cell">E</th>
                                    <th className="text-center d-none d-sm-table-cell">D</th>
                                    <th className="text-center d-none d-sm-table-cell">Gols</th>
                                    <th className="text-center d-table-cell d-sm-none">Dif</th>
                                    <th className="text-center">PTS</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                <tr>
                                    <td>1</td>
                                    <td colSpan="7">
                                        <img src="https://api.sofascore.app/api/v1/team/337602/image" alt="" />
                                        Inter Miami
                                    </td>
                                    <td className="text-center">33</td>
                                    <td className="text-center d-none d-sm-table-cell">21</td>
                                    <td className="text-center d-none d-sm-table-cell">8</td>
                                    <td className="text-center d-none d-sm-table-cell">4</td>
                                    <td className="text-center d-none d-sm-table-cell">73:47</td>
                                    <td className="text-center d-table-cell d-sm-none">+26</td>
                                    <td className="text-center">71</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td colSpan="7">
                                        <img src="https://api.sofascore.app/api/v1/team/2513/image" alt="" />
                                        LA Galaxy
                                    </td>
                                    <td className="text-center">33</td>
                                    <td className="text-center d-none d-sm-table-cell">19</td>
                                    <td className="text-center d-none d-sm-table-cell">7</td>
                                    <td className="text-center d-none d-sm-table-cell">7</td>
                                    <td className="text-center d-none d-sm-table-cell">68:48</td>
                                    <td className="text-center d-table-cell d-sm-none">+20</td>
                                    <td className="text-center">64</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}