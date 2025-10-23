"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";

export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  role: "vendor" | "buyer" | "admin";
  is_active: boolean;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name: string;
  role: "vendor" | "buyer";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Verify token and get user info
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      api.get("/api/auth/me")
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem("token");
          setToken(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/api/auth/login", { username, password });
      const { access_token } = response.data;
      
      setToken(access_token);
      localStorage.setItem("token", access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      
      // Get user info
      const userResponse = await api.get("/api/auth/me");
      setUser(userResponse.data);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      console.log("Sending registration data:", userData);
      const response = await api.post("/api/auth/register", userData);
      // After successful registration, automatically log in
      await login(userData.username, userData.password);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.detail) {
        console.error("Validation error details:", error.response.data.detail);
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
