const express = require("express");
const app = express();
app.use(express.json());

// In-memory "database"
let fines = [];
let currentId = 1;

// Create a fine (POST /fine)
app.post("/fine", (req, res) => {
  const { title, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const newFine = {
    id: currentId++,
    title,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  fines.push(newFine);
  return res.status(201).json({ message: "Fine created successfully.", data: newFine });
});

// Update a fine's status to 'paid' (PUT or PATCH /fine/:id)
app.put("/fine/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const fine = fines.find(f => f.id === id);

  if (!fine) {
    return res.status(404).json({ message: "Fine not found." });
  }

  fine.status = "paid";
  fine.updatedAt = new Date();
  return res.status(200).json({ message: "Fine updated successfully.", data: fine });
});

app.patch("/fine/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const fine = fines.find(f => f.id === id);

  if (!fine) {
    return res.status(404).json({ message: "Fine not found." });
  }

  fine.status = "paid";
  fine.updatedAt = new Date();
  return res.status(200).json({ message: "Fine updated successfully.", data: fine });
});

// Delete a fine (DELETE /fine/:id)
app.delete("/fine/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = fines.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Fine not found." });
  }

  fines.splice(index, 1);
  return res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
