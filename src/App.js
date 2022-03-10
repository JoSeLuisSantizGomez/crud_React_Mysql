import './App.css';
import {Listar} from "./components/Listar";
import {Crear} from "./components/Crear";
import {Editar} from "./components/Editar";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="nav navbar-nav">
                <Link className="nav-item nav-link active" to={"/"}>Inicio <span className="sr-only"></span></Link>
            </div>
        </nav>
        <br></br>
        <div className="container">
          
            <Route exact path="/" component={Listar}  ></Route>
            <Route path="/create" component={Crear}  ></Route>
            <Route 
              path="/edit/:id" 
              component={Editar}
              // render = {props => <Editar {...props} key={this.props.location.key} /> }
              /*
              */
            >
            </Route>
          
        </div>

    </Router>
  );
}

export default App;
