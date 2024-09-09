import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/login";
import Layout from "./components/Layout/layout";
import NotFound from "./pages/NotFound/404";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={"/login"}></Navigate>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/dashboard/*" element={<Layout></Layout>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
        {/* <Route path="*" element={<Login></Login>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
