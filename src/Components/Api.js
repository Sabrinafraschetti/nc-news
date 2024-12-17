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

const getComments = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments
})
}

const patchVotes = (article_id, incVotes) => {
  return api.patch(`/articles/${article_id}`, { inc_votes: incVotes} ).then(() => {
    console.log('database updated')
  })
}

export { getTopics, fetchArticlesByTopics, fetchArticleById, getComments, patchVotes }