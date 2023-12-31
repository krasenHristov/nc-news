"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
exports.usersRouter = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         name:
 *           type: string
 *         avatar_url:
 *           type: string
 *           format: url
 */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieves all users
 *     description: Provides a list of all users in the system.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
exports.usersRouter.get("/users", usersController_1.getAllUsers);
/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Retrieves a user by username
 *     description: Provides details of a specific user identified by username.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user to retrieve
 *     responses:
 *       200:
 *         description: Details of a user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
exports.usersRouter.get("/users/:username", usersController_1.getUserByUsername);
/**
 * @swagger
 * /api/users/signin:
 *   post:
 *     summary: Signs a user in
 *     description: Authenticates a user and returns a JWT token upon successful authentication.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user account
 *     responses:
 *       200:
 *         description: Authentication successful. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 */
exports.usersRouter.post("/users/signin", usersController_1.signUserIn);
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Creates a new user
 *     description: Allows for the creation of a new user in the system.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, name, password]
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique username for the user
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the user account
 *               avatar_url:
 *                 type: string
 *                 format: uri
 *                 description: URL of the user's avatar image (optional)
 *     responses:
 *       201:
 *         description: User created successfully. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the created user
 *       409:
 *         description: User already exists
 */
exports.usersRouter.post("/users/signup", usersController_1.createUser);
/**
 * @swagger
 * /api/users/{username}/articles:
 *   get:
 *     summary: Retrieves all articles by a specific user
 *     description: Provides a list of all articles created by a specific user.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user whose articles are to be retrieved
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
exports.usersRouter.get("/users/:username/articles", usersController_1.getUserArticles);
/**
 * @swagger
 * /api/users/{username}/comments:
 *   get:
 *     summary: Retrieves all comments by a specific user
 *     description: Provides a list of all comments created by a specific user.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user whose comments are to be retrieved
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
exports.usersRouter.get("/users/:username/comments", usersController_1.getUserComments);
