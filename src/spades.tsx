
import React, { useState } from "react"
import { Table } from "react-bootstrap";
import { ImportNames } from "./NameInput";

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
    const [names, setNames] = useState(["foo", "bar", "biz", "baz"]);
    const [players, setPlayers] = useState([] as Player[]);


    switch (gameState) {
        case GAME_STATES.INPUT_NAMES:
            return <ImportNames names={names} setNames={setNames} done={() => {
                setGameState(GAME_STATES.SCOREBOARD);
                setPlayers(names.map(name => {
                    return { name, rounds: [{ bet: 7, scored: 5 }] };
                }));
            }} />
        case GAME_STATES.SCOREBOARD:
            return <Scoreboard players={players} done={() => setGameState(GAME_STATES.GAME)} />
        case GAME_STATES.GAME:
            return <Game players={players} done={() => setGameState(GAME_STATES.SCOREBOARD)} />
    }
}



function Scoreboard({ players, done }: { players: Player[], done: (increase: boolean) => void }) {
    const rounds = Math.max(players[0].rounds.length, 10)
    return <Table striped>
        <thead>
            <th />
            {players.map(player => (<th>{player.name}</th>))}
        </thead>
        <tbody>
            {[...Array(rounds)].map((_, i) => {
                return (
                    <tr>
                        <ScoreboardRow players={players} row={i} />
                    </tr>
                )
            })}
            <tr><button onClick={() => done(false)}>-</button><button onClick={() => done(true)}>+</button></tr>
        </tbody>
    </Table>
}

function ScoreboardRow({ row, players }: { players: Player[], row: number }) {
    return (
        <>
            <td />
            {players.map(player => (<td style={{ minWidth: "50px" }}>
                {player.rounds[row] ? (<>{player.rounds[row].scored}/{player.rounds[row].bet}</>) : "\u00A0"}
            </td>))}
        </>);

}

interface GameProps { done: () => void, players: Player[] }

function Game({ }: GameProps) {
    return <></>
}