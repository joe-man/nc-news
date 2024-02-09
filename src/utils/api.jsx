import axios from "axios";

const api = axios.create({
  baseURL: "https://project-nc-news-w769.onrender.com/api",
});

export function getArticles(limit = 10, page = 1, topic = "", sort_by, order_by) {
  return api
    .get(`/articles`, {
      params: {
        limit: limit,
        p: page,
        topic: topic,
        sort_by: sort_by,
        order: order_by,
      },
    })
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

export function postCommentByArticleID(article_id, comment) {
  return api.post(`/articles/${article_id}/comments`, comment).then((response) => {
    const comment = response.data.comment;
    return api.get(`/users/${comment.author}`).then((response) => {
      comment.avatar_url = response.data.user.avatar_url;
      return comment;
    });
  });
}

export function deleteComment(comment_id) {
  return api.delete(`/comments/${comment_id}`);
}

export function getUsers() {
  return api.get(`/users`).then((response) => {
    return response.data.users;
  });
}

export function getUserByUsername(username) {
  return api.get(`/users/${username}`).then((response) => {
    return response.data.user;
  });
}
