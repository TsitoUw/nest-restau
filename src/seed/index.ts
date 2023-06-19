import { PrismaClient } from '@prisma/client';

const service = new PrismaClient();

async function seed() {
  // creating users
  const userAdmin = await service.users.create({
    data: {
      username: 'admin',
      password: 'administrator',
      role: 'ADMIN',
    },
  });

  const userJohn = await service.users.create({
    data: {
      username: 'john',
    },
  });

  console.log(userAdmin);
  console.log(userJohn);

  /********************************************************************************** */

  // creating ingredients categories
  const IClegume = await service.ingredientCategories.create({
    data: {
      name: 'Legume',
    },
  });

  const ICDairyProduct = await service.ingredientCategories.create({
    data: {
      name: 'Dairy product',
    },
  });

  /********************************************************************************** */

  // creating ingredients

  const ingredients = await service.ingredients.createMany({
    data: [
      {
        name: 'carrot',
        categoryId: IClegume.id,
      },
      {
        name: 'bean',
        categoryId: IClegume.id,
      },
      {
        name: 'peas',
        categoryId: IClegume.id,
      },
      {
        name: 'milk',
        categoryId: ICDairyProduct.id,
      },
      {
        name: 'cheese',
        categoryId: ICDairyProduct.id,
      },
      {
        name: 'yogurt',
        categoryId: ICDairyProduct.id,
      },
    ],
  });
  /********************************************************************************** */

  // creating menus categories

  // const menusCategories = await service.menusCategories.create()

  /********************************************************************************** */
  // reset
  await service.ingredientCategories.deleteMany();
  await service.users.deleteMany();
}

service.$connect();
seed();
service.$disconnect();
