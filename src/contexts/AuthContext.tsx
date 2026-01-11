import React, { createContext, useContext, useState } from 'react';

interface UserProfile {
    name: string;
    role: string;
    email: string;
    avatar: string;
    phone: string;
    department: string;
    designation: string;
    language: string;
    bio: string;
}

interface AuthContextType {
    user: UserProfile;
    updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile>(() => {
        const savedUser = localStorage.getItem('user_profile');
        if (savedUser) return JSON.parse(savedUser);
        return {
            name: 'Furqan Yasin',
            role: 'Project Owner',
            email: 'furqan@example.com',
            avatar: '/assets/images/user.png',
            phone: '(1) 2536 2561 2365',
            department: 'Development',
            designation: 'Front End Developer',
            language: 'English',
            bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        };
    });

    const updateProfile = (profile: Partial<UserProfile>) => {
        setUser((prev) => {
            const newUser = { ...prev, ...profile };
            localStorage.setItem('user_profile', JSON.stringify(newUser));
            return newUser;
        });
    };

    return (
        <AuthContext.Provider value={{ user, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
