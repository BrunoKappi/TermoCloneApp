
import './App.css';
import Celula from './components/Celula';
import { useState, useEffect } from 'react';
import { Palavras } from './Palavas'


function App() {

  const [Jogo, setJogo] = useState([
    [{ status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }],
    [{ status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }],
    [{ status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }],
    [{ status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }],
    [{ status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }],
    [{ status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }, { status: 'Pendente', valor: '' }],
  ]);

  const [Jogada, setJogada] = useState(0);
  const [Erro, setErro] = useState('');
  const [PALAVRA, setPALAVRA] = useState(Palavras[Math.floor(Math.random() * (Palavras.length - 1))].toUpperCase())

  useEffect(() => { 
    let LinhaPost = Jogada
    let Proximo = "Linha" + LinhaPost + "Coluna0"
    //console.log("FOCANDO", Proximo)
    document.getElementById(Proximo).focus()
  }, [Jogada]);

  const Jogar = () => {

    var Contador = 0
    var ContadorAcertos = 0
    var PalavraFormada = [...Jogo[Jogada]]

    const Tentativa = PalavraFormada.map(Letra => {
      return Letra.valor
    })

    Tentativa.map((Letra, i) => {
      if (Letra != '')
        Contador++
    })




    if (Contador >= 5) {
      Tentativa.map((Letra, i) => {
        var JogoCopia = [...Jogo]

        if (Letra === PALAVRA[i]) {
          var JogoCopia = [...Jogo]
          JogoCopia[Jogada][i].status = 'Certo'
          ContadorAcertos++
        }
        else if (PALAVRA.includes(Letra)) {
          JogoCopia[Jogada][i].status = 'PosicaoErrada'
        }
        else {
          JogoCopia[Jogada][i].status = 'Errado'
        }

        setJogo(JogoCopia)

        if (ContadorAcertos >= 5) {
          setErro("Você Ganhou!!")
        } else if (Erro === '' && ContadorAcertos === 0) {

          setJogada(Jogada + 1)
        }

      })
    }




  }

  const TrocaLetra = (Linha, Coluna, Valor) => {
    let JogoCopia = [...Jogo]
    JogoCopia[Linha][Coluna] = { status: 'Pendente', valor: Valor }
    if (Valor === '') {
      JogoCopia[Linha][Coluna] = { status: 'Pendente', valor: Valor }
    } else {
      if (Coluna < 4) {
        let ColunaIndexPost = (Coluna + 1) <= 4 ? (Coluna + 1) : 4
        let Proximo = "Linha" + Linha + "Coluna" + ColunaIndexPost
        //console.log("FOCANDO", Proximo)
        document.getElementById(Proximo).focus()
      }
    }
    setJogo(JogoCopia)
  }

  const TrocaColuna = (Linha, Coluna, Tecla) => {
    if (Tecla === 'Backspace' || Tecla === 'ArrowLeft') {
      let ColunaIndexAnterior = (Coluna - 1) >= 1 ? (Coluna - 1) : 0
      let Anterior = "Linha" + Linha + "Coluna" + ColunaIndexAnterior
      //console.log("FOCANDO", Anterior)
      document.getElementById(Anterior).focus()
    }
    else if (Tecla === 'Delete' || Tecla === 'ArrowRight') {
      let ColunaIndexPost = (Coluna + 1) <= 4 ? (Coluna + 1) : 4
      let Proximo = "Linha" + Linha + "Coluna" + ColunaIndexPost
      //console.log("FOCANDO", Proximo)
      document.getElementById(Proximo).focus()
    }
    else if (Tecla === 'Enter') {
      Jogar()
    }



  }



  return (
    <div className="App">
      <div>
        <h1 className="titulo">TERMO</h1>
      </div>
      {Erro && <div><div className="Erro"> {Erro} </div></div>}
      <div className='Grade'>
        {Jogo.map((Linha, indexLinha) => {
          return Linha.map((Posicao, indexColuna) => {
            return <Celula TrocaColuna={TrocaColuna} TrocaLetra={TrocaLetra} Linha={indexLinha} Coluna={indexColuna} id={"Linha" + indexLinha + "Coluna" + indexColuna} key={indexLinha + indexColuna} status={Posicao.status} desabilitado={(indexLinha != Jogada || Erro != '')} value={Posicao.valor} ></Celula>
          })
        })}
      </div>
      <div>
        <button className='Jogar' onClick={Jogar}  >Jogar</button>
      </div>
    </div>
  );
}

export default App;
