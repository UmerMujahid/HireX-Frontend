import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const API_BASE = 'http://127.0.0.1:8000/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('hirex_user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('hirex_access') || null);

  useEffect(() => {
    if (user) localStorage.setItem('hirex_user', JSON.stringify(user));
    else localStorage.removeItem('hirex_user');
  }, [user]);

  useEffect(() => {
    if (accessToken) localStorage.setItem('hirex_access', accessToken);
    else localStorage.removeItem('hirex_access');
  }, [accessToken]);

  const login = async ({ email, password }) => {
    const res = await fetch(`${API_BASE}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = { detail: await res.text() || 'Server Error' };
    }

    if (!res.ok) throw data;

    // Backend returns { access, refresh, role, email }
    setAccessToken(data.access || null);
    setUser({ email: data.email, role: data.role });
    return data;
  };

  const signup = async (payload) => {
    const res = await fetch(`${API_BASE}/signup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = { detail: await res.text() || 'Server Error' };
    }
    if (!res.ok) throw data;
    return data;
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
