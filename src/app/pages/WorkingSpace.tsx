"use client";
import React, { useState } from 'react';


export default function WorkingSpace() {

    const [currentCase, setCurrentCase] = useState<null>(null);

    return (
        <div className="text-white">
            <button onClick={() => setCurrentCase(<div>Hi1</div>)}>Case 1</button>
            <button onClick={() => setCurrentCase(<div>Hi2</div>)}>Case 2</button>
            <button onClick={() => setCurrentCase(<div>Hi3</div>)}>Case 3</button>
            {currentCase}
        </div>
    );
};

