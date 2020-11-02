import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
import { crearNuevaTareaAction } from '../actions/tareaActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const NuevoTareas = ({history}) => {

    // state del componente
    const [nombre, guardarNombre] = useState('');
   

    // utilizar use dispatch y te crea una función
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector( state => state.tareas.loading );
    const error = useSelector(state => state.tareas.error);
    const alerta = useSelector(state => state.alerta.alerta);


    // mandar llamar el action de tareaAction
    const agregarTarea = tarea => dispatch( crearNuevaTareaAction(tarea) );

    // cuando el usuario haga submit
    const submitNuevoTarea = e => {
        e.preventDefault();

        // validar formulario
        if(nombre.trim() === '' ) {

            const alerta = {
                msg: 'Nombre es obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlerta(alerta) );

            return;
        }

        // si no hay errores
        dispatch( ocultarAlertaAction() );

        // crear la nuevo tarea
        agregarTarea({
            nombre
        });

        // redireccionar
        history.push('/');
    }


    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Tarea
                        </h2>

                        {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null }

                        <form
                            onSubmit={submitNuevoTarea}
                        >
                            <div className="form-group">
                                <label>Nombre Tarea</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Tarea"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>


                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null }
                        
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoTareas;