import { Form, Row } from "react-bootstrap";


interface ImportNamesProps { done: (tricks: number) => void, names: string[], setNames: (names: string[]) => void }

export function ImportNames({ done, names, setNames }: ImportNamesProps) {
    const maxPossibleTricks = Math.floor(52 / names.length);
    return <Form>
        {names.map((_, i) => (
            <Row key={i} className="mb-1">
                <Form.Group key={`name-${i}`} className="mb-1">
                    <Form.Label>Player {i + 1}</Form.Label>
                    <Form.Control required aria-required defaultValue={names[i]} onChange={(e) => {
                        const newNames = [...names];
                        newNames[i] = e.currentTarget.nodeValue ?? "";
                        setNames(newNames)
                    }} />
                </Form.Group>
            </Row>)
        )}
        <Row><td><button onClick={() => {
            setNames([...names, ''])
        }}>Add Player</button></td></Row>
        <Row>
            <td>
                Max Tricks {maxPossibleTricks}
            </td>
        </Row>
        <Row>
            <td>
                <button onClick={() => done()}>Go</button>
            </td>
        </Row>
    </Form>
}