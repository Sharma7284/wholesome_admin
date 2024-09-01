import React, { useState } from "react";
import apiService from "../../../utils/axiosInstance";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onPostSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    apiService
      .post("/auth/createUser", { name, email, password })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Add User</h2>
      <div className="w-full p-8">
        <form onSubmit={(e) => onPostSubmit(e)}>
          <div className="flex flex-col">
            <label htmlFor="name" className="label">
              Name
            </label>
            <div className="border-2 rounded-lg">
              <input
                type="text"
                id="name"
                required
                onChange={(e) => setName(e.target.value)}
                className="input w-full border-2"
                placeholder="Enter name"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="border-2 rounded-lg">
              <input
                type="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full border"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="border-2 rounded-lg">
              <input
                type="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full border"
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 my-4">
            <label className="font-bold" htmlFor="status">
              {isActive ? "Active" : "Inactive"}
            </label>
            <input
              type="checkbox"
              id="status"
              className="toggle text-lg"
              checked={isActive}
              onChange={(e) => setIsActive(!isActive)}
            />
          </div>
          <div className="flex py-4">
            <button type="submit" className="btn btn-success text-white">
              {isLoading ? (
                <span class="loading loading-spinner loading-xs"></span>
              ) : (
                `Submit`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
