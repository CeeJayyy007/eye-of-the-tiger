import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  const { articleId } = useParams();

  useEffect(() => {
    const fetchArticleInfoData = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };
    fetchArticleInfoData();
  }, [articleId]);

  const article = articles?.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const newArticleInfo = response.data;
    setArticleInfo(newArticleInfo);
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div id="upvotes-section">
        <button onClick={addUpvote} class="upvote-button">
          Upvote
        </button>
        <p>This article has {articleInfo.upvotes} upvotes(s)</p>
      </div>
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <AddCommentForm
        articleName={articleId}
        onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
      />
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
