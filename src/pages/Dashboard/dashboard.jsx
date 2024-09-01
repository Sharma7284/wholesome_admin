import React, { useState } from "react";
import Modal from "../../components/Modals/modal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={openModal}>
        Show
      </button>
      <Modal show={isModalOpen} onClose={closeModal}>
        <h2 className="text-start">Modal Content</h2>
        <p className="text-start">Lorem ipsum dolor sit amet.</p>
      </Modal>
    </div>
    // <div className="min-h-screen flex gap-4 h-[100%] w-[100%]">
    //   <div className="w-[15rem]">
    //     <Sidebar></Sidebar>
    //   </div>
    //   <div className="flex-1 flex items-center justify-center shadow-2xl">
    //     <Main></Main>
    //   </div>
    // </div>
  );
};

export default Dashboard;
