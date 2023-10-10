//---------------------------------------------------------------//
//                   REGISTRO DE DESENVOLVIMENTO                 //
//                        Dev. Mateus Amaro                      //
//---------------------------------------------------------------//

//VARIAVEIS GLOBAIS
var qtdNumeros = 60; // QUANDITADE DE BOLAS PARA BINGO (MAXIMO 70)
var qtdNumerosCartela = 15; // MAX 25
var qtdCartelas = 1;
var nomeUsuario = [
   "Mateus","Ozana","Charles","David"
];


var elemento_pai;
var elemento_span;
var elemento_li;
var elemento_span_cartela;
var elemento_pai_cartela;
var numeros;
var bolaAtual;
var bolasJogadas;
var bolaRandom;
var imgBola;
var elemento_bolas;
var frame;
var animaImagem;
var graus = 0;
var arrayNumerosCartela = [];
var arrayBolasJogadas = [];
var boalAtualRandom;
var timerGame;
var indiceBola = 1;
var teste;
var indiceEndGame = 0;
var nomes = nomeUsuario.length
//--------

function random(valor){
   return Math.floor(Math.random()*valor);
}

function principal(){ //FAZ A CHAMADA DAS FUNÇOES
   
    const titulo = document.getElementsByTagName("title")[0];
    titulo.innerHTML = "Bingo - by Amaro";
    //-------------------

    //criaTagImg = document.createElement('img');
    criaTabela();
    criarCartela();
    randomBola();
    atualiza();
    timerGame = setInterval(randomBola, 5000);
    
}

//function randomNumeroBola(){
  //return Math.round(Math.random()*qtdNumeros);
//}

//function randomNumeroAtual(){
//  return Math.round(Math.random()*qtdNumeros);
//}



function criaTabela(){ // CRIA AS BOLAS PREENCHENDO COM OS NUMEROS
      /*   TABELA
                      C
      |_01_02_03_04_05_06_07_08_09_10_|
   L  |_11_12_13_14_15_16_17_18_19_20_|
      |_21_22_23_24_25_26_27_28_29_30_|
      |_31_32_33_34_35_36_37_38_39_40_|
   
   */ 
   elemento_pai = document.getElementById('tabelaNumeros');
   bolasJogadas = document.getElementById('bolas-jogadas');

   tabelaNumeros = document.getElementsByTagName('span');

        for(var i=0; i<qtdNumeros; i++){
                elemento_span = document.createElement('span');
                elemento_pai.appendChild(elemento_span);
                tabelaNumeros[i].innerHTML = i+1;                 
        } 
}


function criarCartela(){
    elemento_pai_cartela = document.getElementById('minhaCartela');
    tabelaCartelas = document.getElementsByTagName('li');

    for(let i=0; i<qtdNumeros; i++){
      var boalAtualRandom = random(qtdNumeros);

     if(arrayNumerosCartela.indexOf(boalAtualRandom) === -1){
       arrayNumerosCartela.push(boalAtualRandom);
     }
    }

    for(let i=0; i<qtdNumerosCartela; i++){
      elemento_li = document.createElement('li');
      elemento_pai_cartela.appendChild(elemento_li);
      
        tabelaCartelas[i].innerHTML = arrayNumerosCartela[i];
    
  } 
}


function randomBola(){
        for(let i=0; i<qtdNumerosCartela; i++){
          if(tabelaCartelas[i].innerHTML == 0){
            tabelaCartelas[i].innerHTML = 1;
          }
        }
        while(arrayBolasJogadas.length < qtdNumeros){
          bolaRandom = random(qtdNumeros);
            if(arrayBolasJogadas.indexOf(bolaRandom+1) === -1){
                    arrayBolasJogadas.push(bolaRandom+1);
            }
        }
          indiceBola++;
          if(arrayBolasJogadas[indiceBola] > 0){
          //bolaAtual.appendChild(criaTagImg);  
            imgBola = document.getElementsByTagName('img')[0];
            imgBola.src = "bolas/bola-"+arrayBolasJogadas[indiceBola]+".png";
            atualiza();
          }
}

function atualiza(){
  for(let i=0; i<qtdNumeros; i++){
    if(tabelaNumeros[i].innerHTML == arrayBolasJogadas[indiceBola]){
      tabelaNumeros[i].style.background = "red";
    }
  }
  
  for(let i=0; i<qtdNumerosCartela; i++){
    if(tabelaCartelas[i].innerHTML == arrayBolasJogadas[indiceBola]){
      tabelaCartelas[i].style.background = "red";
      tabelaCartelas[i].style.color = "white";
      indiceEndGame++;
    }
   }
  endGame();
}

function endGame(){
    if(indiceEndGame == qtdNumerosCartela){
       clearInterval(timerGame);
       //var v_modal = document.getElementById('janelaModal').style.background = "rgba(0, 0, 0, 0.8)";
       var v_ganhador = document.getElementById('imgGanhador');
       var nomeGanhador = document.getElementById('nomeGanhador');
       v_ganhador.style.transition = "1s ease";
       v_ganhador.style.transform = "scale(1)";
       v_ganhador.style.display = "block";
       v_ganhador.style.background = "url('./imagens/ganhador.png')";
       nomeGanhador.innerHTML = nomeUsuario[random(nomes)];
    }
    
}
window.addEventListener("load",principal);