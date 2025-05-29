
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
    subtotal?: number;
    tricks: number;
}

interface Player {
    name: string;
    rounds: Round[];
}

export function Spades() {
    const [gameState, setGameState] = React.useState(GAME_STATES.INPUT_NAMES);
    const [names, setNames] = useState(["foo", "bar", "biz", "baz"]);
    const [players, setPlayers] = useState([] as Player[]);
    const [currentTricks, setCurrentTricks] = useState(0);

    switch (gameState) {
        case GAME_STATES.INPUT_NAMES:
            return <ImportNames names={names} setNames={setNames} done={(tricks) => {
                setCurrentTricks(tricks);
                setGameState(GAME_STATES.GAME);
                setPlayers(names.filter(name => name.length > 0).map(name => {
                    return { name, rounds: [{ bet: 7, scored: 5, subtotal: 5, tricks: 12 }] };
                }));
            }} />
        case GAME_STATES.GAME:
            return <Game players={players} done={() => setGameState(GAME_STATES.SCOREBOARD)} />
        case GAME_STATES.SCOREBOARD:
            return <Scoreboard players={players} lastTricks={currentTricks} done={(nextBid) => {
                setCurrentTricks(nextBid);
                setGameState(GAME_STATES.GAME);
            }} />
    }
}

function Scoreboard({ players, done, lastTricks }: { players: Player[], done: (nextBid: number) => void, lastTricks: number }) {
    const rounds = Math.max(players[0].rounds.length, 10);
    return <><Table striped>
        <thead>
            <tr>
                <th />
                {players.map(player => (<th>{player.name}</th>))}
            </tr>
        </thead>
        <tbody>
            {[...Array(rounds)].map((_, i) => {
                return (
                    <tr key={`row ${i}`}>
                        <ScoreboardRow players={players} row={i} />
                    </tr>
                )
            })}
        </tbody>
    </Table>
        <button onClick={() => done(lastTricks - 1)}>-</button><button onClick={() => done(lastTricks + 1)}>+</button>
    </>
}

function ScoreboardRow({ row, players }: { players: Player[], row: number }) {
    const trickNumber = (players[0].rounds[row] ?? { tricks: "" }).tricks
    return (
        <>
            <td >{trickNumber}</td>
            {players.map((player, i) => (<td key={i} style={{ minWidth: "50px" }}>
                {player.rounds[row] ? (<>{player.rounds[row].scored}/{player.rounds[row].bet}<br />{player.rounds[row].subtotal}</>) : "\u00A0"}
            </td>))}
        </>);
}

interface GameProps { done: () => void, players: Player[] }

function Game({ done, players }: GameProps) {
    return <Table striped>
        <thead>
            <tr>
                <td />
                <td>Bet</td>
            </tr>
        </thead>
        <tbody>
            {players.map((player, i) => <GameRow player={player} key={i} />)}
            <tr><button onClick={() => done()}>-</button><button onClick={() => done()}>+</button></tr>
        </tbody>
    </Table>
}

interface GameRowProps { player: Player }

function GameRow({ player }: GameRowProps) {
    return <tr><td>{player.name}</td></tr>;
}
