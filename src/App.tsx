import "./App.css";
import config from "./form-data.json";
import FormBuilder from "./components/FormBuilder";

function App() {
  return (
    <div className="App">
      <FormBuilder configJson={config} />
    </div>
  );
}

export default App;
