
import React, { useState } from "react"
import { Form, Row, Table } from "react-bootstrap";

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
                    return { name, rounds: [{ bet: 7, scored: 5 }] as Round[] };
                }));
            }} />
        case GAME_STATES.SCOREBOARD:
            return <ScoreDisplay players={players} done={() => setGameState(GAME_STATES.GAME)} />
    }
}

function ImportNames({ done, names, setNames }: { done: () => void, names: string[], setNames: (names: string[]) => void }) {
    const maxPossibleTricks = Math.floor(52 / names.length);
    return <Form>
        {names.map((_, i) => {
            return (
                <Row className="mb-3">
                    <Form.Group key={`name-${i}`} className="mb-3">
                        <Form.Label>Player {i + 1}</Form.Label>
                        <Form.Control required aria-required defaultValue={names[i]} onChange={(e) => {
                            const newNames = [...names];
                            newNames[i] = e.currentTarget.nodeValue ?? "";
                            setNames(newNames)
                        }} />
                    </Form.Group>
                </Row>)
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
    </Form>
}

function ScoreDisplay({ players, done }: { players: Player[], done: (increase: boolean) => void }) {
    return <Table>
        <thead>
            <th />
            {players.map(player => (<th>{player.name}</th>))}
        </thead>
        <tbody>
            {players[0].rounds.map((_, i) => {
                return (
                    <tr>
                        <PlayerScoreDisplay players={players} row={i} />
                    </tr>
                )
            })}
            <tr><button onClick={() => done(false)}>-</button><button onClick={() => done(true)}>+</button></tr>
        </tbody>
    </Table>
}

function PlayerScoreDisplay({ row, players }: { players: Player[], row: number }) {
    return (
        <>
            <td />
            {players.map(player => (<td>
                {player.rounds[row].scored}/{player.rounds[row].bet}
            </td>))}
        </>);

}
