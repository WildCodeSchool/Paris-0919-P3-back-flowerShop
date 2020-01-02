const Controllers = require("../utils/controllers");

exports.articles_get_all = (req, res) => {
  const queryString = `
    SELECT a.id, a.name, a.description, p.url 
    FROM Article AS a
    INNER JOIN Photo AS p
    ON a.id_photo = p.id
  `;
  return Controllers.tableGetAll(queryString, res);
};

exports.articles_get_article = (req, res) => {
  const queryString = `
    SELECT a.id, a.name, a.description, p.url 
    FROM Article AS a 
    INNER JOIN Photo AS p
    ON a.id_photo = p.id
    WHERE a.id=(?) 
  `;
  return Controllers.tableGetOne(queryString, req, res);
};

exports.articles_add_article = (req, res) => {
  return Controllers.tableCreateOne("Article", req, res);
};

exports.articles_update_article = (req, res) => {
  const authorizedKeys = ["name", "description", "id_photo"];
  return Controllers.tableUpdateOne("Article", authorizedKeys, req, res);
};

exports.articles_delete_article = (req, res) => {
  return Controllers.tableDeleteOne("Article", req, res);
};
