import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/Login";
import Navbar from "./components/navbar";
import CreatePost from "./pages/CreatePost/CreatePost";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/createPost" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
