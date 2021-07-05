import React from 'react';
import axios from 'axios';
import '../assets/css/obituarios.css';
import {UrlShowUsr} from    '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch,faUser} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
class Obituarios extends React.Component{ 

    
render(){
    return(
        <>           
        <div> <h1>Obituarios</h1></div> 
        <div className="grid-obituarios">          
            <article className="card obituarios_item">
                Obituario 1
            </article>
            <article className="card obituarios_item">
                Obituario 2
            </article>
            <article className="card obituarios_item">
               Obituario  3
            </article>
            <article className="card obituarios_item">
                Obituario 4
            </article>
            <article className="card obituarios_item">
                Obituario 5
            </article>
            <article className="card obituarios_item">
                Obituario 6
            </article>
            <article className="card obituarios_item">
                Obituario 7
            </article>
            <article className="card obituarios_item">
                Obituario 8
            </article>
            <article className="card obituarios_item">
                Obituario 9
            </article>
            <article className="card obituarios_item">
                Obituario 10
            </article>
            <article className="card obituarios_item">
                Obituario 11
            </article>

        </div>
    </>
    );
}
}


export default Obituarios;