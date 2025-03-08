import React, { useState } from "react";
import "./Header.css";

const Header = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
                style={{ display: "none" }}
            />
            <div className={`toggle ${isChecked ? "checked" : ""}`}>
                <div className="ball"></div>
            </div>
        </label>
    );
};

export default Header;