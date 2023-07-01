import React from "react";
import { Navbar, Hero, Banner, Form, Cards, Footer } from "./components/";

function App() {
  return (
    <>
      <div className="z-20 bg-center bg-no-repeat bg-cover bg-header-bg">
        <Navbar />
        <Hero />
      </div>
      <div className="w-full">
        <Banner />
        <Form />
        <Cards />
        <Footer />
      </div>
    </>
  );
}

export default App;
