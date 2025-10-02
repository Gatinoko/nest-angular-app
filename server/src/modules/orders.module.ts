import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from 'src/controllers/orders.controller';
import { Order } from 'src/models/order.model';
import { User } from 'src/models/user.model';
import { OrdersService } from 'src/services/orders.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, User])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
