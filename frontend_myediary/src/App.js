import MetaConnect from "./components/MetaConnect";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import CardPage from "./components/CardPage";
import CreatePage from "./components/CreatePage";
import Protected from "./components/Protected";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MetaConnect />} />
        <Route path="/home" element={<Protected Component={Home}/> } />
        <Route path="/userdiary/:id" element={<Protected Component={CardPage}/> }/>
        <Route path="/create" element={<Protected Component={CreatePage}/>}/>
        <Route path='*' element={<NoPage/>} />
      </Routes>
    </>
  );
}

export default App;
