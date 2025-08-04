import express from 'express';
import 'dotenv/config'

const app = express();
const port = process.env . PORT || 3000;

app.use(express.json());

let TeaData = [];
let nextId = 1;

// Add new tea
app.post('/teas', (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  TeaData.push(newTea);
  res.status(201).send(newTea);
});
// get all tea
app.get('/teas', (req, res) => {
  console.log("GET /teas called");
  res.status(200).send(TeaData);
});

// Get tea by ID
app.get('/teas/:id', (req, res) => {
  const tea = TeaData.find(t => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  res.status(200).send(tea);
});

// Update tea
app.put('/teas/:id', (req, res) => {
  const tea = TeaData.find(t => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// Delete tea
app.delete('/teas/:id', (req, res) => {
  const index = TeaData.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('tea not found');
  }
  TeaData.splice(index, 1);
  res.status(200).send('delete');
});

// Other routes
app.get("/t", (req, res) => {
  res.send("hello world");
});

app.get("/ice-tea", (req, res) => {
  res.send("what ice tea would you prefer");
});

app.get("/twitter", (req, res) => {
  res.send("takshdotcom");
});

// Start server (Only once!)
app.listen(port, () => {
  console.log(`server is running port: ${port}...`);
});
