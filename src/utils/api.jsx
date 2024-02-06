import axios from "axios";

const api = axios.create({
  baseURL: "https://project-nc-news-w769.onrender.com/api",
});

export function getArticles(limit = 10, page = 1, topic = "") {
  return api
    .get(`/articles?limit=${limit}&p=${page}&topic=${topic}`)
    .then((response) => {
      return response.data.articles;
    });
}

export function getTopics() {
  return api.get(`/topics`).then((response) => {
    return response.data.topics;
  });
}

export function getArticleByArticleID(article_id) {
  return api.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
}

export function getCommentsByArticleID(article_id) {
  return api.get(`/articles/${article_id}/comments`).then((response) => {
    const comments = response.data.comments;
    const promises = comments.map((comment) => {
      return api.get(`/users/${comment.author}`).then((response) => {
        comment.avatar_url = response.data.user.avatar_url;
        return comment;
      });
    });
    return Promise.all(promises).then((response) => {
      return response;
    });
  });
}

export function patchVotesByArticleID(article_id, value) {
  return api
    .patch(`/articles/${article_id}`, {
      inc_votes: value,
    })
    .then((response) => {
      return response.data.article;
    });
}
