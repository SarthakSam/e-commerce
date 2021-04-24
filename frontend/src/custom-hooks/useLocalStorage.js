import { useEffect, useState } from "react";

const readFromLocalStorage = (key, val) => {
    const data = localStorage.getItem(key);
    if(data) {
        return JSON.parse(data);
    }
    return typeof val === 'function'? val() : val;
}

export function UseLocalStorage(key, initialState) {
    const [state, setState] = useState(readFromLocalStorage(key, initialState));

    useEffect( () => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state] );

    return [state, setState];
}