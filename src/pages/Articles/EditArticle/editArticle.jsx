import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiService from "../../../utils/axiosInstance";
import RichTextEditor from "../../../components/CKEditor/ckEditor";

const EditArticle = () => {
  const [title, setTitle] = useState(null);
  const [articleImage, setArticleImage] = useState(undefined);
  const [description, setDescription] = useState(null);
  const [sourceLink, setSourceLink] = useState(null);
  const [articleCategoryId, setArticleCategoryId] = useState(null);
  const [authorName, setAuthorName] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isApproved, setIsApproved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [articleId, setArticleId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  const [option, setOption] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get(`id`);
    setArticleId(id);

    apiService.post(`/articles/getArticlesById`, { id }).then((res) => {
      const {
        articleId,
        title,
        sourceLink,
        authorName,
        summary,
        isApproved,
        articleImage,
        description,
      } = res?.data?.data;

      setTitle(title);
      setSourceLink(sourceLink);
      setAuthorName(authorName);
      setSummary(summary);
      setIsApproved(isApproved);
      setDescription(description);
      setArticleImage(articleImage);
      setIsReady(true);
    });

    apiService.post("/articles/getArticlesCategory", {}).then((res) => {
      if (res) {
        setOption(res.data.data);
        setArticleCategoryId(res.data.data[0].articleCategoryId);
      }
    });
  }, [location]);

  const onPostSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    if (typeof articleImage === "object") {
      formData.append("file", articleImage, articleImage?.name);
    } else {
      formData.append("articleImage", articleImage);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("sourceLink", sourceLink);
    formData.append("articleCategoryId", articleCategoryId);
    formData.append("isApproved", isApproved);
    formData.append("authorName", authorName);
    formData.append("summary", summary);
    formData.append("id", articleId);

    apiService
      .post("/articles/updateArticles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setIsLoading(false);
      });
  };

  const handleDescription = (data) => {
    setDescription(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Edit Article</h2>
      {isReady && (
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
                Article Image
              </label>
              <div className="border-2 flex rounded-lg gap-2 p-2">
                {articleImage && (
                  <img src={articleImage} height={60} width={60}></img>
                )}
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
              <div className="rounded-lg">
                <RichTextEditor
                  value={description}
                  onChange={handleDescription}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col">
                <label htmlFor="sourceLink" className="label">
                  Article Link
                </label>
                <div className="border-2 rounded-lg">
                  <input
                    type="text"
                    id="sourceLink"
                    value={sourceLink}
                    onChange={(e) => setSourceLink(e.target.value)}
                    className="input w-full border"
                    placeholder="Enter Source Link"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <label htmlFor="sourceLink" className="label">
                  Author Name
                </label>
                <div className="border-2 rounded-lg">
                  <input
                    type="text"
                    id="authorName"
                    value={authorName}
                    required
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="input w-full border"
                    placeholder="Enter Author Name"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <label htmlFor="summary" className="label">
                  Enter Summary
                </label>
                <div className="border-2 rounded-lg">
                  <input
                    type="text"
                    id="summary"
                    value={summary}
                    required
                    onChange={(e) => setSummary(e.target.value)}
                    className="input w-full border"
                    placeholder="Enter Summary"
                  />
                </div>
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
                  `Update`
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditArticle;
