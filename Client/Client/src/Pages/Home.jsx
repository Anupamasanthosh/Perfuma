import React, { useState } from "react";
import Nav from "../Components/Home/Nav/Nav";
import SideNav from "../Components/Home/Nav/SideNav";
import Hero from "../Components/Home/Hero/Hero";
import Center from "../Components/Home/Center/Center";
function Home() {
  const [open, setOpen] = useState(false);
  const toggleSideNav = () => {
    setOpen(!open);
  };
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header>
        <Nav toggleSideNav={toggleSideNav} />
      </header>
      <main className="flex-1 overflow-y-auto">
        <Hero />
        <div className="container mx-auto p-4">
          <Center />
        </div>
      </main>
      <footer className="bg-gray-300 py-4 text-center">
        &copy; 2023 Your Website Name
      </footer>
      {open && <SideNav open={open} toggleSideNav={toggleSideNav} />}
    </div>
  );
}

export default Home;
