import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import About from "./pages/About";
import Article from "./pages/Article";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <div className="routeContainer">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/article" element={<Article />}></Route>
          <Route path="/create_user" element={<CreateUser />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
