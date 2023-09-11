import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("datas.json");
const middlewares = jsonServer.defaults();
const port = 5000;

const allowedOrigins = [
  "http://localhost:5173",
];

const customCorsOptions = {
  origin: allowedOrigins,
};

server.use(cors());
server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
