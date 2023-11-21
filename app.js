const express = require("express");
const { getAllTopics } = require("./controllers/topicsController");
const { getArticleById } = require("./controllers/articlesController");
const { sqlErrors, customErrors, serverError } = require("./middleware/errorHandlers");
const { getDocs } = require("./documentation/docController");
const { getAllArticles } = require("./controllers/articlesController");
const { getAllCommentsForArticle, createCommentForArticle } = require("./controllers/commentsController");
const { getAllUsers } = require("./controllers/usersController");

const app = express();

app.use(express.json())

//docs
app.get("/api", getDocs)

//topics
app.get("/api/topics", getAllTopics);

//articles
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles", getAllArticles)

//comments
app.post("/api/articles/:article_id/comments", createCommentForArticle)
app.get("/api/articles/:article_id/comments", getAllCommentsForArticle)

//users
app.get("/api/users", getAllUsers)

app.use(sqlErrors, customErrors, serverError)

module.exports = app;
