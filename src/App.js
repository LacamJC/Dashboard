import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './dashboard/Dashboard';
import Periodo from './dashboard/graficos/Periodo';
import Nav from './dashboard/source/scss/components/nav/Nav';
function App() {
  return (
    <>
      <Nav/>
      <Dashboard/>
      {/* <Periodo/>  */}
    </>
  );
}

export default App;
