import logo from "./logo.svg";
import "./App.css";
import { Separator } from "./Separator";
import { Signalisation } from "./Signalisation";
import { Legend } from "./Legend";
import { Car } from "./Car";

function App() {
  return (
    <div className="App">
      <Separator />
      <Signalisation />
      <Car />
      <Legend />
    </div>
  );
}

export default App;
