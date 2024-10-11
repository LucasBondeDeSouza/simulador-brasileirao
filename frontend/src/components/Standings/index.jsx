import React, { useState } from "react";
import Table from "./Table";
import SelectTable from "./SelectTable";

export default () => {
    const [selectedOption, setSelectedOption] = useState('MLS');

    return (
        <div className="col-12 col-lg-7">
            <div className="card shadow mt-5">
                <SelectTable selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                <Table selectedOption={selectedOption} />
            </div>
        </div>
    );
};