import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#085946] flex flex-col gap-8 items-center justify-center">
      <h2 className="text-white text-2xl font-bold">Wholesome Admin</h2>
      <form className="bg-[#fff] w-[25rem] p-4 rounded-lg flex flex-col gap-4">
        <div className="flex flex-col items-start">
          <label htmlFor="">Enter email</label>
          <input
            className="w-[100%] outline-none border-2 p-2 rounded-md"
            type="text"
            name=""
            id=""
            placeholder=""
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="">Enter password</label>
          <input
            className="w-[100%] outline-none border-2 p-2 rounded-md"
            type="password"
            name=""
            id=""
            placeholder=""
          />
        </div>
        <div className="">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#085946] text-white w-[100%] rounded-lg p-2"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
