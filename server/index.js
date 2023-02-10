const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

app.use(express.json());
app.use(cors());
//Routes
// Post routes
const postRoutes = require('./routes/Posts');
app.use('/posts', postRoutes);

// Comments route
const commentsRoutes = require('./routes/Comments');
app.use('/comments', commentsRoutes);

// Authorization route
const authRoute = require('./routes/Users');
app.use('/auth', authRoute);

const PORT = 3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
