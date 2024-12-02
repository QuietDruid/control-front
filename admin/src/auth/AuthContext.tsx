import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: { token: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing tokens on mount
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (accessToken) {
      // You might want to validate the token here
      setUser({ token: accessToken });
    }
    setLoading(false);
  }, []);

  // const login = async (username: string, password: string): Promise<boolean> => {
  //   try {
  //     const response = await fetch('https://backend.rodriguezjr.org:443/api/token/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error('Login failed:', response.status, errorText);
  //       throw new Error(`Login failed: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     localStorage.setItem('accessToken', data.access);
  //     localStorage.setItem('refreshToken', data.refresh);
  //     setUser({ token: data.access });
  //     return true;
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     return false;
  //   }
  // };

  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('https://backend.rodriguezjr.org:443/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login failed:', response.status, errorText);
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setUser({ token: data.access });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  const refreshToken = async (): Promise<boolean> => {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) return false;

    try {
      const response = await fetch('https://backend.rodriguezjr.org:443/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      setUser({ token: data.access });
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};