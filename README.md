## Redes Blackjack

Definição:
## Request
**HANDKSHAKE {name} {avatar}** - O cliente se conecta e se apresenta ao servidor
**START** - O cliente avisa que deseja começar o jogo
**STAND** - O cliente avisa que deseja sair da mesa e esperar o termino do jogo
**DRAW** - o cliente avisa que deseja comprar uma carta do deck

## Response
**HANDSHAKE ok** - Servidor avisa ao cliente que o request foi atentido, ok
**START {card[]}** - Servidor envia as 2 cartas iniciais aos jogadores  
**HAND {idPlayer} {card[]}** - Servidor envia a mão do jogador para os outros jogadores  
**DRAW {card[]} {value}** - Servidor envia carta ao cliente e realiza o cálculo do valor total da mão
**STAND {idPlayer}** - Servidor avisa qual o próximo jogador
**JOIN {player}** - Servidor manda os dados do jogador
**EXIT {idPlayer}** - Servidor avisa que um jogador saiu
**WIN {idPlayer}** - Servidor avisa quem ganhou
**LOST {idPlayer}** - Servidor avisa quem perdeu