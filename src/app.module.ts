import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { IngredientCategoriesModule } from './ingredient-categories/ingredient-categories.module';
import { DishCategoriesModule } from './dish-categories/dish-categories.module';
import { DishesModule } from './dishes/dishes.module';
import { MenusModule } from './menus/menus.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { InvoicesModules } from './invoices/invoices.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { PrismaModule } from './prisma/prisma.module';
import { MenusCategoriesModule } from './menus-categories/menus-categories.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AtGuard, RolesGuard } from './common/guards';
import { ErrorMiddleware } from './common/middlewares';
import { PrismaExceptionFilter } from './common/filters';
import { EnumsModule } from './enums/enums.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    IngredientsModule,
    IngredientCategoriesModule,
    DishesModule,
    DishCategoriesModule,
    OrdersModule,
    OrderItemsModule,
    MenusModule,
    InvoicesModules,
    PrismaModule,
    MenusCategoriesModule,
    EnumsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware).forRoutes('*');
  }
}
