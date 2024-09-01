import React, { useEffect, useState } from "react";
import apiService from "../../utils/axiosInstance";
import Logo from "../../assets/logo/admin_logo.png";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    apiService.post("/users/getAllUsers", {pageNumber}).then((res) => {
      if (res) {
        console.log(res.data);
        setCount(res.data.length);
        setTotalData(res.data.count);
        setTotalPage(res.data.totalPage);
        setUsers(
          res.data.data.map((m) => ({ ...m, isSelect: false })).slice(0, 10)
        );
      }
    });
  }, [pageNumber]);

  const handleCurrentBox = (id) => {
    const updatedData = users.map((item) => {
      if (item.userId === id) {
        return { ...item, isSelect: !item.isSelected };
      }
      return item;
    });

    setUsers(updatedData);
    setSelectAll(users.every((e) => e.isSelect));
  };

  const handleCheckAll = () => {
    setSelectAll(!selectAll);
    setUsers(users.map((item) => ({ ...item, isSelect: !selectAll })));
  };

  return (
    <div className="">
      {
        <table className="border-y-2 table table-bordered">
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
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Account Status</th>
              <th>Form Status</th>
              {/* <th>Resend Mail</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index} className="text-lg">
                <td>
                  <input
                    type="checkbox"
                    checked={item.isSelect}
                    onChange={() => handleCurrentBox(item.userId)}
                    className="checkbox"
                  />
                </td>
                <td>
                  {item?.articleImage ? (
                    <img
                      width={32}
                      height={32}
                      className="object-cover rounded-full border-2"
                      src={item?.articleImage}
                      alt={item}
                    />
                  ) : (
                    <div className="w-[40px] h-[40px] p-1 rounded-md border-2 flex items-center justify-center">
                      <img
                        className="object-contain w-full h-full"
                        src={Logo}
                        alt=""
                      />
                    </div>
                  )}
                </td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.role}</td>
                <td>
                  <p
                    className={`badge badge-outline ${
                      item?.isActive ? "badge-success" : "badge-error"
                    }`}
                  >
                    {item?.isActive ? "Active" : "Inactive"}
                  </p>
                </td>
                <td>
                  <p
                    className={`badge badge-outline ${
                      item?.isChoice ? "badge-success" : "badge-error"
                    }`}
                  >
                    {item?.isChoice ? "Filled" : "Not Filled"}
                  </p>
                </td>
                {/* <td>
                  <button className="bg-[#0000ff] text-white px-2 rounded-lg">send</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      }
      <div className="flex justify-between p-4">
        <ul>
          <li>
            Count {count * (pageNumber - 1) + 1} - {count * pageNumber} out of{" "}
            {totalData}
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
  );
};

export default User;
