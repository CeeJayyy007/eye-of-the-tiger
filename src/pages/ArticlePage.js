import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  const navigate = useNavigate();

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

  const navigateToLogin = () => {
    navigate("/login");
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div id="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>Upvote</button>
        ) : (
          <button onClick={navigateToLogin}>Login to upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvotes(s)</p>
      </div>
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button onClick={navigateToLogin}>Login to Comment</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
