import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Site çalışıyor 🚀");
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} üzerinde çalışıyor`);
});
