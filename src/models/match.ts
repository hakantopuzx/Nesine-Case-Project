export interface MatchListModel {
    C: string;
    N: string;
    D: string;
    DAY: string;
    HEC: boolean;
    IMF: boolean;
    T: string;
    LN: string;
    OCG: Rate;
}

export interface Rate {
    [key: string]: {
        ID: string;
        N: string;
        MBS: string;
        SO: number;
        OC: RateDetail[];
    };
}

export interface RateDetail {
    ID: string;
    O: string;
    N: string;
    MBS: string;
    G: string;
    OD: number;
    IMF: boolean;
}

export interface SelectedMatch {
    rate: number;
    matchInfo: { C: string; N: string };
}