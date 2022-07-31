import "./App.css";
import Input from "./components/Input";
import Lists from "./components/List";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Input />} />
          <Route path="/*" element={<div>Error Occured!</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
