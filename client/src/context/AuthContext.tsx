/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

// Context type
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Real logic provider (must be used under <Router>)
const AuthProviderWithRouter = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get('token');
    const user = Cookies.get('user');

    if (token && user) {
      setIsAuthenticated(true);

      const role = JSON.parse(user).role;

      // Redirect from login if already authenticated
      if (location.pathname === '/login') {
        if (role === 'ADMIN') {
          navigate('/admin');
        } else if (role === 'STUDENT') {
          navigate('/student');
        } else {
          navigate('/dashboard');
        }
      }
    } else {
      setIsAuthenticated(false);
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    }
  }, [location.pathname, navigate]);

  const login = (token: string, user: any) => {
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('user', JSON.stringify(user));
    setIsAuthenticated(true);

    const role = user.role;
    if (role === 'ADMIN') {
      navigate('/admin');
    } else if (role === 'STUDENT') {
      navigate('/student');
    } else {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Public wrapper that must be used inside <BrowserRouter>
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProviderWithRouter>{children}</AuthProviderWithRouter>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
