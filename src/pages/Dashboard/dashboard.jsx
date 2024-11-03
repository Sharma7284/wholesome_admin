import React, { useEffect, useState } from "react";
import Modal from "../../components/Modals/modal";
import apiService from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dashboardData, setDashboardData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    apiService
      .post(`/dashboard/getAnalytics`, {})
      .then((res) => {
        setDashboardData(res.data[0]);
      })
      .catch((error) => {
        
      });

    apiService
      .post(`/users/getAllUsers`, { pageNumber: 1 })
      .then((res) => {
        setUserData(res.data.data.slice(0, 5));
      })
      .catch((error) => {
        
      });

    apiService
      .post(`/articles/getArticles`, { pageNumber: 1 })
      .then((res) => {
        setArticleData(res.data.data.slice(0, 5));
      })
      .catch((error) => {
        
      });

    apiService
      .post(`/posts/getPosts`, { pageNumber: 1 })
      .then((res) => {
        
        setPostData(res.data.data.slice(0, 5));
      })
      .catch((error) => {
        
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col m-4 gap-4">
      <div className="sticky grid grid-cols-4 gap-4">
        {Object.entries(dashboardData).map((m, i, item) => (
          <div
            key={i}
            className="card bg-base-100 px-8 py-4 h-[100%] border-2 gap-4"
          >
            <figure>
              <h2 className="text-6xl font-bold">{m[1]}</h2>
            </figure>
            <div className="card-body justify-end items-center p-0">
              <h2 className="card-title">
                {m[0].charAt(0).toUpperCase() + m[0].slice(1)}
              </h2>
              {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 flex-1 w-[100%]">
        <div className="card p-2 border-2 flex-1">
          <h2 className="font-bold text-2xl rounded-lg p-2 bg-[#085946] text-white">
            USERS
          </h2>
          <table className="table text-lg">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((m, i) => (
                <tr key={i}>
                  <td>
                    <p className="line-clamp-1">{m.name}</p>
                  </td>
                  <td>{m.email}</td>
                  <td>{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card p-2 border-2 flex-1">
          <h2 className="font-bold text-2xl rounded-lg p-2 bg-[#085946] text-white">
            ARTICLE
          </h2>
          <table className="table text-lg">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {articleData.map((m, i) => (
                <tr key={i}>
                  <td>
                    <p className="line-clamp-1">{m.title}</p>
                  </td>
                  <td>
                    <p className="line-clamp-1" innerHTML={m?.description}></p>
                  </td>
                  <td>
                    <button className="link">
                      <Link to={m.sourceLink}>Link</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card p-2 border-2 flex-1">
          <h2 className="font-bold text-2xl rounded-lg p-2 bg-[#085946] text-white">
            POST
          </h2>
          <table className="table text-lg">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Source Link</th>
              </tr>
            </thead>
            <tbody>
              {postData.map((m, i) => (
                <tr key={i}>
                  <td>
                    <p className="line-clamp-1">{m.title}</p>
                  </td>
                  <td>
                    <p className="line-clamp-1">{m.postCategoryId.name}</p>
                  </td>
                  <td>
                    <button className="link">
                      <Link to={m.sourceLink}>Link</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
