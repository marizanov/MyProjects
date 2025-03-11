import { GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import React, { createContext, useState, ReactNode } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextProps {
    user: User | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: async () => { },
    logout: async () => { },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const login = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: "select_account",
        });

        try {
            const { user } = await signInWithPopup(auth, provider);
            setUser(user);


            const usersCollection = collection(db, "users");
            const userDocRef = doc(usersCollection, user.email!);
            const userDocSnapshot = await getDoc(userDocRef);


            if (!userDocSnapshot.exists()) {
                await setDoc(userDocRef, {
                    displayName: user.displayName,
                    email: user.email,
                    id: user.uid,
                });
            }

            navigate("/all-workouts");
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};