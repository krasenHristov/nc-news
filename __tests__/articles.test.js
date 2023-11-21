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

describe("get all articles", () => {
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
  });

  describe("get article by ID", () => {
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
          comment_count: 11
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
});

describe("update article", () => {
  it("PATCH 201: Should return updated article object to the user", async () => {
    const res = await supertest(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 100 });

    expect(res.statusCode).toBe(200);
    expect(res.body.newArticle.article_id).toBe(1);
    expect(res.body.newArticle).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        topic: expect.any(String),
        author: expect.any(String),
        body: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        article_img_url: expect.any(String),
      }),
    );
  });

  it("PATCH 201: Should return updated article object to the user when given extra parameters in the body", async () => {
    const res = await supertest(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 100, test_param: "test" });

    expect(res.statusCode).toBe(200);
    expect(res.body.newArticle.article_id).toBe(1);
    expect(res.body.newArticle).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        topic: expect.any(String),
        author: expect.any(String),
        body: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        article_img_url: expect.any(String),
      }),
    );
  });

  it('PATCH, GET 200: Should update the votes in the article', async () => {
    const getArticle = await supertest(app).get("/api/articles/1")
    expect(getArticle.statusCode).toBe(200)
    const votes = getArticle.body.article.votes

    const inc_votes = 100
    const updateArticle = await supertest(app)
      .patch("/api/articles/1")
      .send({ inc_votes });
    expect(updateArticle.statusCode).toBe(200)

    const updatedArticle = await supertest(app).get("/api/articles/1")
    expect(updatedArticle.statusCode).toBe(200)
    const updatedVotes = updatedArticle.body.article.votes

    expect(updatedVotes === (votes+inc_votes)).toBe(true)
  })

  it('PATCH 404: should return an error when article id is not found', async () => {
    const res = await supertest(app)
      .patch("/api/articles/1000")
      .send({ inc_votes: 100 });

    expect(res.statusCode).toBe(404)
    expect(res.body.msg).toBe("Article ID not found")
  })

  it('PATCH 400: should return an error when an invalid article id is given', async () => {
    const res = await supertest(app)
      .patch("/api/articles/asdas")
      .send({ inc_votes: 100 });

    expect(res.statusCode).toBe(400)
    expect(res.body.msg).toBe("Invalid input")
  })

  it('PATCH 400: should return an error when an invalid inc_votes is given', async () => {
    const res = await supertest(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "asdas"});

    expect(res.statusCode).toBe(400)
    expect(res.body.msg).toBe("Invalid input for increment votes")
  })
});
