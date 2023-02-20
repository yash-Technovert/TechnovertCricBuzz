import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export interface IAuthProvider {
    token: null;
    onLogin: (data: any) => void;
    onLogout: () => void;
    checkAuth: () => Promise<any>;
}
const AuthContext = createContext<IAuthProvider | null>(null);

// @ts-ignore
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("sb-jnyomjupkafvnwilgjws-auth-token");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setToken(foundUser);
        }
    }, []);

    const handleLogin = (data: any) => {
        //   const token = await fakeAuth();
        setToken(data);
        navigate('/matchsettings');
    };

    const handleLogout = () => {
        setToken(null);
    };

    const checkAuth = async () => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setToken(foundUser);
        }
        return token
    };

    const value: IAuthProvider = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
        checkAuth
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    return useContext(AuthContext) as IAuthProvider;
};

export { AuthProvider, AuthContext, useAuth };
