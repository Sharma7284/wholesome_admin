import React, { useEffect, useState } from "react";
import apiService from "../../../utils/axiosInstance";

const AddArticle = () => {
  const [title, setTitle] = useState("");
  const [articleImage, setArticleImage] = useState(undefined);
  const [description, setDescription] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [articleCategoryId, setArticleCategoryId] = useState("");
  const [isApproved, setIsApproved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [option, setOption] = useState([]);

  useEffect(() => {
    apiService.post("/articles/getArticlesCategory", {}).then((res) => {
      if (res) {
        setOption(res.data.data);
        setArticleCategoryId(res.data.data[0].articleCategoryId);
      }
    });
  }, []);

  const onPostSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    apiService
      .post("/articles/postArticles", {
        title: title.trim(),
        articleImage: articleImage,
        description: description.trim(),
        sourceLink: sourceLink,
        articleCategoryId: articleCategoryId,
        isApproved: isApproved,
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Add Article</h2>
      <div className="w-full p-8">
        <form onSubmit={(e) => onPostSubmit(e)}>
          <div className="flex flex-col">
            <label htmlFor="title" className="label">
              Article Title
            </label>
            <div className="border-2 rounded-lg">
              <input
                type="text"
                id="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full border-2"
                placeholder="Enter title"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="label">
              Article Image
            </label>
            <div className="border-2 rounded-lg p-2">
              <input
                type="file"
                id="file"
                onChange={(e) => setArticleImage(e.target.files[0])}
                className="input w-full h-auto border-2 pl-0"
                placeholder="Enter title"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="label">
              Article Description
            </label>
            <div className="border-2 rounded-lg">
              <textarea
                type="text"
                id="description"
                required
                onChange={(e) => setDescription(e.target.value)}
                className="textarea w-full "
                placeholder="Enter description"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="sourceLink" className="label">
              Article Link
            </label>
            <div className="border-2 rounded-lg">
              <input
                type="text"
                id="sourceLink"
                required
                onChange={(e) => setSourceLink(e.target.value)}
                className="input w-full border"
                placeholder="Enter Source Link"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="sourceLink" className="label">
              Article Category
            </label>
            <div className="border-2 py-2 rounded-lg">
              <select
                onChange={(e) => setArticleCategoryId(e.target.value)}
                className="w-full border-none px-2 outline-none"
                name=""
                id=""
                value={articleCategoryId}
              >
                {option.map((ele, index) => (
                  <option key={index} value={ele.articleCategoryId}>
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
                `Submit`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
