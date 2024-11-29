import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/dashboard";
import User from "../../pages/Users/user";
import Posts from "../../pages/Posts/posts";
import Article from "../../pages/Articles/article";
import apiService from "../../utils/axiosInstance";
import Community from "../../pages/Community/community";
import useDebounce from "../../hooks/useDebounce";
import axios from "axios";
import { toast } from "react-toastify";

const Main = () => {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [pathName, setPathName] = useState("");
  const [dataForm, setDataForm] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);

  const debouncedQuery = useDebounce(searchText, 300);

  useEffect(() => {
    setPathName(location.pathname.split("/")[2]);
  }, [location]);

  const onSearch = async (query) => {
    const loading = toast.loading(`Searcing... ${searchText}`, {
      // className: styles.customToast,
    });
    const {
      data: { data },
    } = await apiService.get(`posts/searchPosts?title=${query}`);

    if (data && data.length > 0) {
      setSearchList(data);
      toast.update(loading, {
        render: `Result found : ${data.length}.`,
        type: `success`,
        isLoading: false,
        autoClose: 3000,
        // className: styles.customToast,
      });
    } else {
      setSearchList([]);
      toast.update(loading, {
        render: data.message,
        type: `error`,
        isLoading: false,
        autoClose: 3000,
        // className: styles.customToast,
      });
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    } else {
      setSearchList([]);
    }
  }, [debouncedQuery]);

  const getCurrentUrlText = (text) => {
    return text?.charAt(0).toUpperCase() + text?.slice(1);
  };

  useEffect(() => {}, [dataForm]);

  // Delete
  const onClickDelete = () => {
    if (dataForm.type === "post") {
      apiService
        .post("/posts/postDeletePost", { id: dataForm.id })
        .then((res) => {})
        .catch((error) => {});
    } else if (dataForm.type === "article") {
      apiService
        .post("/articles/postArticleDelete", { id: dataForm.id })
        .then((res) => {})
        .catch((error) => {});
    }
  };

  // Edit
  // const onClickEdit = () => {
  //

  //   if (dataForm.type === "post") {
  //   } else if (dataForm.type === "article") {
  //   }
  // };

  const handleDataFrom = (formData) => {
    setDataForm(formData);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pl-6">
        {pathName === "posts" && (
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="p-2 border-2 border-radius-2"
          />
        )}

        {pathName !== `dashboard` && (
          <div className="sticky flex flex-1 gap-4 p-4 py-4 justify-end">
            <Link to={`/dashboard/${pathName}/add`}>
              <button className="btn btn-outline btn-success">
                Add {getCurrentUrlText(pathName)}
              </button>
            </Link>
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
      </div>
      <div className="flex-1">
        <Routes>
          <Route path="" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="users/*"
            element={<User onDataClick={handleDataFrom}></User>}
          ></Route>
          <Route
            path="posts/*"
            element={
              <Posts
                searchData={searchList}
                onDataClick={handleDataFrom}
              ></Posts>
            }
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
