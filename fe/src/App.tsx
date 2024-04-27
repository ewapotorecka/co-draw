import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/home/Home";
import Room from "./pages/room/Room";
import Rooms from "./pages/rooms/Rooms";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="rooms">
            <Route path="" element={<Rooms />} />
            <Route path=":roomId" element={<Room />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
