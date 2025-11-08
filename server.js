import express from "express";
import gemini from "./gemini.js";  // make sure this is exported correctly

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static("FrontEn"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serve your index.html properly
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./FrontEn" });
});

// ✅ Async call to gemini() must use await
app.post("/post", async (req, res) => {
  try {
    const prompt=req.body.data;
    console.log(prompt);
    const response = await gemini(prompt); // added await
    console.log(response);
    res.json({ message: "done", data: response });
  } catch (error) {
    console.error("Error in /post:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
