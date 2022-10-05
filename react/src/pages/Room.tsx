import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../store/Root.store';
import { addPlayer, addHand, removePlayer, sumHand, setStatus } from '../store/Players.store';
import { onEvent, offEvent, event } from '../utils/event';
import getCardImage from '../utils/getCardImage'
import RoomPlayer from '../components/RoomPlayer';
import Button from '../components/Button'
import Row from '../layouts/Row'
import Column from '../layouts/Column'
import MainPageLayout from '../layouts/MainPageLayout'
import getMessage from '../components/getMessage';
import getAvatar from '../utils/getAvatar';

interface RoomProps {
}

const Room: React.FC<RoomProps> = () => {
  const [currentTurnPlayerId, setCurrentTurnPlayerId] = useState<number>(-1)
  const [end, setEnd] = useState<boolean>(false);
  const { user, players } = useSelector(state => state.players)
  const [command, setCommand] = useState("");
  const [winners, setWinners] = useState<number[]>([]);
  const [losers, setLosers] = useState<number[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const listener = (e, data: ResponseServer) => {
      setCommand(data.command);
      switch (data.command) {
        case "END":
          setCurrentTurnPlayerId(-1);
          setEnd(true);
          break;
        case "STAND":
          // Próximo jogador
          // [id]
          // Ex: [1]
          if (data.body) {
            const [idPlayer] = data.body
            setCurrentTurnPlayerId(Number(idPlayer));
          }
          break;
        case "HAND":
          // Mão dos jogadores
          // [id do jogador,cartas]
          // Ex:  [1, "xx_xx_xx|xx_xx_xx"]
          if (data.body) {
            const [idPlayer, cardInfo, sumCards] = data.body;
            const listCards = cardInfo.split("|");
            for (const card of listCards) {
              const [id, color, suit, number] = card.split("_");
              dispatch(addHand({ id: Number(id), color: color as CardColor, suit: suit as CardSuit, number: number as CardNumber, idPlayer: Number(idPlayer) }));
            }
            dispatch(sumHand({ sumCards: Number(sumCards), idPlayer: Number(idPlayer) }));
          }
          break;
        case "DRAW":
          // Jogdor que irá comprar uma carta
          // [id,hand,sumHand]
          // Ex: [1,"xx_xx_xx|xx_xx_xx",20]
          if (data.body) {
            const [idPlayer, cardInfo, sumCards] = data.body;
            const listCards = cardInfo.split("|");
            for (const card of listCards) {
              const [id, color, suit, number] = card.split("_");
              dispatch(addHand({ id: Number(id), color: color as CardColor, suit: suit as CardSuit, number: number as CardNumber, idPlayer: Number(idPlayer) }));
              dispatch(sumHand({ sumCards: Number(sumCards), idPlayer: Number(idPlayer) }));
            }
          }
          break;
        case "EXIT":
          if (data.body) {
            const [idPlayer] = data.body;
            dispatch(removePlayer(Number(idPlayer)));
          }
          break;
        case "WIN":
          // Jogdor que ganhou
          // [id]
          // Ex: [1]
          if (data.body) {
            const [idPlayer] = data.body;
            dispatch(setStatus({ idPlayer: Number(idPlayer), status: 'WIN' }))
            //  setWinners((old) => [...old, Number(idPlayer)]);
          }
          break;
        case "LOST":
          // Jogdor que perdeu
          // [id]
          // Ex: [1]
          if (data.body) {
            const [idPlayer] = data.body;
            dispatch(setStatus({ idPlayer: Number(idPlayer), status: 'LOST' }))
            // setLosers((old) => [...old, Number(idPlayer)]);
          }
          break;
      }
    };
    onEvent("eventServer", listener)

    return () => offEvent("eventServer", listener);
  }, []);

  const drawCard = () => {
    event("eventClient", ['DRAW']);
  }

  const stand = () => {
    event("eventClient", ['STAND']);
  }



  const currentTurnPlayerIsUser = user?.id === currentTurnPlayerId;

  return (
    <MainPageLayout allowExit className='page page-room'>

      {/* oponentes */}
      <div className='opponents'>
        {players.filter(player => player.id !== user?.id).map(player => {
          return <RoomPlayer player={player} currentTurnPlayerId={currentTurnPlayerId} />
        })}
      </div>
      {/* mensagem */}
      <div className='message'>
        <h1>{getMessage(command, currentTurnPlayerId, end)}</h1>
      </div>
      {/* cartas do usuario */}
      <div className='cards'>
        {user?.cards.map((card, i) => {
          return (
            <div>
              <img src={getCardImage(card.suit, card.number)} alt={`${card.suit} ${card.number}`} />
            </div>
          )
        })}
      </div>
      {/* informações */}
      <div className='info'>
        <img src={getAvatar(user?.avatar)} alt={user?.name} />
        <div>
          <h2>{user?.name}</h2>
          <span> {user?.value} / 21 </span>
          {currentTurnPlayerIsUser && <span>TURNO</span>}
        </div>
      </div>
      {/* ações */}
      <div className='actions'>
        {!end &&
          <Row>
            <Column lg={6} xl={6} xxl={6} className='flex-center'>
              <Button onClick={drawCard} disabled={!currentTurnPlayerIsUser}>
                Comprar
              </Button>
            </Column>
            <Column lg={6} xl={6} xxl={6} className='flex-center'>
              <Button onClick={stand} disabled={!currentTurnPlayerIsUser}>
                Manter
              </Button>
            </Column>
          </Row>}
      </div>
    </MainPageLayout>
  );
};

export default Room;