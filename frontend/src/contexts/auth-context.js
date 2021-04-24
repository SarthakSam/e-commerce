import { useContext, createContext } from 'react';
import { UseLocalStorage } from "../custom-hooks/useLocalStorage";

const AuthContext = createContext(false);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [user, setUser] = UseLocalStorage('authToken', null);

    return (
        <AuthContext.Provider value = {{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}