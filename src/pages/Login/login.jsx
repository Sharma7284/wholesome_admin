import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const loading = toast.loading(`Processing...`, { isLoading: true });
    apiService
      .post("/auth/login", { email, password })
      .then((res) => {
        if (res.data && res.data.success) {
          setIsBtnLoading(false);
          localStorage.setItem(`token`, res.data?.data?.accessToken);
          toast.update(loading, {
            render: res.data.data.message,
            type: `success`,
            isLoading: false,
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 300);
        } else {
          setIsBtnLoading(false);
          toast.update(loading, {
            render: res.response.data.message,
            type: `error`,
            isLoading: false,
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-[#085946] flex flex-col gap-8 items-center justify-center">
      <h2 className="text-white text-2xl font-bold">Wholesome Admin</h2>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="bg-[#fff] w-[25rem] p-4 rounded-lg flex flex-col gap-4"
      >
        <div className="flex flex-col items-start">
          <label htmlFor="">Enter email</label>
          <input
            className="w-[100%] outline-none border-2 p-2 rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="">Enter password</label>
          <input
            className="w-[100%] outline-none border-2 p-2 rounded-md"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required
            placeholder="Enter password"
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="bg-[#085946] text-white w-[100%] rounded-lg p-2"
          >
            {isBtnLoading ? <spin className="spinner"></spin> : `Login`}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
