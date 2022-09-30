import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { event, onEvent } from './utils/event';
import Home from './pages/Home'
import CreateRoom from './pages/CreateRoom'
import JoinRoom from './pages/JoinRoom'
import WaitingRoom from './pages/WaitingRoom'
import Room from './pages/Room'
import PageLinks from './pages/PageLinks'

interface AppProps {

}

const App: React.FC<AppProps> = () => {

    useEffect(() => {
        onEvent("eventServer", (e, data) => {
            console.log(data);
        })
    }, []);

    const handleServer = (e: React.MouseEvent) => event("startServer");
    const handleClient = (e: React.MouseEvent) => event("joinServer", ["localhost", "Lucas"]);
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
            <div>
                <button onClick={handleServer}> Start Server </button>
                <button onClick={handleClient}> Start Client </button>
                <button onClick={handleStarGame}> Start Game </button>
            </div>

        </>
    )
}
export default App;
