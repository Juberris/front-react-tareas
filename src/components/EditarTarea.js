import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarTareaAction } from '../actions/tareaActions';
import { useHistory } from 'react-router-dom';

const EditarTarea = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    // nuevo state de tarea
    const [ tarea, guardarTarea] = useState({
        nombre: '',
        vigente: false
    })

    // tarea a editar
    const tareaeditar = useSelector(state => state.tareas.tareaeditar);
  
    // llenar el state automaticamente
    useEffect( () => {
        guardarTarea(tareaeditar);
    }, [tareaeditar]);

    
    // Leer los datos del formulario
    const onChangeFormulario = e => {
      
       if(e.target.name==="vigente"){
            guardarTarea({
                ...tarea,
                [e.target.name] : e.target.checked
            })
       }else{
            guardarTarea({
                ...tarea,
                [e.target.name] : e.target.value
        })
       }
        
    }


    const { nombre, vigente} = tarea;

    const submitEditarTarea = e => {
        e.preventDefault();

        dispatch( editarTareaAction(tarea) );
    
        history.push('/');
    }
    
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Tarea
                        </h2>

                        <form
                            onSubmit={submitEditarTarea}
                        >
                            <div className="form-group">
                                <label>Nombre Tarea</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Tarea"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label>Vigente</label>

                                <input
                                    type="checkbox"
                                    className="form-control"
                                    placeholder="Vigencia Tarea"
                                    name="vigente"
                                    checked={vigente}
                                    onChange={onChangeFormulario}
                                />
                            </div>
                           
                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarTarea;