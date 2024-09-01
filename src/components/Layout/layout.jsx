import React from "react";
import Sidebar from "../Sidebar/sidebar";
import Main from "../Main/main";
import Modal from "../Modals/modal";

const Layout = () => {
  return (
    <div className="min-h-screen flex gap-4 h-[100%] w-[100%]">
      <div className="w-[15rem]">
        <Sidebar></Sidebar>
      </div>
      <div className="flex-1 shadow-2xl">
        <Main></Main>
      </div>
    </div>
  );
};

export default Layout;
