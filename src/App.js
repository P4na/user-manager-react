import "./App.css";
import { NavbarCrud } from "./component/NavbarCrud";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <NavbarCrud />
      <Dashboard />
    </div>
  );
}

export default App;
