import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { config } from './config.js';

dotenv.config();

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    dialect: 'postgres',
    port: config.database.port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Use false if using a self-signed certificate
      },
    },
  },
);

export default sequelize;
