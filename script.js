/** Variáveis */
let currentPlayer = document.querySelector('.currentPlayer');

let selected;
let player = "X";

/** Posições em que pode haver vitória */ 
let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
    /** Posição selecionada está vazia, início do jogo */
    selected = [];

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    document.querySelectorAll(".game button").forEach((item) => {
        /** Cada botão, quando for inicializado, vai começar vazio */
        item.innerHTML = "";

        /** Adicionando um evento de clique pra cada botão */
        item.addEventListener("click", newMove);
    })
}

init();

/** Vai receber o evento referente ao botão */
function newMove(e) {

    /** Se eu clicar em qualquer botão, será retornado o valor do atributo data-i, indo de 1 a 9. */
    const index = e.target.getAttribute("data-i");

    /** Estou passando pro innerHTML do botão a informação do player, sejá X ou O. */
    e.target.innerHTML = player;

    /** Removendo o evento clique desse botão pra que eu não clique duas vezes no botão, trocando de X pra O.  */
    e.target.removeEventListener("click", newMove);

    /** Armazenando os itens que já foram selecionados no index. */
    selected[index] = player;

    setTimeout(() => {
        check();
    }, [100]);

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    /** Vai percorrer cada posição que é possível ter um ganhador e vai verificar através do every se os itens selecionados do ultimo player tem o item dessa posição, verifica se tem o ganhador. */
    for (pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
            init();
            return;
        }
    }

    /** Verificando se deu empate */
    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE");
        init();
        return;
    }
}
