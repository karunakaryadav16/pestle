// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3033;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://karunakaryadav167:super733@cluster0.dcguop6.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>{
        console.log("mongo db connected successfully ")
    }
).catch(()=>{
    console.log("Error in connecting to Mongo db")
});

// Create a schema for each component
const categorizeSchema = new mongoose.Schema({
  categories: [String],
  items: [{ value: String, category: String }],
});

const closeSchema = new mongoose.Schema({
  sentence: String,
  selectedWords: [String],
});

const comprehensionSchema = new mongoose.Schema({
  questions: [{ question: String, options: [String, String, String, String] }],
});

// Create models based on the schemas
const Categorize = mongoose.model('Categorize', categorizeSchema);
const Close = mongoose.model('Close', closeSchema);
const Comprehension = mongoose.model('Comprehension', comprehensionSchema);

// API routes for saving data
app.post('/api/categorize', async (req, res) => {
  try {
    const categorizeData = req.body;
    const categorize = new Categorize(categorizeData);
    await categorize.save();
    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/close', async (req, res) => {
  try {
    const closeData = req.body;
    const close = new Close(closeData);
    await close.save();
    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/comprehension', async (req, res) => {
  try {
    const comprehensionData = req.body;
    const comprehension = new Comprehension(comprehensionData);
    await comprehension.save();
    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
