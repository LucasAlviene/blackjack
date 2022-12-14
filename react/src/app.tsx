import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { event, offEvent, onEvent } from './utils/event';
import Home from './pages/Home'
import CreateRoom from './pages/CreateRoom'
import JoinRoom from './pages/JoinRoom'
import WaitingRoom from './pages/WaitingRoom'
import Room from './pages/Room'
import PageLinks from './pages/PageLinks'
import { useDispatch } from './store/Root.store';
import { push } from './store/Log.store';

interface AppProps {

}

const App: React.FC<AppProps> = () => {
    const dispatch = useDispatch();
    //const [log, setLog] = useState<string[]>([]);

    useEffect(() => {
        const listener = (e, data) => {
            dispatch(push(JSON.stringify(data)));
            //setLog((old) => [JSON.stringify(data), ...old]);
        };
        onEvent("eventServer", listener)

        return () => offEvent("eventServer", listener);
    }, []);

    return (
        <Routes>
            <Route path={PageLinks.HOME} element={<Home />} />
            <Route path={PageLinks.CREATE_ROOM} element={<CreateRoom />} />
            <Route path={PageLinks.JOIN_ROOM} element={<JoinRoom />} />
            <Route path={PageLinks.WAITING_ROOM} element={<WaitingRoom />} />
            <Route path={PageLinks.ROOM} element={<Room />} />
        </Routes>
    )
}/*
            <ul>
                {log.map((item) => <li>{item}</li>)}
            </ul>
            <b>VERSÃO MAIS ATUAL - 1.2.4</b>
            <input type="text" value={ip} onChange={(e) => setIP(e.target.value)} />
            <div>
                <button onClick={handleServer}> Start Server </button>
                <button onClick={handleClient}> Start Client </button>
                <button onClick={handleStarGame}> Start Game </button>
            </div>
            */
export default App;
