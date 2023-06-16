import { Module } from '@nestjs/common';
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
  ],
  controllers: [AppController],
})
export class AppModule {}
