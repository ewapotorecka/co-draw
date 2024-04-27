import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Room from "./pages/room/Room";
import Rooms from "./pages/rooms/Rooms";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="rooms">
              <Route path="" element={<Rooms />} />
              <Route path=":roomId" element={<Room />} />
            </Route>
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
