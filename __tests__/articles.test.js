require("jest-sorted");
const supertest = require("supertest");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const app = require("../app");
const db = require("../db/connection");

beforeEach(async () => {
  await seed(data);
});

let server;
beforeAll(async () => {
  server = app.listen(0);
});

afterAll(async () => {
  await server.close();
  await db.end();
});

describe('get all articles', () => {
  it("GET 200: Should return an array of objects containing articles to the user", async () => {
    const res = await supertest(app).get("/api/articles");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.articles)).toBe(true);

    expect(res.body.articles).toBeSortedBy("created_at", { descending: true });

    for (const article of res.body.articles) {
      expect(article).toEqual(
        expect.objectContaining({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
          comment_count: expect.any(Number),
        }),
      );
    }
})

describe('get article by ID', () => {
    it("GET 200: Return an article to the user", async () => {
      const res = await supertest(app).get("/api/articles/1");

      const article = res.body.article;
      expect(res.statusCode).toBe(200);

      expect(article.article_id).toBe(1);
      expect(article).toEqual(
        expect.objectContaining({
          author: expect.any(String),
          title: expect.any(String),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        }),
      );
    });

    it("GET 404: Return an error to the user when an article is not found", async () => {
      const res = await supertest(app).get("/api/articles/12000");

      expect(res.statusCode).toBe(404);
      expect(res.body.msg).toBe("Article ID not found");
    });

    it("GET 400: Return an error to the user when invalid article ID is given", async () => {
      const res = await supertest(app).get("/api/articles/asdas");

      expect(res.statusCode).toBe(400);
      expect(res.body.msg).toBe("Invalid input");
    });
  });
})