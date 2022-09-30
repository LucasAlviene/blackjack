import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { event, offEvent, onEvent } from './utils/event';
import Home from './pages/Home'
import CreateRoom from './pages/CreateRoom'
import JoinRoom from './pages/JoinRoom'
import WaitingRoom from './pages/WaitingRoom'
import Room from './pages/Room'
import PageLinks from './pages/PageLinks'

interface AppProps {

}

const App: React.FC<AppProps> = () => {

    const [log, setLog] = useState<string[]>([]);
    const [ip,setIP] = useState("");

    useEffect(() => {
        const listener = (e, data) => {
            console.log(data);
            setLog((old) => [JSON.stringify(data), ...old]);
        };
        onEvent("eventServer", listener)

        return () => offEvent("eventServer", listener);
    }, []);

    const handleServer = (e: React.MouseEvent) => event("startServer");
    const handleClient = (e: React.MouseEvent) => event("joinServer", [ip, "Lucas"]);
    const handleStarGame = (e: React.MouseEvent) => event("eventClient", ["START"]);

    return (
        <>
            <Routes>
                <Route path={PageLinks.HOME} element={<Home />} />
                <Route path={PageLinks.CREATE_ROOM} element={<CreateRoom />} />
                <Route path={PageLinks.JOIN_ROOM} element={<JoinRoom />} />
                <Route path={PageLinks.WAITING_ROOM} element={<WaitingRoom />} />
                <Route path={PageLinks.ROOM} element={<Room />} />
            </Routes>
            <b>VERSÃO MAIS ATUAL - 1.0.0</b>
            <input type="text" value={ip} onChange={(e) => setIP(e.target.value)} />
            <div>
                <button onClick={handleServer}> Start Server </button>
                <button onClick={handleClient}> Start Client </button>
                <button onClick={handleStarGame}> Start Game </button>
            </div>
            <ul>
                {log.map((item) => <li>{item}</li>)}
            </ul>

        </>
    )
}
export default App;
