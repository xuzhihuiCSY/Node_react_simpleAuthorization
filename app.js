const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { sequelize } = require('./models');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
          return res.status(401).send('Invalid username or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).send('Invalid username or password');
      }

      res.json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).send('An error occurred during login');
  }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email'] 
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Failed to retrieve users');
    }
});

// Registration
app.post('/register', async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
      });
      const { password, ...userWithoutPassword } = newUser.dataValues;
      res.json(userWithoutPassword);
  } catch (error) {
      console.error('Registration error:', error);
      res.status(500).send(error.message);
  }
});

// logout route
app.post('/logout', (req, res) => {
    res.status(200).send('Logged out successfully');
});

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).send("Server is running!");
});

const PORT = process.env.PORT || 3002;

// Database synchronization and server startup
sequelize.sync().then(() => {
  console.log("Database synchronized");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to synchronize database:', error);
});
