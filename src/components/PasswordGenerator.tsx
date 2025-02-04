import React, { useState, useEffect } from 'react';
import {calculateStrength, generatePassword} from "./passwordUtils.ts";

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [length, setLength] = useState<number>(12);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeSpecial, setIncludeSpecial] = useState<boolean>(true);
    const [strength, setStrength] = useState<number>(0);
    const [showToast, setShowToast] = useState<boolean>(false);

    const handleGeneratePassword  = () => {
        const newPassword = generatePassword(length, { includeUppercase, includeLowercase, includeSpecial });

        setPassword(newPassword);
        setStrength(calculateStrength(newPassword));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    useEffect(() => {
        calculateStrength(password);
    }, [length, includeUppercase, includeLowercase, includeSpecial, password]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Password Generator</h2>
            <div className="card w-96 bg-gray-800 shadow-xl">
                <div className="card-body">
                    <div className="form-control">
                        <div className="flex gap-6 input-group">
                            <input type="text"
                                   placeholder="P4$5W0rD!"
                                   aria-label="Generated Password"
                                   className="input input-bordered w-full"
                                   value={password}
                                   readOnly />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label items-center">
                            <span className="label-text">Password Length</span>
                            <span className="text-primary font-bold text-xl">{length}</span>
                        </label>
                        <input type="range" min="4" max="24" value={length} onChange={(e) => setLength(Number(e.target.value))} className="range range-primary" />
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer flex items-center justify-start">
                            <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className="checkbox checkbox-primary" />
                            <span className="label-text ml-2">Include Uppercase</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer flex items-center justify-start">
                            <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} className="checkbox checkbox-primary" />
                            <span className="label-text ml-2">Include Lowercase</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer flex items-center justify-start">
                            <input type="checkbox" checked={includeSpecial} onChange={(e) => setIncludeSpecial(e.target.checked)} className="checkbox checkbox-primary" />
                            <span className="label-text ml-2">Include Special Characters</span>
                        </label>
                    </div>
                    <div className="card flex p-3 bg-gray-900 form-control">
                        <label className="label">
                            <span className="label-text">Strength</span>
                            <span className="flex gap-2 items-center">
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} className={`w-2 h-2 card ${index < strength ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                                ))}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-6 form-control mt-6">
                <button className="btn btn-primary" onClick={handleGeneratePassword}>Generate Password</button>
                <button className="btn btn-square" onClick={copyToClipboard}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-3m-1-4h.01M21 5v20" />
                    </svg>
                </button>
            </div>
            {showToast && (
                <div className="toast toast-center">
                    <div className="alert alert-success">
                        <span>Password copied to clipboard!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PasswordGenerator;
