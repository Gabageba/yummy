---
name: Yummy Project Architecture Plan
overview: "Полный план архитектуры проекта Yummy: модели данных, страницы, API, модалки и фичи. Анализ текущего кода, рекомендации по изменениям и новому функционалу."
todos:
  - id: phase1-family
    content: "Фаза 1: Модель Family + CRUD API + inviteCode + FamilyPage с onboarding"
    status: in_progress
  - id: phase1-recipe
    content: "Фаза 1: Расширение модели Recipe (ingredients, steps, cookingTime, servings, sourceUrl) + RecipeDetailPage + обновленная RecipeModal"
    status: pending
  - id: phase2-meal-request
    content: "Фаза 2: Модель MealRequest + API + MainPage дашборд + MealRequestModal"
    status: pending
  - id: phase3-polish
    content: "Фаза 3: ProfilePage, SettingsPage, фильтры/поиск, AddDishesModal, адаптация Collection"
    status: pending
isProject: false
---

# Yummy -- Полный план проекта

## 1. Концепция и текущее состояние

**Идея**: Человек добавляет рецепты блюд, приглашает семью, и члены семьи могут выбирать, что хотят сегодня поесть.

**Что уже есть**: Auth (JWT), User (username/email/password), Dish (name/description/tags/difficulty/mainIngredients/collections/author), Collection (name/description/allowedUsers с ролями), базовые страницы (списки блюд и коллекций, детальная страница коллекции), модалки (создание/редактирование блюда и коллекции, привязка блюда к коллекциям).

**Ключевая проблема**: Нет главной фичи -- механизма выбора "что сегодня поесть". Нет понятия "семья/группа" как отдельной сущности. Страницы Main, Profile, Settings -- пустые заглушки. Модель блюда слишком скудная для рецепта. Нет приглашений.

---

## 2. Архитектура данных (модели)

### 2.1 User (изменить)

Текущая модель в [yummy-api/src/users/schemas/user.schema.ts](yummy-api/src/users/schemas/user.schema.ts) содержит только `username`, `email`, `password`.

**Добавить:**

- `displayName: string` -- отображаемое имя (например "Мама", "Папа", "Артём")
- `avatarColor: string` -- цвет аватара (для генерации буквенных аватаров, как сейчас)

`avatarUrl` с загрузкой фото пока можно не добавлять -- это усложнит проект (нужен S3/файловое хранилище). Буквенные аватары с цветом достаточны для MVP.

### 2.2 Family (новая сущность -- КЛЮЧЕВАЯ)

Сейчас роль "общего пространства" выполняет Collection с `allowedUsers`. Но концептуально **семья** и **коллекция рецептов** -- разные вещи. Семья -- это группа людей, которые вместе планируют еду. Коллекция -- способ организации рецептов внутри семьи.

**Схема Family:**

```
- name: string (required)           -- "Семья Ивановых"
- description: string               -- необязательное описание
- members: [{                       -- участники
    userId: ObjectId (ref: User),
    role: OWNER | MEMBER,           -- упрощенные роли
    joinedAt: Date
  }]
- inviteCode: string (unique)       -- код приглашения (6-8 символов)
- inviteCodeExpiresAt: Date         -- срок действия кода (опционально)
- createdAt: Date
```

**Роли:**

- `OWNER` -- создатель семьи. Может удалять семью, удалять участников, менять название
- `MEMBER` -- обычный участник. Может добавлять рецепты, голосовать, смотреть все

Роль `EDITOR` из текущей модели Collection -- лишняя для семьи. В контексте семьи все "редакторы" -- каждый может добавлять свои рецепты и редактировать только свои.

### 2.3 Recipe (переименовать Dish -> Recipe, значительно расширить)

Текущая модель Dish в [yummy-api/src/dishes/schemas/dish.schema.ts](yummy-api/src/dishes/schemas/dish.schema.ts) содержит: `name`, `description`, `tags[]`, `difficulty`, `mainIngredients[]`, `collections[]`, `author[]`.

**Новая схема Recipe:**

```
- name: string (required)                -- "Борщ"
- description: string                    -- краткое описание
- ingredients: [{                        -- ЗАМЕНЯЕТ mainIngredients
    name: string,                        -- "Свекла"
    amount: string,                      -- "2 шт" или "300 г" (свободный текст -- проще для пользователя)
  }]
- steps: [{                              -- НОВОЕ: шаги приготовления
    order: number,                       -- порядок шага
    text: string,                        -- описание шага
  }]
- cookingTime: number                    -- время готовки в минутах (НОВОЕ)
- servings: number                       -- кол-во порций (НОВОЕ)
- difficulty: EASY | MEDIUM | HARD       -- оставить
- tags: string[]                         -- оставить
- sourceUrl: string                      -- НОВОЕ: ссылка если рецепт из интернета
- familyId: ObjectId (ref: Family)       -- НОВОЕ: к какой семье относится
- authorId: ObjectId (ref: User)         -- ИЗМЕНИТЬ: один автор, не массив
- collections: ObjectId[]                -- оставить (коллекции внутри семьи)
- createdAt: Date
- updatedAt: Date
```

**Что убрать:**

- `author: ObjectId[]` -> `authorId: ObjectId` -- у рецепта один автор, а не массив. Если рецепт добавил конкретный человек -- он автор
- `mainIngredients: string[]` -> `ingredients: [{name, amount}]` -- более полная информация

**Что добавить:**

- `ingredients` с количеством вместо просто списка строк
- `steps` -- шаги приготовления (основа любого рецепта)
- `cookingTime` -- критически важно для выбора "что поесть" (я хочу что-то быстрое)
- `servings` -- на сколько человек
- `sourceUrl` -- если рецепт из интернета
- `familyId` -- привязка к семье

### 2.4 Collection (упростить)

Текущая модель в [yummy-api/src/collections/schemas/collections.schema.ts](yummy-api/src/collections/schemas/collections.schema.ts) содержит `name`, `description`, `allowedUsers[]`.

**Новая схема Collection:**

```
- name: string (required)            -- "Итальянская кухня", "Быстрые завтраки"
- description: string
- familyId: ObjectId (ref: Family)   -- принадлежит семье
- createdBy: ObjectId (ref: User)    -- кто создал
- coverIcon: CoverIconEnum           -- иконка обложки (уже есть на фронте)
```

**Что убрать:**

- `allowedUsers[]` -- доступ теперь определяется через Family. Кто в семье -- тот видит все коллекции семьи.

### 2.5 MealRequest -- "Хочу это сегодня" (НОВАЯ КЛЮЧЕВАЯ сущность)

Это главная фича проекта -- механизм выбора еды.

**Схема MealRequest:**

```
- familyId: ObjectId (ref: Family)     -- семья
- recipeId: ObjectId (ref: Recipe)     -- какое блюдо хотят (опционально)
- customText: string                   -- или свободный текст "Хочу что-нибудь мясное"
- userId: ObjectId (ref: User)         -- кто хочет
- date: Date                           -- на какой день
- mealType: BREAKFAST | LUNCH | DINNER | SNACK  -- тип приема пищи
- status: PENDING | APPROVED | DONE    -- статус
- createdAt: Date
```

**Логика:**

- Каждый член семьи может создать "запрос" на конкретный рецепт ("Хочу борщ на обед") или свободным текстом ("Хочу что-нибудь сладкое")
- Запрос привязан к дате и типу приема пищи
- Статусы: `PENDING` (запрошено), `APPROVED` (будем готовить), `DONE` (приготовлено)
- На главной странице видно, кто что хочет на сегодня

---

## 3. Страницы и UI

### 3.1 MainPage (Главная -- "Сегодня")

Сейчас: заглушка `"main"` в [yummy-web/src/pages/MainPage/index.tsx](yummy-web/src/pages/MainPage/index.tsx).

**Должна стать**: дашборд "Что едим сегодня?"

**Содержимое:**

- **Заголовок**: "Сегодня, 17 марта" (текущая дата)
- **Блок "Запросы семьи"**: карточки запросов от членов семьи, сгруппированные по типу приема пищи (Завтрак / Обед / Ужин / Перекус):
  - Аватар + имя ("Мама хочет Борщ на обед")
  - Если привязан рецепт -- ссылка на него
  - Если свободный текст -- просто текст
  - Статус (иконка: ожидание / одобрено / готово)
- **Кнопка "Хочу поесть"** (FAB или кнопка в шапке) -- открывает модалку создания запроса
- **Быстрые действия**: "Случайный рецепт" (рандомный рецепт из семьи)
- Если у пользователя нет семьи -- показать onboarding: "Создайте семью или присоединитесь"

### 3.2 Модалка "Хочу поесть" (MealRequestModal) -- НОВАЯ

**Поля:**

- **Тип приема пищи**: радио-группа (Завтрак / Обед / Ужин / Перекус)
- **Дата**: дейтпикер (по умолчанию -- сегодня)
- **Выбор рецепта**: поле поиска с автокомплитом по рецептам семьи ИЛИ...
- **Свободный текст**: текстовое поле "Или опишите, что хотите" (например "Что-нибудь легкое")
- **Кнопка "Отправить"**

### 3.3 RecipeDetailPage (Детальная страница рецепта) -- НОВАЯ

Сейчас: маршрут `/dishes/:id` определен в `RoutePath`, но страницы нет.

**Содержимое:**

- **Шапка**: название рецепта, автор (аватар + имя), теги
- **Мета-информация** (горизонтальная полоска):
  - Время готовки (иконка часов + "45 мин")
  - Порции (иконка тарелки + "4 порции")  
  - Сложность (текущий DifficultyLabel)
- **Секция "Ингредиенты"**: список с количеством
  - Чекбоксы для отметки "уже есть" (локальное состояние, без сохранения на сервер)
- **Секция "Приготовление"**: пронумерованные шаги
- **Источник**: ссылка на оригинал (если `sourceUrl` заполнен)
- **Действия** (в шапке): Редактировать, Удалить, Добавить в коллекцию, "Хочу это!"
- **Кнопка "Хочу это на обед/ужин"** -- быстрое создание MealRequest с этим рецептом

### 3.4 DishesList -> RecipesList (Список рецептов)

Сейчас: список карточек с блюдами. Работает, но нужно расширить.

**Добавить:**

- **Фильтры**: по сложности, по времени готовки ("до 30 мин", "30-60 мин", "больше часа"), по тегам
- **Сортировка**: по дате добавления, по имени, по времени готовки
- **Поиск**: поле поиска (эндпоинт `/dishes/search` уже есть на бэке, но не используется на фронте)
- В карточке рецепта показывать: время готовки, порции

### 3.5 CollectionsList (Список коллекций)

Работает. Небольшие дополнения:

- Показывать кол-во рецептов в каждой коллекции
- Иконки обложек (CoverIcon уже есть на фронте, но не используется в CollectionCard)

### 3.6 CollectionDetail (Детальная коллекция)

Работает в [yummy-web/src/pages/collections/Detail/index.tsx](yummy-web/src/pages/collections/Detail/index.tsx). Дополнения:

- **AddDishesModal** -- сейчас заглушка. Должна содержать: поиск по рецептам семьи с чекбоксами (аналогично DishCollectionsModal, но наоборот -- выбираем рецепты для коллекции)

### 3.7 FamilyPage (Страница семьи) -- НОВАЯ

**Маршрут**: `/family`

**Содержимое:**

- **Если нет семьи**: экран onboarding
  - Кнопка "Создать семью"
  - Поле "Ввести код приглашения" + кнопка "Присоединиться"
- **Если есть семья**:
  - Название семьи (редактируемое для OWNER)
  - Список участников: аватар + displayName + роль
  - Кнопка "Пригласить" -- показывает код приглашения (копировать в буфер) или генерирует новый
  - Для OWNER: кнопка удаления участника
  - Кнопка "Покинуть семью"

### 3.8 FamilyModal (Создание семьи) -- НОВАЯ

**Поля:**

- `name` (required) -- "Семья Ивановых"
- `description` -- необязательно

### 3.9 JoinFamilyModal (Присоединиться) -- НОВАЯ

**Поля:**

- `inviteCode` (required) -- код из 6-8 символов

### 3.10 ProfilePage (Профиль)

Сейчас: заглушка `"profile"` в [yummy-web/src/pages/ProfilePage/index.tsx](yummy-web/src/pages/ProfilePage/index.tsx).

**Содержимое:**

- Аватар (буквенный, большой)
- `displayName` -- редактируемое поле
- `username` -- отображение (не редактируемое или редактируемое с проверкой уникальности)
- `email` -- отображение
- Кнопка "Сменить пароль" -> модалка смены пароля
- Статистика: "Добавлено рецептов: 42", "В семье: Семья Ивановых"

### 3.11 SettingsPage (Настройки)

Сейчас: заглушка `"Settings"` в [yummy-web/src/pages/SettingsPage/index.tsx](yummy-web/src/pages/SettingsPage/index.tsx).

**Содержимое:**

- Переключение языка (ru / en) -- i18n уже настроен
- Переключение темы (светлая / темная) -- Ant Design поддерживает
- О приложении (версия)

### 3.12 DishModal -> RecipeModal (Создание/редактирование рецепта)

Сейчас в [yummy-web/src/pages/dishes/DishModal.tsx](yummy-web/src/pages/dishes/DishModal.tsx): name, description, tags, difficulty, mainIngredients.

**Новые поля (кроме существующих):**

- `cookingTime` -- числовой InputNumber с суффиксом "мин"
- `servings` -- числовой InputNumber
- `ingredients` -- динамический список (кнопка "Добавить ингредиент"):
  - Каждая строка: `name` (input) + `amount` (input, например "2 шт" или "300 г")
  - Кнопка удаления строки
- `steps` -- динамический список (кнопка "Добавить шаг"):
  - Каждая строка: номер шага (авто) + TextArea для описания
  - Drag-and-drop для перестановки (или кнопки вверх/вниз)
  - Кнопка удаления шага
- `sourceUrl` -- input для ссылки

Модалка станет большой, возможно стоит сделать её полноэкранной или drawer вместо модалки, либо степпер (шаги: 1. Основное, 2. Ингредиенты, 3. Приготовление).

---

## 4. API эндпоинты

### 4.1 Существующие (оставить, адаптировать)

- `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh` -- без изменений
- `GET /users/profile` -- добавить `displayName`, `avatarColor`, `familyId`
- `PUT /users/profile` -- НОВЫЙ: обновление профиля (displayName, avatarColor)
- `POST /recipes` (бывший `/dishes`) -- адаптировать под новую модель (ingredients, steps, cookingTime, servings, sourceUrl, familyId)
- `POST /recipes/list` -- добавить фильтры по familyId, cookingTime, difficulty
- `PUT /recipes/:id` -- адаптировать
- `DELETE /recipes/:id` -- без изменений
- `POST /recipes/search` -- без изменений
- CRUD коллекций -- адаптировать под familyId вместо allowedUsers

### 4.2 Новые эндпоинты

**Family:**

- `POST /families` -- создать семью
- `GET /families/my` -- моя семья (или 404 если нет)
- `PUT /families/:id` -- обновить семью (только OWNER)
- `DELETE /families/:id` -- удалить семью (только OWNER)
- `POST /families/join` -- присоединиться по inviteCode
- `POST /families/:id/leave` -- покинуть семью
- `DELETE /families/:id/members/:userId` -- удалить участника (только OWNER)
- `POST /families/:id/invite-code` -- сгенерировать новый код приглашения

**MealRequest:**

- `POST /meal-requests` -- создать запрос
- `POST /meal-requests/list` -- список запросов (по familyId + date)
- `PUT /meal-requests/:id` -- обновить статус (APPROVED / DONE)
- `DELETE /meal-requests/:id` -- удалить свой запрос

**Recipe (новые поверх существующих):**

- `GET /recipes/:id` -- получить полный рецепт (сейчас нет отдельного GET)
- `GET /recipes/random` -- случайный рецепт из семьи

---

## 5. Что лишнее / что изменить в текущем коде

### Убрать / изменить:

- `**allowedUsers` в Collection** -- заменить на `familyId`. Доступ определяется через принадлежность к семье, а не поюзерно
- `**AllowedUsersRoles` (CREATOR / EDITOR / VIEWER)** -- заменить на роли семьи (OWNER / MEMBER). Три роли для коллекции -- overkill
- `**author: ObjectId[]` в Dish** -- заменить на `authorId: ObjectId` (один автор)
- `**mainIngredients: string[]`** -- заменить на `ingredients: [{name, amount}]`
- `**CollectionActions` (EDIT / DELETE)** -- упростить: если ты в семье -- можешь редактировать коллекции. Если OWNER -- можешь удалять
- **Страница MorePage** -- сейчас дублирует функционал профиля/настроек на мобайле. Можно оставить, но привести в порядок после реализации Profile и Settings

### Что хорошо сделано и оставить:

- JWT авторизация с refresh токенами и blacklist
- RTK Query + axiosBaseQuery -- хороший подход
- Pageable механизм (PageableRequestParams, фильтры, сортировка) -- отлично
- CardsList с пагинацией -- универсальный компонент
- i18n с двумя языками
- Валидация через class-validator на бэке
- Responsive дизайн (breakpoints, mobile/desktop header)

---

## 6. Навигация

Текущая навигация: Main, Collections, Dishes, More.

**Предлагаемая:**

- **Сегодня** (/) -- дашборд с запросами на еду
- **Рецепты** (/recipes) -- список всех рецептов семьи
- **Коллекции** (/collections) -- тематические подборки
- **Семья** (/family) -- управление семьей, участники
- **Ещё** (/more) -- профиль, настройки, выход (мобайл)

---

## 7. Порядок реализации (рекомендация)

Фазы от самого важного к менее важному:

**Фаза 1 -- Семья и рецепты (ядро):**

1. Модель Family + CRUD + inviteCode
2. Расширение модели Recipe (ingredients, steps, cookingTime, servings, sourceUrl)
3. RecipeDetailPage
4. FamilyPage с onboarding
5. RecipeModal (расширенная форма)

**Фаза 2 -- Выбор еды (главная фича):**
6. Модель MealRequest + API
7. MainPage (дашборд "Сегодня")
8. MealRequestModal
9. Кнопка "Хочу это!" на странице рецепта

**Фаза 3 -- Доработки:**
10. ProfilePage
11. SettingsPage (язык, тема)
12. Фильтры и поиск на странице рецептов
13. AddDishesModal (довести до ума)
14. Адаптация Collection под familyId