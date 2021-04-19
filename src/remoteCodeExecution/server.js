const express = require('express');
const cors = require('cors');
const submission = require('./routes/submission');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/submission', submission);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
