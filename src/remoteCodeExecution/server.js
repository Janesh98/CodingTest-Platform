const express = require('express');
const submission = require('./routes/submission');

const app = express();
app.use(express.json());

app.use('/submission', submission);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
