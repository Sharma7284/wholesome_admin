import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import apiService from "../../utils/axiosInstance";

const Community = ({ isEdit, onDataClick }) => {
  const [community, setCommunity] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    console.log(isEdit);
    apiService
      .post("/community/getCommunitiesCategory", { pageNumber })
      .then((res) => {
        if (res) {
          console.log(res.data.data);
          setCount(res.data.length);
          setTotalData(res.data.count);
          setTotalPage(res.data.totalPage);
          setCommunity(res.data.data.map((m) => ({ ...m, isSelect: false })));
        }
      });
  }, [pageNumber]);

  const sendFormData = () => {
    const data = community.filter((f) => f.isSelect);
    console.log({ data });
    onDataClick(data);
  };

  const handleCurrentBox = (id) => {
    const updatedData = community.map((item) => {
      if (item.id === id) {
        console.log(true, id);
        sendFormData({ id, type: `article` });
        return { ...item, isSelect: !item.isSelected };
      }
      return item;
    });
    console.log(updatedData);

    setCommunity(updatedData);
    setSelectAll(community.every((e) => e.isSelect));
  };

  const handleCheckAll = () => {
    setSelectAll(!selectAll);
    setCommunity(community.map((item) => ({ ...item, isSelect: !selectAll })));
  };

  return (
    <>
      {isEdit ? (
        <p>Edit</p>
      ) : (
        <Routes>
          <Route
            path=""
            element={
              <div className="overflow-x-auto border-y-2 ">
                {
                  <table className="table table-bordered table-pin-rows table-pin-cols">
                    <thead>
                      <tr className="text-lg sticky">
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {community.length > 0 &&
                        community.map((item, index) => (
                          <tr key={index} className="text-lg">
                            <td>
                              <input
                                type="checkbox"
                                checked={item.isSelect}
                                onChange={() =>
                                  handleCurrentBox(item.articleId)
                                }
                                className="checkbox"
                              />
                            </td>
                            <td>
                              <img
                                width={40}
                                height={40}
                                className="object-cover aspect-square	"
                                src={item?.articleImage}
                                alt=""
                              />
                            </td>
                            <td>
                              <p className="badge badge-outline badge-info line-clamp-1">
                                {item?.articleCategoryId?.name}
                              </p>
                            </td>
                            <td>
                              <p className="line-clamp-1">{item?.title}</p>
                            </td>
                            <td>
                              <p
                                className={`badge badge-outline ${
                                  item?.isApproved
                                    ? "badge-success"
                                    : "badge-error"
                                }`}
                              >
                                {item?.isApproved ? "Active" : "Inactive"}
                              </p>
                            </td>
                            <td>
                              <Link to={item?.sourceLink} className="link">
                                see more
                              </Link>
                              {/* <p className="line-clamp-1"></p> */}
                            </td>
                            <td>
                              <div className="flex gap-4">
                                <Link
                                  className="link link-info"
                                  to={`/dashboard/article/${item.articleId}`}
                                >
                                  Edit
                                </Link>
                                {/* {item.isSelect && (
                            <a className="link link-error">
                              Delete
                            </a>
                          )} */}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                }
                <div className="flex justify-between p-4">
                  <ul>
                    <li>
                      Count {count * (pageNumber - 1) + 1} -{" "}
                      {count * pageNumber} out of {totalData}
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
              </div>
            }
          ></Route>
          {/* <Route path="add" element={<AddArticle></AddArticle>}></Route> */}
        </Routes>
      )}
    </>
  );
};

export default Community;
