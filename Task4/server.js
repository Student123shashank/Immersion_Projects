const express = require('express');
const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/travel', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/api/vehicles', vehicleRoutes);


app.get('/', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render('index', { vehicles });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', async (req, res) => {
  await Vehicle.create(req.body);
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render('edit', { vehicle });
});

app.post('/edit/:id', async (req, res) => {
  await Vehicle.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



