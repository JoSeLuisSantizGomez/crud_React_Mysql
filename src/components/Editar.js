import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/api";


class Editar extends React.Component {
    constructor(props) {
        super(props);
    }
    state = { 
        datosCargados:false, 
        empleado:[]
     }
     cambioValor  = (e)=>{
        const state = this.state.empleado;
        state[e.target.name]= e.target.value;
        this.setState({empleado:state});
    }
    enviarDatos = (e)=>{
        e.preventDefault();

        const {id, nombre, correo}= this.state.empleado;

        var datosEnviar = {id:id,nombre:nombre, correo:correo}

        fetch(Api+"?actualizar=1",{
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            console.log(datosRespuesta);
            this.props.history.push("/");
        })
        .catch(console.log)
    }
    componentDidMount(){
        fetch(Api+"?consultar="+this.props.match.params.id)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
            console.log(datosRespuesta)
            this.setState({
                datosCargados:true, 
                empleado:datosRespuesta[0]})
        })
        .catch(console.log)
    }

    render() { 
        const {datosCargados, empleado} = this.state
        if(!datosCargados){
            return (<div>Cargando Datos...</div>);
        }
        else{
            return (
            <div className="card">
                <div className="card-header">
                    Editar empleados
                </div>
                <div className="card-body">

                    <form onSubmit={this.enviarDatos}>
                        <div className="form-group">
                          <label htmlFor="">Clave</label>
                          <input type="text" className="form-control" readOnly value={empleado.id} name="id" id="id" 
                            onChange={this.cambioValor} aria-describedby="helpId" placeholder=""
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Nombre</label>
                            <input type="text" name="nombre" id="nombre" onChange={this.cambioValor} 
                                value={empleado.nombre} className="form-control" placeholder="" 
                                aria-describedby="helpId" required
                            />
                            <small id="helpId" className="text-muted">Escribe el nombre del empleado</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Correo</label>
                            <input type="text" name="correo" id="correo" onChange={this.cambioValor} 
                                value={empleado.correo} className="form-control" placeholder="" 
                                aria-describedby="helpId" required
                            />
                            <small id="helpId" className="text-muted">Escribe el correo</small>
                        </div>
                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Actualizar empleado </button>
                            <Link to={"/"} type="button" className="btn btn-primary">Cancelar </Link>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">
                    
                </div>
            </div> );
        }
    }
}
 
export {Editar };