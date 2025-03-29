
import React, { useState } from "react"

enum GAME_STATES {
    INPUT_NAMES,
    SCOREBOARD,
    GAME
}

interface Round {
    bet: number;
    scored: number;
}

interface Player {
    name: string;
    rounds: Round[];
}

export function Spades() {
    const [gameState, setGameState] = React.useState(GAME_STATES.INPUT_NAMES);
    const [names, setNames] = useState(["Mark", "Chloe", "Kate", "AJ"]);
    const [players, setPlayers] = useState([] as Player[]);
    

    switch (gameState) {
        case GAME_STATES.INPUT_NAMES:
            return <ImportNames names={names} setNames={setNames} done={() => {
                setGameState(GAME_STATES.SCOREBOARD);
                setPlayers(names.map(name => {
                    return { name, rounds: [{bet: 7, scored: 5}] as Round[] };
                }));
            }} />
        case GAME_STATES.SCOREBOARD:
            return <ScoreDisplay players={players} done={() => setGameState()}/>
    }
}

function ImportNames({ done, names, setNames }: { done: () => void, names: string[], setNames: (names: string[]) => void }) {
    const maxPossibleTricks = Math.floor(52 / names.length);
    return <table>
        <tbody>
            {names.map((_, i) => {
                return (
                    <tr key={i}>
                        <td><NameInput defaultValue={names[i]} setName={(name) => { console.log(name) }} /></td>
                    </tr>)
            })}
            <tr><td><button onClick={() => {
                setNames([...names, ''])
            }}>Add Player</button></td></tr>
            <tr>
                <td>
                    Max Tricks {maxPossibleTricks}
                </td>
            </tr>
            <tr>
                <td>
                    <button onClick={done}>Go</button>
                </td>
            </tr>
        </tbody>
    </table>
}

export function NameInput({ setName, defaultValue }: { defaultValue?: string, setName: (name: string) => void }) {
    return <input required={true} aria-required={true} defaultValue={defaultValue} onChange={(e) => setName(e.target.value)} />
}

function ScoreDisplay({ players, done }: { players: Player[], done: (increase: boolean) => void }) {
    return <table>
        <tbody>
            {players.map(player => {
                return (
                    <tr>
                        <PlayerScoreDisplay player={player} />
                    </tr>
                )
            })}
            <tr><button onClick={() => done(false)}>-</button><button onClick={() => done(true)}>+</button></tr>
        </tbody>
    </table>
}

function PlayerScoreDisplay({ player }: { player: Player }) {
    return (
        <>
            <td>{player.name}</td>
            {player.rounds.map(round => {
                return (<td>
                    {round.scored}/{round.bet}
                </td>)
            })}
        </>);

}
