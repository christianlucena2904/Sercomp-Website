import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


interface LayoutProps {
  children: React.ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;