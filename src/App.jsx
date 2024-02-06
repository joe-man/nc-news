import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import About from "./pages/about/About";
import Article from "./pages/article/Article";
import CreateUser from "./pages/create-user/CreateUser";
import Login from "./pages/login/Login";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <div className="routeContainer">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/article/:article_id" element={<Article />}></Route>
          <Route path="/create_user" element={<CreateUser />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
