import React from 'react';
import { connect } from 'react-redux';
import Fatal from '../General/Fatal';
import Spinner from '../General/Spinner';

const Comentarios = (props) => {
    if (props.com_error) {
        return <Fatal mensaje={ props.com_error } />
    }

    if (props.com_cargando && props.comentarios.length) {
        return <Spinner />
    }

    const ponerComentarios = () => (
        props.comentarios.map((comentario) => (
            <li>
                <b>
                    <u>
                        { comentario.email }
                    </u>
                </b>
                <br/>
                { comentario.body }
            </li>
        ))
    );
    return (
        <ul>
            { ponerComentarios() }
        </ul>
    );
};

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);