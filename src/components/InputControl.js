import React from "react";
import styles from "./InputControl.module.css";

function InputControl({ props, label, onChange, placeholder, type = "text" }) {
    return (
        <div className={styles.container}>
            <label>{label}</label>
            <input
                type={type}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default InputControl;
