import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/dashboard";
import User from "../../pages/Users/user";
import Posts from "../../pages/Posts/posts";
import Article from "../../pages/Articles/article";
import apiService from "../../utils/axiosInstance";
import Community from "../../pages/Community/community";

const Main = () => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [pathName, setPathName] = useState("");
  const [dataForm, setDataForm] = useState([]);

  useEffect(() => {
    setPathName(location.pathname.split("/")[2]);
  }, [location]);

  const getCurrentUrlText = (text) => {
    return text?.charAt(0).toUpperCase() + text?.slice(1);
  };

  useEffect(() => {}, [dataForm]);

  // Delete
  const onClickDelete = () => {
    console.log("Delete");
    console.log(dataForm);
    if (dataForm.type === "post") {
      apiService
        .post("/posts/postDeletePost", { id: dataForm.id })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (dataForm.type === "article") {
      apiService
        .post("/articles/postArticleDelete", { id: dataForm.id })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Edit
  // const onClickEdit = () => {
  //   console.log("Edit");

  //   if (dataForm.type === "post") {
  //   } else if (dataForm.type === "article") {
  //   }
  // };

  const handleDataFrom = (formData) => {
    setDataForm(formData);
  };

  return (
    <div className="flex flex-col h-full">
      {pathName !== `dashboard` && (
        <div className="sticky flex gap-4 p-4 py-4 justify-end">
          <Link to={`/dashboard/${pathName}/add`}>
            <button className="btn btn-outline btn-success">
              Add {getCurrentUrlText(pathName)}
            </button>
          </Link>
          {/* <button onClick={onClickEdit} className="btn btn-outline btn-info">
            Edit {getCurrentUrlText(pathName)}
          </button> */}
          {pathName !== `users` && (
            <button
              onClick={onClickDelete}
              className="btn btn-outline btn-error"
            >
              Delete {getCurrentUrlText(pathName)}
            </button>
          )}
        </div>
      )}
      <div className="flex-1">
        <Routes>
          <Route path="" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="users"
            element={<User onDataClick={handleDataFrom}></User>}
          ></Route>
          <Route
            path="posts/*"
            element={<Posts onDataClick={handleDataFrom}></Posts>}
          ></Route>
          <Route
            path="community"
            element={<Community onDataClick={handleDataFrom}></Community>}
          ></Route>
          <Route
            path="article/*"
            element={
              <Article isEdit={isEdit} onDataClick={handleDataFrom}></Article>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
