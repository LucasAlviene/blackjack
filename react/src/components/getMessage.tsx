import { useSelector, useDispatch } from '../store/Root.store';
const getMessage = (status: string, currentTurnPlayerId: number) => {
    const { user, players } = useSelector(state => state.players)
    const currentTurnPlayerIsUser = user?.id === currentTurnPlayerId
    const currentPlayer = players.find((player) => player.id == currentTurnPlayerId)?.name;
    if (status == "STAND") return currentTurnPlayerIsUser ? "Seu Turno" : "Turno do " + currentPlayer;
    if(status == "DRAW") return currentTurnPlayerIsUser ? "Você comprou uma carta" : currentPlayer+" comprou uma carta";
   // if(status == "WIN") return currentTurnPlayerIsUser ? "Você ganhou" : currentPlayer+" ganhou";
   // if(status == "LOST") return currentTurnPlayerIsUser ? "Você perdeu" : currentPlayer+" perdeu";
    return "";
}
export default getMessage;