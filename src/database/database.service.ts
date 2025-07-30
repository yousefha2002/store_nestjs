import { Sequelize } from 'sequelize-typescript';
import { Admin } from '../modules/admin/entities/admin.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '2838293yo',
        // password: '059283805928388',
        database: 'store_db',
      });
      sequelize.addModels([
        Admin,
      ]);
      await sequelize.sync({ alter: false });
      return sequelize;
    },
  },
];
