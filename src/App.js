import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './dashboard/Dashboard';
import Periodo from './dashboard/graficos/Periodo';
import Nav from './dashboard/source/scss/components/nav/Nav';
import Pizza from './dashboard/graficos/Pizza';
import Tempo from './dashboard/graficos/Tempo';
import Tendencia from './dashboard/graficos/Tendencia';
import Footer from './dashboard/source/scss/components/footer/Footer';
import "./dashboard/source/scss/Main.module.css"
function App() {
  return (
    <>
      <Nav/>
      {/* <Tendencia/> */}
      {/* <Tempo/> */}
      <Dashboard/>
      <Footer/>
      {/* <Periodo/>  */}
      {/* <Pizza/> */}
    </>
  );
}

export default App;
