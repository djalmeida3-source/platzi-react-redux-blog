import axios from "axios";
import { GUARDAR, CAMBIO_TITULO, CAMBIO_USUARIO_ID, CARGANDO, ERROR, TRAER_TODAS, ACTUALIZAR, LIMPIAR } from "../types/tareasTypes.js";

export const traerTodas = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
        
        const tareas = {};
        respuesta.data.map((tar) => (
            tareas[tar.userId] = {
                ...tareas[tar.userId],
                [tar.id]: {
                    ...tar
                }
            }
        ));

        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        });
    } catch (error) {
        console.error('Error: ', error.message);
        dispatch({
            type: ERROR,
            payload: 'Información de tareas no disponible'
        });
    }
}

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
    dispatch({
        type: CAMBIO_USUARIO_ID,
        payload: usuario_id
    })
}

export const cambioTitulo = (titulo) => (dispatch) => {
    dispatch({
        type: CAMBIO_TITULO,
        payload: titulo
    })
}

export const agregar = (nuevaTarea) => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.post(
            'https://jsonplaceholder.typicode.com/todos', nuevaTarea);
        dispatch({
            type: GUARDAR
        })
    } catch (error) {
        console.error('Error: ', error.message);
        dispatch({
            type: ERROR,
            payload: 'Error al agregar tarea'
        });
    }
}

export const editar = (tarea_editada) => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.put(
            `https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);
        dispatch({
            type: GUARDAR
        })
    } catch (error) {
        console.error('Error: ', error.message);
        dispatch({
            type: ERROR,
            payload: 'Error al agregar tarea'
        });
    }
}

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
    const { tareas } = getState().tareasReducer;
    const seleccionada = tareas[usu_id][tar_id];

    const actualizadas = {
        ...tareas
    };
    actualizadas[usu_id][tar_id] = {
        ...tareas[usu_id][tar_id],
        completed: !seleccionada.completed
    };
    dispatch({
        type: ACTUALIZAR,
        payload: actualizadas
    })
}

export const eliminar = (tar_id) => async(dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.delete(
            `https://jsonplaceholder.typicode.com/todos/${tar_id}`);
        dispatch({
            type: TRAER_TODAS,
            payload:{}
        });
    } catch (error) {
        console.error('Error: ', error.message);
        dispatch({
            type: ERROR,
            payload: 'Error al eliminar tarea'
        });
    }
}

export const limpiarForma = () => (dispatch) => {
    dispatch({
        type: LIMPIAR
    })
}