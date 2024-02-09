import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import About from "./pages/about/About";
import Article from "./pages/article/Article";
import ChangeUser from "./pages/change-user/ChangeUser";
import Footer from "./components/footer/Footer";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <Navbar />
      <div className="routeContainer">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/articles" element={<Homepage />}></Route>
          <Route path="/articles/:topic" element={<Homepage />}></Route>
          <Route path="/articles/article/:article_id" element={<Article />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/change_user" element={<ChangeUser />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
