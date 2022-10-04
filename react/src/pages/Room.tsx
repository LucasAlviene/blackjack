import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../store/Root.store';
import { addPlayer, addHand, removePlayer, sumHand } from '../store/Players.store';
import { onEvent, offEvent, event } from '../utils/event';
import getCardImage from '../utils/getCardImage'
import RoomPlayer from '../components/RoomPlayer';
import Button from '../components/Button'
import Row from '../layouts/Row'
import Column from '../layouts/Column'

interface RoomProps {
}

const Room: React.FC<RoomProps> = () => {
  const [currentTurnPlayerId, setCurrentTurnPlayerId] = useState<number>(-1)
  const {user, players} = useSelector(state => state.players)
  const dispatch = useDispatch();
  useEffect(() => {
    const listener = (e, data: ResponseServer) => {
      switch (data.command) {
        case "STAND":
          // Próximo jogador
          // [id]
          // Ex: [1]
          if (data.body) {
            const [idPlayer] = data.body;
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
          }
          break;
        case "LOST":
          // Jogdor que perdeu
          // [id]
          // Ex: [1]
          if (data.body) {
            const [idPlayer] = data.body;
          }
          break;
      }
    };
    onEvent("eventServer", listener)

    return () => offEvent("eventServer", listener);
  }, []);

  const drawCard = () => {
    event("eventClient",['DRAW']);
  }

  const stand = () => {
    event("eventClient",['STAND']);
  }

  const currentTurnPlayerIsUser = user?.id === currentTurnPlayerId

  return (
    <div className='page page-room'>
      {/* oponentes */}
      <div className='opponents'>
        {players.filter(player => player.id !== user?.id).map(player => {
          return <RoomPlayer player={player} currentTurnPlayerId={currentTurnPlayerId}  />
        })}
      </div>
      {/* mensagem */}
      <div className='message'>
        <h1> message </h1>
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
        <img src={user?.avatar} alt={user?.name} />
        <div>
          <h4>{user?.name}</h4>
          <span> 
            {currentTurnPlayerIsUser && "TURNO"} 
          </span>
        </div>
      </div>
      {/* ações */}
      <div className='actions'>
        <Row>
          <Column className='flex-center'>
            <Button onClick={drawCard} disabled={!currentTurnPlayerIsUser}>
              Comprar
            </Button>
          </Column>
          <Column className='flex-center'>
            <Button onClick={stand} disabled={!currentTurnPlayerIsUser}>
              Manter
            </Button>
          </Column>
        </Row>
      </div>
    </div>
  );
};

export default Room;