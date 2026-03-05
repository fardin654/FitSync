import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign in with Google
    const login = async () => {
        try {
            // Force account selection to prevent auto-closing if it's an account state issue
            googleProvider.setCustomParameters({ prompt: 'select_account' });

            const result = await signInWithPopup(auth, googleProvider);
            // 1. Extract additional info from the login result
            const additionalInfo = result._tokenResponse && result._tokenResponse.isNewUser ? { isNewUser: true } : { isNewUser: false };
            console.log("Additional Info: "+ additionalInfo);

            // 2. Check if this is the user's very first time signing in
            if (additionalInfo.isNewUser) {
                console.log("New user detected! Initializing database entry...");
                
                // 3. Define the hypothetical/default data
                const defaultData = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    createdAt: new Date().toISOString(),
                    // Injecting your timetable defaults here:
                    routine: {
                        Mon: { title: 'Chest & Triceps', exercises: ['Bench Press', 'Incline Dumbbell'] },
                        Tue: { title: 'Legs', exercises: ['Squat', 'Leg Press'] },
                        Wed: { title: 'Rest / Recovery', exercises: ['Rest'] },
                        Thu: { title: 'Back & Biceps', exercises: ['Deadlift', 'Pullups'] },
                        Fri: { title: 'Shoulders', exercises: ['Overhead Press', 'Lateral Raises'] },
                        Sat: { title: 'Rest / Recovery', exercises: ['Rest'] },
                        Sun: { title: 'Active Recovery', exercises: ['Cardio'] }
                    },
                    prs: {},
                    prHistory: []
                };

                // 4. Save to Firestore using their unique UID
                const userDocRef = doc(db, 'users', result.user.uid);
                await setDoc(userDocRef, defaultData);
            }
            console.log("Login Success: ", result.user.email);
            return result;
        } catch (error) {
            console.error("Firebase Login Error Code:", error.code);
            console.error("Firebase Login Error Message:", error.message);
            throw error;
        }
    };

    // Sign out
    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
