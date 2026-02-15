/**
 * Скрипт очистки БД после переименования «меню» → «подборки».
 *
 * Выполняет:
 * 1. Удаляет коллекцию "menus" (старые данные, больше не используются).
 * 2. Удаляет поле "menus" у всех документов в коллекции "dishes"
 *    (чтобы не осталось ссылок на старую коллекцию).
 *
 * Запуск из корня yummy-api:
 *   npx ts-node scripts/clean-db.ts
 *
 * Либо с явной загрузкой .env:
 *   node -r dotenv/config node_modules/.bin/ts-node scripts/clean-db.ts
 *
 * Убедитесь, что в .env задана переменная MONGO_URI.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGO_URI = process.env.MONGO_URI;

async function cleanDb() {
  if (!MONGO_URI) {
    console.error('Ошибка: задайте MONGO_URI в .env');
    process.exit(1);
  }

  console.log('Подключение к MongoDB...');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  if (!db) {
    console.error('Нет подключения к БД');
    process.exit(1);
  }

  try {
    const collections = await db.listCollections().toArray();
    const hasMenus = collections.some((c) => c.name === 'menus');

    if (hasMenus) {
      await db.collection('menus').drop();
      console.log('Коллекция "menus" удалена.');
    } else {
      console.log('Коллекция "menus" не найдена, пропуск.');
    }

    const dishesResult = await db
      .collection('dishes')
      .updateMany({ menus: { $exists: true } }, { $unset: { menus: 1 } });
    if (dishesResult.modifiedCount > 0) {
      console.log(
        `У документов в "dishes" удалено поле "menus" (затронуто: ${dishesResult.modifiedCount}).`,
      );
    } else {
      console.log('Поле "menus" в "dishes" не найдено или уже удалено.');
    }
  } finally {
    await mongoose.disconnect();
    console.log('Отключение от MongoDB.');
  }
}

cleanDb().catch((err) => {
  console.error(err);
  process.exit(1);
});
