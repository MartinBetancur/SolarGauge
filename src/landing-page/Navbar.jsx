import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-15 w-40 mr-2" src={logo} alt="Logo" />
          </div>
          <div className="hidden lg:flex justify-center flex-grow text-center text-white text-lg">
            <p>¡Your trusted partner in energy management!</p>
          </div>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a href="/login" className="bg-gradient-to-r from-[#00ffba] to-[#00ffba60] py-2 px-3 rounded-md">
              Sign In
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <div className="flex space-x-6">
              <a href="#" className="bg-gradient-to-r from-[#00ffba] to-[#00ffba60] py-2 px-3 rounded-md">
                Sign In
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;