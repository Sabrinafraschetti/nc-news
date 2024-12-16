import axios from "axios"

const api = axios.create({
    baseURL: "https://sabrinas-nc-news.onrender.com/api/",
})

const getTopics = () => {
    return api.get("/topics").then(({ data }) => {
        return data.topics
      });
}

const fetchArticlesByTopics = (selectedTopic) => {
    if (selectedTopic === "all") {
        return api.get("/articles").then(({ data }) => { 
          return data.articles
        })
      } else {
        return api.get(`/articles?topic=${selectedTopic}`).then(({ data }) => {
          return data.articles
        })
      }
}

const fetchArticleById = (article_id) => {
    return api.get(`/articles/${article_id}`).then(({ data }) => {
        return data.article
    })
}

export { getTopics, fetchArticlesByTopics, fetchArticleById }