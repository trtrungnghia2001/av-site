import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <section className="container">
        <Outlet />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LayoutMain;
