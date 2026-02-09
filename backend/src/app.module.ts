import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudiosModule } from './studios/studios.module';
import { ServicesModule } from './services/services.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaService } from './prisma.service';

@Module({
    imports: [AuthModule, UsersModule, StudiosModule, ServicesModule, CategoriesModule, OrdersModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule { }
