import { Sequelize } from 'sequelize';
import { config } from '../config/arora-db';
import log from './logger-plugin';

console.log(config);


// const sequelize = new Sequelize(
//   config.database.database || '',
//   config.database.user || '',
//   config.database.password,
//   {
//     host: config.database.host,
//     dialect:'mysql',
//     port: Number(config?.database?.port) || 3306,
//   }
// );

const sequelize = new Sequelize('gov_nodejs_backend', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});


const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate(); 
    log.debug('Database connected successfully');
    return { connected: true, databaseName: config.database.database, message: `Database connected successfully : ${config.database.database}` };
  } catch (error) {
    log.error('Unable to connect to the database:', error);
    return { connected: false, message: 'Database connection failed', error };
  }
};

export { sequelize, checkDatabaseConnection };
