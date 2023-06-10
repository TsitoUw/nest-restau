import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { IngredientCategoriesModule } from './ingredient-categories/ingredient-categories.module';
import { DishCategoriesModule } from './dish-categories/dish-categories.module';
import { DishesModule } from './dishes/dishes.module';
import { MenusModule } from './menus/menus.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    IngredientsModule,
    IngredientCategoriesModule,
    DishesModule,
    DishCategoriesModule,
    MenusModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
