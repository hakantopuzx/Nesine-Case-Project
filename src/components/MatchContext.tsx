import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SelectedMatch } from '../models/match';

interface MatchContextProps {
    selectedMatch: SelectedMatch[];
    setSelectedMatch: React.Dispatch<React.SetStateAction<SelectedMatch[]>>;
    selectedMatchInfo: { C: string; N: string } | null;
    setSelectedMatchInfo: React.Dispatch<React.SetStateAction<{ C: string; N: string } | null>>;
    totalMatchResult: number;
    setTotalMatchResult: React.Dispatch<React.SetStateAction<number>>;
}

export const MatchContext = createContext<MatchContextProps | undefined>(undefined);

export const MatchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedMatch, setSelectedMatch] = useState<SelectedMatch[]>([]);
    const [selectedMatchInfo, setSelectedMatchInfo] = useState<{ C: string; N: string } | null>(null);
    const [totalMatchResult, setTotalMatchResult] = useState<number>(0);

    const value = {
        selectedMatch,
        setSelectedMatch,
        selectedMatchInfo,
        setSelectedMatchInfo,
        totalMatchResult,
        setTotalMatchResult,
    };

    return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
};

export const useMatchContext = () => {
    const context = useContext(MatchContext);
    if (!context) {
        throw new Error('err');
    }
    return context;
};
