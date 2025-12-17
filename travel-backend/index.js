const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

let travelRequests = [];
let counter = 1;

app.post('/api/travel', (req, res) => {
  const data = req.body;
  data.id = counter++;
  travelRequests.push(data);
  console.log('from backend', data);
  res.json({ message: 'Travel Data Saved Successfully', data });
});

app.get('/api/travel', (req, res) => {
  res.json(travelRequests);
});

app.get('/api/travel/:id', (req, res) => {
  const id = Number(req.params.id);
  const record = travelRequests.find((r) => r.id === id);
  if (!record) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(record);
});

app.put('/api/travel/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = travelRequests.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  travelRequests[index] = { ...req.body, id };
  res.json({ message: 'Updated successfully' });
});

app.delete('/api/travel/:id', (req, res) => {
  const id = Number(req.params.id);
  travelRequests = travelRequests.filter((r) => r.id !== id);
  res.json({ message: 'Deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Node API running at http://localhost:${PORT}`);
});
