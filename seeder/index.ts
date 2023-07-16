import {
  PrismaClient,
  Role,
  OrderStatus,
  IngredientUnit,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function cleanupAndSeed() {
  try {
    console.clear();
    // Delete existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.invoice.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.ingredientCategory.deleteMany();
    await prisma.dish.deleteMany();
    await prisma.dishCategory.deleteMany();
    await prisma.menus.deleteMany();
    await prisma.menusCategory.deleteMany();
    await prisma.user.deleteMany();

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
        role: Role.ADMIN,
      },
      {
        role: Role.CLIENT,
      },
    ];

    const createdUsers = [];

    for (const user of userData) {
      const createdUser = await prisma.user.create({
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
      const createdCategory = await prisma.menusCategory.create({
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
        description: 'lorem ipsum',
        price: 8.99,
        menusId: createdMenus[0].id,
      },
      {
        name: 'Classic Spaghetti Bolognese',
        description: 'lorem ipsum',
        price: 12.99,
        menusId: createdMenus[1].id,
      },
      {
        name: 'Homemade Tiramisu',
        description: 'lorem ipsum',
        price: 7.99,
        menusId: createdMenus[2].id,
      },
    ];

    const createdDishes = [];

    for (const dish of dishesData) {
      const createdDish = await prisma.dish.create({
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
      const createdCategory = await prisma.dishCategory.create({
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
      const createdCategory = await prisma.ingredientCategory.create({
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
        inStock: 20,
        unit: IngredientUnit.KG,
      },
      {
        name: 'Basil',
        categoryId: createdIngredientCategories[0].id,
        inStock: 50,
        unit: IngredientUnit.KG,
      },
      {
        name: 'Ground Beef',
        categoryId: createdIngredientCategories[1].id,
        inStock: 10,
        unit: IngredientUnit.KG,
      },
      {
        name: 'Parmesan Cheese',
        categoryId: createdIngredientCategories[2].id,
        inStock: 10,
        unit: IngredientUnit.KG,
      },
    ];

    const createdIngredients = [];

    for (const ingredient of ingredientsData) {
      const createdIngredient = await prisma.ingredient.create({
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
      const createdItem = await prisma.orderItem.create({
        data: item,
      });

      createdOrderItems.push(createdItem);
    }

    console.log('OrderItems created:');
    console.log(createdOrderItems);

    // Orders
    const ordersData = [
      {
        status: OrderStatus.PENDING,
        items: {
          connect: createdOrderItems.map((item) => ({ id: item.id })),
        },
      },
    ];

    const createdOrders = [];

    for (const order of ordersData) {
      const createdOrder = await prisma.order.create({
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
      const createdInvoice = await prisma.invoice.create({
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
