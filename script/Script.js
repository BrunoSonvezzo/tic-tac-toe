let space;                                                          /*Variável atribuidas para os cliques nos 9 espaços*/
let player = "X";                                                   /*inicia como X*/

let posições = [[1, 2, 3],[4, 5, 6],[7, 8, 9],[1, 4, 7],[2, 5, 8],[3, 6, 9],[1, 5, 9],[3, 5, 7]]; 
                                                                    
                                                                    /*Possibilidades de vitória*/

/*---------------------------------------------------------------------------------------------------------------------------------------------*/

function início() {
  space = [];                                                      /*Lista com os valores*/
  document.querySelectorAll(".board button").forEach((item) => {   /*Função que volta ao estado inícial, após um resultado */
    item.innerHTML = "";                                           /*Começa com o html vazio*/
    item.addEventListener("click", click_move);                    /*atribui a função que é responsável pelo clique do jogador*/
  });
}

início();                                                          /*Iniciada toda vez que abre o arquivo no navegador*/

/*---------------------------------------------------------------------------------------------------------------------------------------------*/

function click_move(e) {
  const valor_botão = e.target.getAttribute("click_on"); 
  e.target.innerHTML = player;                                     /* Atribui ao X */
  e.target.removeEventListener("click", click_move);               /*Impede que o jogador clique 2x no mesmo espaço*/
  space[valor_botão] = player;                                     /*Armazena os valores dos cliques do player, que será comparada com as posições, linha 4.*/
  setTimeout(() => {
    verificar();
  }, [100]);
  player = player === "X" ? "O" : "X";                             /*se x, senão o.*/

}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/

function verificar() {
  let jogador_2 = player === "X" ? "O" : "X";
  const items = space
    .map((item, i) => [item, i])                                /*Mapea os itens selecionados*/
    .filter((item) => item[0] === jogador_2)                       /*Filtra o novo array, para verificar qual foi as marcações do jogador 2*/
    .map((item) => item[1]);
  for (posi of posições) {
    if (posi.every((item) => items.includes(item))) {              /*Verifica se há um ganhador, passando o for nas posições possíveis de vitória.*/
      alert("O JOGADOR '" + jogador_2 + "' GANHOU!");
      início();                                                    /* chama a função início */
      return;
    }
  }
  if (space.filter((item) => item).length === 9) {                 /*Verifica se os 9 espaços foram marcados, mas sem ganhadores, para dar um alert de empate.*/
    alert("DEU EMPATE!");
    início();
    return;
  }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------*/
