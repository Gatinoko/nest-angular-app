import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT!) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'secret',
      database: process.env.DB_NAME || 'nestjs',
      autoLoadModels: true, // Automatically load models defined below
      synchronize: true, // Automatically create tables based on models
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
