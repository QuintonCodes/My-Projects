import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "../components/ui/use-toast";
import { useAppDispatch } from "../hooks/reduxHooks";
import { clearCart } from "../state/slices/cartSlice";
import { loginUser, registerUser } from "../utils/api";

interface User {
  username: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      toast({
        title: "Login Successful",
        description: "You have successfully logged in!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials.",
        duration: 3000,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      await registerUser({ username, email, password });
      toast({
        title: "Registration Successful",
        description: "You can now log in.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        duration: 3000,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    dispatch(clearCart());
    toast({
      title: "Logout Successful",
      description: "You have successfully logged out.",
      duration: 3000,
    });
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};