const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();
app.use(express.static(path.join(__dirname, '..', 'out')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'out', 'index.html'));
});
app.listen(port, () => console.log(`Static server running at http://localhost:${port}`));
