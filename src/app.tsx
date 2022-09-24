import React, {useEffect} from 'react';
import {event} from './utils/event';

interface AppProps {

}

const App:React.FC<AppProps> = () => {

    useEffect(() => {
    },[]);

    const handleServer = (e: React.MouseEvent) => event("startServer");
    const handleClient = (e: React.MouseEvent) => event("joinServer");

    return(
        <a>
            <button onClick={handleServer}> Start Server </button>
            <button onClick={handleClient}> Start Client </button>
        </a>
    )
}
export default App;
