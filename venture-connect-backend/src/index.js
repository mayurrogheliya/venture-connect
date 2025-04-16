import app from './app.js';
import sequelize from './config/database.js';

const port = process.env.PORT || 6000;

const ConnectDB = async () => {
  try {
    await sequelize.authenticate();
    //await sequelize.sync();
    await sequelize.sync({ alter: true });

    console.log('Database connected successfully.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Database connection failed: ', error);
  }
};

ConnectDB();
