## Redes Blackjack

Definição:

START - inicia o jogo
SHUFFLE - embaralha as cartas
DRAW - distribui ou dá as cartas
STAND - sai da mesa para a espera do termino do jogo

## Request
**HANDKSHAKE {name}** - O cliente se conecta e se apresenta ao servidor
**START** - O cliente avisa que deseja começar o jogo
**STAND** - O cliente avisa que deseja sair da mesa e esperar o termino do jogo
**DRAW** - o cliente avisa que deseja comprar uma carta do deck

## Response
**HANDSHAKE ok** - Servidor avisa ao cliente que está tudo ok
**START {card[]}** - Servidor envia as 2 cartas iniciais aos jogadores  
**HAND {player} {card[]}** - Servidor envia as 2 cartas iniciais aos jogadores  
**DRAW {card[]}** - Servidor envia as cartas ao cliente e o cálculo do valor da mão
**EXIT {player}**