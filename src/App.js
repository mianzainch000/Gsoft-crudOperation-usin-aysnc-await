import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Create } from "./Components/Create";
import { Read } from "./Components/Read";
import { UpdateData } from "./Components/Update";
import { View } from "./Components/Veiw";
// import { Api } from "./Api";
function App() {
  return (
    <div className="App">
      {/* <Api /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="update/:id" element={<UpdateData />} />
          <Route path="view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
