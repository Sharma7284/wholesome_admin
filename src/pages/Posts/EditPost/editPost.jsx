import React, { useEffect, useState } from "react";
import apiService from "../../../utils/axiosInstance";
import { useLocation } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [description, setDescription] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [postCategoryId, setPostCategoryId] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [postsId, setPostsId] = useState(null);
  const location = useLocation();

  const [option, setOption] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get(`id`);
    setPostsId(id);

    apiService.post(`/posts/getPostsById`, { id }).then((res) => {
      console.log(res.data.data);
      const { title, postUrl, description, postImage } = res?.data?.data;
      setTitle(title);
      setPostUrl(postUrl);
      setPostImage(postImage);
      setDescription(description);
    });

    apiService.post("/posts/getPostsCategory", {}).then((res) => {
      if (res) {
        setOption(res.data.data);
        setPostCategoryId(res.data.data[0].postCategoryId);
      }
    });
  }, [location]);

  const onPostSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    if (typeof postImage === "object") {
      formData.append("file", postImage, postImage?.name);
    } else {
      formData.append("postImage", postImage);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("postUrl", postUrl);
    formData.append("postCategoryId", postCategoryId);
    formData.append("isApproved", isApproved);
    formData.append("id", postsId);

    apiService
      .post("/posts/updatePosts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Edit Post</h2>
      <div className="w-full p-8">
        <form onSubmit={(e) => onPostSubmit(e)}>
          <div className="flex flex-col">
            <label htmlFor="title" className="label">
              Post Title
            </label>
            <div className="border-2 rounded-lg">
              <input
                type="text"
                id="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full border-2"
                placeholder="Enter title"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="label">
              Post Image
            </label>
            <div className="border-2 flex gap-2 items-center rounded-lg p-2">
              {postImage && <img src={postImage} height={60} width={60} alt=""></img>}
              <input
                type="file"
                id="file"
                className="input w-full h-auto border-2 pl-0"
                placeholder="Enter title"
                onChange={(e) => setPostImage(e?.target?.files[0])}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="label">
              Post Description
            </label>
            <div className="border-2 rounded-lg">
              <textarea
                type="text"
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea w-full "
                placeholder="Enter description"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="sourceLink" className="label">
              Post Link
            </label>
            <div className="border-2 rounded-lg">
              <input
                type="text"
                id="sourceLink"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                className="input w-full border"
                placeholder="Enter Source Link"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="sourceLink" className="label">
              Post Category
            </label>
            <div className="border-2 py-2 rounded-lg">
              <select
                onChange={(e) => setPostCategoryId(e.target.value)}
                className="w-full border-none px-2 outline-none"
                name=""
                id=""
                value={postCategoryId}
              >
                {option.map((ele, index) => (
                  <option key={index} value={ele.postCategoryId}>
                    {ele.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 my-4">
            <label className="font-bold" htmlFor="status">
              {isApproved ? "Active" : "Inactive"}
            </label>
            <input
              type="checkbox"
              id="status"
              className="toggle text-lg"
              checked={isApproved}
              onChange={(e) => setIsApproved(!isApproved)}
            />
          </div>
          <div className="flex py-2">
            <button type="submit" className="btn btn-success text-white">
              {isLoading ? (
                <span class="loading loading-spinner loading-xs"></span>
              ) : (
                `Update`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
