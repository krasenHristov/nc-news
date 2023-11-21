const express = require("express");
const { getAllTopics } = require("./controllers/topicsController");
const { getArticleById } = require("./controllers/articlesController");
const { sqlErrors, customErrors, serverError } = require("./middleware/errorHandlers");
const { getDocs } = require("./documentation/docController");
const { getAllArticles } = require("./controllers/articlesController");
const { getAllCommentsForArticle } = require("./controllers/commentsController");

const app = express();


//docs
app.get("/api", getDocs)

//topics
app.get("/api/topics", getAllTopics);

app.get("/api/articles", getAllArticles)

//articles
app.get("/api/articles/:article_id", getArticleById)

//comments
app.get("/api/articles/:article_id/comments", getAllCommentsForArticle)

app.use(sqlErrors, customErrors, serverError)

module.exports = app;
