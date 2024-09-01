import React, { useEffect, useState } from "react";
import SidebarData from "../../data/SidebarData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminLogo from "../../assets/logo/admin_logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    console.log();

    let currentIndex = SidebarData.findIndex(
      (f) =>
        f?.title?.toLowerCase() ===
        location.pathname.split("/")[2]?.toLowerCase()
    );
    setActiveIndex(currentIndex);
    setNavbar(SidebarData);
  }, [location]);

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-[100%] min-h-screen flex flex-col gap-2 rounded-lg">
      <div className="flex items-center justify-center py-4 pb-2 gap-2">
        <img src={AdminLogo} width={40} height={40} alt="" />
        <h2 className="text-xl font-bold">Wholesome</h2>
      </div>
      <nav className="bg-[#085946] flex-1 flex rounded-lg p-2 flex-col">
        {navbar.map((item, index) => (
          <Link
            key={index}
            className={`${
              index === activeIndex
                ? `bg-[#fff] rounded-lg font-bold`
                : `text-white`
            } p-2 text-start`}
            to={item.url}
            onClick={() => setActiveIndex(index)}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="flex bg-[#085946] rounded-lg items-center justify-center p-2">
        <button
          onClick={onLogout}
          className="bg-white w-[100%] p-2 rounded-lg font-bold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
