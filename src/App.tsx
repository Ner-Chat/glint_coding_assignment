import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Challenge from "./pages/Challenge";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenge" element={<Challenge />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
