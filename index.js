import jsonServer from "json-server";
import cors from "cors";
import datas from "./datas.json" assert { type: "json" };

const server = jsonServer.create();
const router = jsonServer.router(datas);
const middlewares = jsonServer.defaults();
const port = 5000;

const allowedOrigins = [
  "http://localhost:5173",
];

const customCorsOptions = {
  origin: allowedOrigins,
};

server.use(cors(customCorsOptions)); // Add the CORS middleware with custom options
server.use(middlewares);
server.use(router);

server.post("/:resource", (req, res) => {
  const { resource } = req.params;
  const db = router.db;

  if (db.has(resource).value()) {
    const data = req.body;
    data.id = generateId(db.get(resource).value()); // Generate a unique ID
    db.get(resource).push(data).write();
    res.status(201).json({ message: "Data added successfully", data });
  } else {
    res.status(404).json({ error: "Resource not found" });
  }
});

server.delete("/:resource/:id", (req, res) => {
  const { resource, id } = req.params;
  const db = router.db;

  if (db.has(resource).value()) {
    const index = db.get(resource).value().findIndex((item) => item.id === parseInt(id));

    if (index !== -1) {
      db.get(resource).splice(index, 1).write();
      res.status(200).json({ message: "Data deleted successfully" });
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } else {
    res.status(404).json({ error: "Resource not found" });
  }
});

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
