import React from 'react';
import './Celula.css'
import { useState, useEffect } from 'react';

const Celula = (props) => {

    const [valor, setvalor] = useState(props.value);

    useEffect(() => {
        props.TrocaLetra(props.Linha, props.Coluna, valor)
    }, [valor]);

    const handleKeyPressed = (e) => {
        if (valor === '' && (e.key === 'Backspace' || e.key === 'Delete')) {
            //console.log("MANDEI VOLTAR ")
            props.TrocaColuna(props.Linha, props.Coluna, e.key)
        }
        else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft')
            props.TrocaColuna(props.Linha, props.Coluna, e.key)
        else if (e.key === 'Enter')
            props.TrocaColuna(props.Linha, props.Coluna, e.key)
    }


    const handleInputChange = (e) => {
        if (e.target.value.length > 1)
            setvalor(e.target.value[e.target.value.length - 1].toUpperCase())
        else
            setvalor(e.target.value.toUpperCase())
    }


    const ClasseDisabled = props.desabilitado ? 'Desabilitado' : 'Habilitado'

    const classes = "Celula " + props.status + " " + ClasseDisabled

    return (
        <div>
            <input onKeyDown={e => handleKeyPressed(e)} id={props.id} value={valor} className={classes} disabled={props.desabilitado} type="text" onInput={(e) => handleInputChange(e)} />
        </div>
    );
}

export default Celula;
