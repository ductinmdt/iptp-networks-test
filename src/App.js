import * as React from "react";
import {Routes, Route, Outlet } from 'react-router-dom'
import Home from "./pages/Home"
import Details from "./pages/Details"
import './App.css';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
          </Route>
          <Route path="/details" element={<Details />}>
              <Route path=":id" element={<Details />}/>
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
