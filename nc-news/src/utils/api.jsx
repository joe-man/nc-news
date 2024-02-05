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
