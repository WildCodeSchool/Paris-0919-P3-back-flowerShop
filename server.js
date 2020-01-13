const http = require("http");
const app = require("./app");

// import fichier .env
require("dotenv").config({ path: "./config/dev.env" });

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
