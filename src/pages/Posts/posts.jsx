import React, { useEffect, useState } from "react";
import apiService from "../../utils/axiosInstance";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import AddPost from "./addPost/addPost";
import { toast, ToastContainer } from "react-toastify";
import EditPost from "./EditPost/editPost";

const Posts = ({ onDataClick }) => {
  const location = useLocation();
  const [post, setPost] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    apiService
      .post("/posts/getPosts", { pageNumber: pageNumber < 1 ? 1 : pageNumber })
      .then((res) => {
        if (res) {
          console.log(res.data);
          setCount(res.data.length);
          setTotalData(res.data.count);
          setTotalPage(res.data.totalPage);
          setPost(res.data.data.map((m) => ({ ...m, isSelect: false })));
        }
      });
  }, [pageNumber, location]);

  const handleCurrentBox = (id) => {
    const updatedData = post.map((item) => {
      if (item.postId === id) {
        sendFormData({ id, type: `post` });
        return { ...item, isSelect: !item.isSelected };
      }
      return item;
    });

    setPost(updatedData);
    setSelectAll(post.every((e) => e.isSelect));
  };

  const handleCheckAll = () => {
    setSelectAll(!selectAll);
    setPost(post.map((item) => ({ ...item, isSelect: !selectAll })));
  };

  const sendFormData = (dataFrom) => {
    onDataClick(dataFrom);
  };

  const changeStatus = (item) => {
    const loading = toast.loading(`Processing...`, { isLoading: true });

    apiService
      .post("/posts/postUpdateStatus", {
        id: item.postId,
        isApproved: !item.isApproved,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.success) {
          toast.update(loading, {
            render: res.data.message,
            type: `success`,
            isLoading: false,
            autoClose: 3000,
          });
          setPost(
            post.map((m) => {
              if (m.postId === item.postId) {
                m.isApproved = !m.isApproved;
              }
              return m;
            })
          );
        }
      })
      .catch((error) => {
        // toast.update(loading, {
        //   render: error.error.message,
        //   type: `success`,
        //   isLoading: false,
        //   autoClose: 3000,
        // });
      });
  };

  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="flex flex-col overflow-auto max-h-screen h-full">
            {
              <table className="flex-1 border-y-2 table table-bordered h-[50%]">
                <thead>
                  <tr className="text-lg">
                    <th>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectAll}
                        onChange={handleCheckAll}
                      />
                    </th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Source Link</th>
                  </tr>
                </thead>
                <tbody>
                  {post.map((item, index) => (
                    <tr key={index} className="text-lg">
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={item.isSelect}
                          onChange={() => handleCurrentBox(item.postId)}
                        />
                      </td>
                      <td>
                        <img
                          width={40}
                          height={40}
                          className="object-contain aspect-square	"
                          src={item?.postImage}
                          alt=""
                        />
                      </td>
                      <td>
                        <p className="badge badge-outline badge-info">
                          {item?.postCategoryId?.name}
                        </p>
                      </td>
                      <td>
                        <p className="line-clamp-1">{item?.title}</p>
                      </td>
                      <td className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="toggle"
                          checked={item?.isApproved}
                          onChange={(e) => changeStatus(item)}
                        />
                        <p
                          className={`badge badge-outline ${
                            item?.isApproved ? "badge-success" : "badge-error"
                          }`}
                        >
                          {item?.isApproved ? "Active" : "Inactive"}
                        </p>
                      </td>
                      <td>
                        <Link
                          to={item?.postUrl}
                          className="underline hover:decoration-solid"
                          target="_blank"
                        >
                          Source Link
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
            <div className="flex justify-between p-4">
              <ul>
                <li>
                  Count {count * (pageNumber - 1) + 1} - {count * pageNumber}{" "}
                  out of {totalData}
                </li>
                <li>
                  Page {pageNumber} out of {totalPage}
                </li>
              </ul>
              <div className="flex gap-4">
                <button
                  disabled={pageNumber === 1}
                  className="btn btn-outline btn-info"
                  onClick={() => setPageNumber(pageNumber - 1)}
                >
                  Prev
                </button>
                <button
                  disabled={pageNumber === totalPage}
                  className="btn btn-outline btn-info"
                  onClick={() => setPageNumber(pageNumber + 1)}
                >
                  Next
                </button>
              </div>
            </div>
            <ToastContainer />
          </div>
        }
      ></Route>
      <Route path="/add" element={<AddPost></AddPost>}>
        {" "}
      </Route>
      <Route path="/edit" element={<EditPost></EditPost>}>
        {" "}
      </Route>
    </Routes>
  );
};

export default Posts;
