const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;
  
    const results = title 
      ? repositories.filter(repo => repo.title.includes(title))
      : repositories;
    return response.json(results);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repo = { id: uuid(), title, url, techs }; 

  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repos.findIndex(repo => repo.id === id);

  if (repoIndex < 0 ) {
    return response.status(400).json({ error: 'not found!'});
  }

  const repo = {
    id,
    title,
    url,
    techs
  };

  repos[repoIndex] = repo;

  return response.json(repo);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0 ) {
    return response.status(400).json({ error: 'not found!'});
  }

  repositories.splice(repoIndex, 1); 

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
