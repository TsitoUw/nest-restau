import { PrismaClient, Roles, OrderStatuses } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function cleanupAndSeed() {
  try {
    console.clear();
    // Delete existing data
    await prisma.orderItems.deleteMany();
    await prisma.orders.deleteMany();
    await prisma.invoices.deleteMany();
    await prisma.ingredients.deleteMany();
    await prisma.ingredientCategories.deleteMany();
    await prisma.dishes.deleteMany();
    await prisma.dishCategories.deleteMany();
    await prisma.menus.deleteMany();
    await prisma.menusCategories.deleteMany();
    await prisma.users.deleteMany();

    console.log('Existing data deleted.');

    // Run seed
    await seed();

    // Close Prisma connection
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
  }
}

async function seed() {
  try {
    // Users
    const hash = await bcrypt.hash('adminpassword', 10);
    const userData = [
      {
        username: 'admin',
        password: hash,
        role: Roles.ADMIN,
      },
      {
        role: Roles.CLIENT,
      },
    ];

    const createdUsers = [];

    for (const user of userData) {
      const createdUser = await prisma.users.create({
        data: user,
      });

      createdUsers.push(createdUser);
    }

    console.log('Users created:');
    console.log(createdUsers);

    // MenusCategories
    const menusCategoriesData = [
      { name: 'Appetizers' },
      { name: 'Main Courses' },
      { name: 'Desserts' },
    ];

    const createdMenusCategories = [];

    for (const category of menusCategoriesData) {
      const createdCategory = await prisma.menusCategories.create({
        data: category,
      });

      createdMenusCategories.push(createdCategory);
    }

    console.log('MenusCategories created:');
    console.log(createdMenusCategories);

    // Menus
    const menusData = [
      {
        name: 'Bruschetta',
        menusCategoriesId: createdMenusCategories[0].id,
      },
      {
        name: 'Spaghetti Bolognese',
        menusCategoriesId: createdMenusCategories[1].id,
      },
      {
        name: 'Tiramisu',
        menusCategoriesId: createdMenusCategories[2].id,
      },
    ];

    const createdMenus = [];

    for (const menu of menusData) {
      const createdMenu = await prisma.menus.create({
        data: menu,
      });

      createdMenus.push(createdMenu);
    }

    console.log('Menus created:');
    console.log(createdMenus);

    // Dishes
    const dishesData = [
      {
        name: 'Tomato and Basil Bruschetta',
        price: 8.99,
        menusId: createdMenus[0].id,
      },
      {
        name: 'Classic Spaghetti Bolognese',
        price: 12.99,
        menusId: createdMenus[1].id,
      },
      {
        name: 'Homemade Tiramisu',
        price: 7.99,
        menusId: createdMenus[2].id,
      },
    ];

    const createdDishes = [];

    for (const dish of dishesData) {
      const createdDish = await prisma.dishes.create({
        data: dish,
      });

      createdDishes.push(createdDish);
    }

    console.log('Dishes created:');
    console.log(createdDishes);

    // DishCategories
    const dishCategoriesData = [
      { name: 'Italian' },
      { name: 'Pasta' },
      { name: 'Desserts' },
    ];

    const createdDishCategories = [];

    for (const category of dishCategoriesData) {
      const createdCategory = await prisma.dishCategories.create({
        data: category,
      });

      createdDishCategories.push(createdCategory);
    }

    console.log('DishCategories created:');
    console.log(createdDishCategories);

    // IngredientCategories
    const ingredientCategoriesData = [
      { name: 'Vegetables' },
      { name: 'Meat' },
      { name: 'Dairy' },
    ];

    const createdIngredientCategories = [];

    for (const category of ingredientCategoriesData) {
      const createdCategory = await prisma.ingredientCategories.create({
        data: category,
      });

      createdIngredientCategories.push(createdCategory);
    }

    console.log('IngredientCategories created:');
    console.log(createdIngredientCategories);

    // Ingredients
    const ingredientsData = [
      {
        name: 'Tomatoes',
        categoryId: createdIngredientCategories[0].id,
      },
      {
        name: 'Basil',
        categoryId: createdIngredientCategories[0].id,
      },
      {
        name: 'Ground Beef',
        categoryId: createdIngredientCategories[1].id,
      },
      {
        name: 'Parmesan Cheese',
        categoryId: createdIngredientCategories[2].id,
      },
    ];

    const createdIngredients = [];

    for (const ingredient of ingredientsData) {
      const createdIngredient = await prisma.ingredients.create({
        data: ingredient,
      });

      createdIngredients.push(createdIngredient);
    }

    console.log('Ingredients created:');
    console.log(createdIngredients);

    // OrderItems
    const orderItemsData = [
      {
        quantity: 2,
        dishesId: createdDishes[0].id,
      },
      {
        quantity: 1,
        dishesId: createdDishes[1].id,
      },
      {
        quantity: 3,
        dishesId: createdDishes[2].id,
      },
    ];

    const createdOrderItems = [];

    for (const item of orderItemsData) {
      const createdItem = await prisma.orderItems.create({
        data: item,
      });

      createdOrderItems.push(createdItem);
    }

    console.log('OrderItems created:');
    console.log(createdOrderItems);

    // Orders
    const ordersData = [
      {
        status: OrderStatuses.PENDING,
        items: {
          connect: createdOrderItems.map((item) => ({ id: item.id })),
        },
      },
    ];

    const createdOrders = [];

    for (const order of ordersData) {
      const createdOrder = await prisma.orders.create({
        data: order,
      });

      createdOrders.push(createdOrder);
    }

    console.log('Orders created:');
    console.log(createdOrders);

    // Invoices
    const invoicesData = [
      {
        date: new Date(),
        orders: {
          connect: createdOrders.map((order) => ({ id: order.id })),
        },
        usersId: createdUsers[1].id,
      },
    ];

    const createdInvoices = [];

    for (const invoice of invoicesData) {
      const createdInvoice = await prisma.invoices.create({
        data: invoice,
      });

      createdInvoices.push(createdInvoice);
    }

    console.log('Invoices created:');
    console.log(createdInvoices);

    // Close Prisma connection
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
  }
}

cleanupAndSeed();
