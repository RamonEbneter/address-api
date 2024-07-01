const express = require('express');
const basicAuth = require('basic-auth');

const app = express();
const port = process.env.PORT || 5000;

// Mocked address data
const addresses = [
  { id: 1, firstName: "Claudio", lastName: "Hintermann", street: 'Abacusweg', streetNumber: "1", city: 'Appenzell', zip: '9050' },
  { id: 2, firstName: "Christian", lastName: "Meuli", street: 'Abacusweg', streetNumber: "19", city: 'Wil', zip: '9500' },
  { id: 3, firstName: "Ursula", lastName: "Beutter", street: 'Dorf', streetNumber: "1", city: 'Appenzell', zip: '9050' },
];

// Basic Authentication middleware
const auth = (req, res, next) => {
  const user = basicAuth(req);

  if (!user || user.name !== 'admin' || user.pass !== 'password') {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send('Authentication required.');
  }
  next();
};

// Get all addresses
app.get('/addresses', auth, (req, res) => {
  res.json(addresses);
});

// Get address by ID
app.get('/addresses/:id', auth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const address = addresses.find(addr => addr.id === id);

  if (!address) {
    return res.status(404).send('Address not found.');
  }

  res.json(address);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
