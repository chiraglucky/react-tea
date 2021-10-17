// /** @jsxImportSource @emotion/react */
import React from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";
import Header from "./components/Header.js";
import Products from "./components/Products.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from "./components/Search.js";
import Auth from "./components/Auth.js";
import Cookies from "universal-cookie";

let cookies = new Cookies();

const authToken = cookies.get("token");

const App = () => {
  
  if(!authToken) return <Auth/>

  return (
    <Router basename="/react-tea">
      <div className="App">
        <Route path="/search">
          <Search />
        </Route>
        <Route exact path="/">
          <NavBar />
          <Header />
          <Products />
          <About />
          <Contact />
        </Route>
      </div>
    </Router>
  );
};

export default App;

