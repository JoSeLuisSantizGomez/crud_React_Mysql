import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/api";

class Listar extends React.Component {
    constructor(props) {
        super(props);
    }
    state = { 
        datosCargados:false,
        empleados:[]
    }

    borrarRegistro =(id)=>{
        
        fetch(Api+"?borrar="+id)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.cargarDatos();
        })
        .catch(console.log)
        
    }

    cargarDatos (){
        fetch(Api)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            console.log(datosRespuesta)
            this.setState({datosCargados:true, empleados:datosRespuesta})
        })
        .catch(console.log)
    }
    
    componentDidMount(){
        this.cargarDatos();

    }

    render() { 
        const {datosCargados, empleados} = this.state
        if(!datosCargados){
            return (<div>Cargando Datos...</div>);
        }
        else{

            return (
                <div className="card">
                    <div className="card-header">
                        <Link type="button" className="btn btn-success" to={"/create"}>Agregar nuevo empleado</Link>
                    </div>
                    <div className="card-body">
                        <h4>Lista de empleados</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleados.map (
                                    (empleado)=>(
                                        <tr key={empleado.id}>
                                            <td scope="row">{empleado.id}</td>
                                            <td>{empleado.nombre}</td>
                                            <td>{empleado.correo}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="">
                                                    <Link type="button" className="btn btn-warning" 
                                                        to={"/edit/"+empleado.id}>Editar
                                                    </Link>
                                                    <button type="button" className="btn btn-danger"
                                                        onClick={()=>this.borrarRegistro(empleado.id)}>
                                                        Borrar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}                        
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">   
                    </div>
                </div>

            );
        }
    }
}
 
export {Listar};