const express = require('express');
const app = express();
app.use(express.json());
const submission = require('./routes/submission');

app.use('/submit', submission);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
