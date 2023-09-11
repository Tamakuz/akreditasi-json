import jsonServer from "json-server";
import cors from "cors";
import axios from "axios"; // Import Axios for making HTTP requests

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://admin-akreditasi.vercel.app",
];

const customCorsOptions = {
  origin: allowedOrigins,
};

server.use(cors(customCorsOptions)); // Use the CORS middleware with custom options
server.use(middlewares);

// Fetch JSON data from the external URL
axios
  .get("https://api.jsonbin.io/v3/b/64fea27b8d92e126ae6a2b29")
  .then((response) => {
    const data = response.data.record;
    const router = jsonServer.router(data);
    server.use(router);

    // server.post("/:resource", (req, res) => {
    //   const { resource } = req.params;
    //   const db = router.db;

    //   if (db.has(resource).value()) {
    //     const data = req.body;
    //     data.id = generateId(db.get(resource).value()); // Generate a unique ID
    //     db.get(resource).push(data).write();
    //     res.status(201).json({ message: "Data added successfully", data });
    //   } else {
    //     res.status(404).json({ error: "Resource not found" });
    //   }
    // });

    // server.delete("/:resource/:id", (req, res) => {
    //   const { resource, id } = req.params;
    //   const db = router.db;

    //   if (db.has(resource).value()) {
    //     const index = db
    //       .get(resource)
    //       .value()
    //       .findIndex((item) => item.id === parseInt(id));

    //     if (index !== -1) {
    //       db.get(resource).splice(index, 1).write();
    //       res.status(200).json({ message: "Data deleted successfully" });
    //     } else {
    //       res.status(404).json({ error: "Data not found" });
    //     }
    //   } else {
    //     res.status(404).json({ error: "Resource not found" });
    //   }
    // });

    // server.put("/:resource/:id", (req, res) => {
    //   const { resource, id } = req.params;
    //   const db = router.db;

    //   if (db.has(resource).value()) {
    //     const index = db
    //       .get(resource)
    //       .value()
    //       .findIndex((item) => item.id === parseInt(id));

    //     if (index !== -1) {
    //       const newData = req.body;

    //       // Update the existing data with new data
    //       db.get(resource)
    //         .find({ id: parseInt(id) })
    //         .assign(newData)
    //         .write();

    //       res
    //         .status(200)
    //         .json({ message: "Data updated successfully", newData });
    //     } else {
    //       res.status(404).json({ error: "Data not found" });
    //     }
    //   } else {
    //     res.status(404).json({ error: "Resource not found" });
    //   }
    // });


    // Start the server
    server.listen(port, () => {
      console.log(`JSON Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error fetching JSON data:", error);
  });
