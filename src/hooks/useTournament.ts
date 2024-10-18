import { useState } from "react";

type Match = {
    id: string;
    player1: string;
    player2: string;
    winner: string;
};

type Round = {
    id: number;
    matches: Match[]; 
};

type Tournament = {
    id: string;
    name: string;
    date: string;
    location: string;
    host: string;
    status: string;
    players: string[];
    rounds: Round[];
}

type MatchPlayers = {
    player1: string;
    player2: string;
}

const useTournament = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);

    const addTournament = (tournament: Tournament) => {
        setTournaments(p => [...p, tournament]);
    }

    const removeTournament = (id: string) => {
        setTournaments(p => p.filter(t => t.id !== id));
    }

    const addPlayerToTournament = (id: string, player: string) => {
        setTournaments(p => p.map(t => {
            if (t.id === id) {
                return {
                    ...t,
                    players: [...t.players, player]
                }
            }
            return t;
        }));
    }

    const setFirstRoundMatches = (id: string, firstMatches: MatchPlayers[]) => {
        setTournaments(p => 
            p.map(t => {
                if (t.id === id) {
                    return {
                        ...t,
                        rounds: [
                            {
                                id: 1,
                                matches: firstMatches.map((m, i) => ({
                                    id: `${t.id}-1-${i}`,
                                    player1: m.player1,
                                    player2: m.player2,
                                    winner: ''
                                }))
                            }
                        ]
                    };
                }
                return t;
            })
        );
    };

    const setMatchWinner = (tournamentId: string, roundId: number, matchId: string, winner: string) => {
        setTournaments(p => 
            p.map(t => {
                if (t.id === tournamentId) {
                    return {
                        ...t,
                        rounds: t.rounds.map(r => {
                            if (r.id === roundId) {
                                return {
                                    ...r,
                                    matches: r.matches.map(m => {
                                        if (m.id === matchId) {
                                            return {
                                                ...m,
                                                winner
                                            }
                                        }
                                        return m;
                                    })
                                }
                            }
                            return r;
                        })
                    }
                }
                return t;
            })
        );
    }

    const finishTournament = (tournamentId: string) => {
        setTournaments(p => 
            p.map(t => {
                if (t.id === tournamentId) {
                    return {
                        ...t,
                        status: 'finished'
                    }
                }
                return t;
            })
        );
    }
    

    return {
        tournaments,
        addTournament,
        removeTournament,
        addPlayerToTournament,
        setFirstRoundMatches,
        setMatchWinner,
        finishTournament
    }
}

export default useTournament;