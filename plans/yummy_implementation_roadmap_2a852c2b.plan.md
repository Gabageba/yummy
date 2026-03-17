---
name: Yummy Implementation Roadmap
overview: Consolidated step-by-step implementation roadmap for Yummy, merging both architecture plans into concrete file-level tasks across 3 phases.
todos:
  - id: p1-user
    content: "1.1 User: add displayName, avatarColor to schema/dto/service/controller + PUT /users/profile + frontend usersApi update"
    status: pending
  - id: p1-family-backend
    content: "1.2 Family backend: schema, dto, repository, service, controller, module + register in app.module"
    status: pending
  - id: p1-family-frontend
    content: "1.2 Family frontend: familiesApi, models, FamilyPage (onboarding + member list), FamilyModal, JoinFamilyModal, InviteCodeBlock, route, translations"
    status: pending
  - id: p1-tags-ingredients
    content: 1.3 Tag + Ingredient backend modules (schema, repo, service, controller, module) + frontend APIs
    status: pending
  - id: p1-dish-backend
    content: "1.4 Dish backend: extend schema (ingredients refs, tags refs, category, cookingTime, servings, sourceUrl, steps, authorId, familyId), update DTOs, repository, service, add GET /dishes/:id + GET /dishes/random"
    status: pending
  - id: p1-dish-frontend-modal
    content: "1.4 Dish frontend: update models, dishesApi, convert DishModal to Drawer with ingredients Form.List, steps Form.List, tags Select, category Select"
    status: pending
  - id: p1-dish-detail-page
    content: "1.4 RecipeDetailPage: create Detail/index.tsx with full recipe view, add route for DISH_DETAIL, update DishCard"
    status: pending
  - id: p1-collections
    content: "1.5 Collections: remove allowedUsers, add familyId/createdBy/coverIcon, update backend + frontend"
    status: pending
  - id: p2-meal-requests
    content: "2.1 MealRequest: backend module + frontend API + MainPage dashboard + MealRequestModal + Hочу это button"
    status: pending
  - id: p2-favorites
    content: "2.2 Favorites: backend module + frontend API + heart toggle on DishCard and DetailPage"
    status: pending
  - id: p3-profile-settings
    content: 3.1-3.2 ProfilePage (displayName edit, stats) + SettingsPage (language, theme)
    status: pending
  - id: p3-filters-nav-i18n
    content: 3.3-3.6 Recipe filters/search, navigation update, translations, AddDishesModal implementation
    status: pending
isProject: false
---

# Yummy -- Подробный план действий

Консолидированный план на основе [v1](plans/yummy_project_architecture_plan_f2169f2e.plan.md) и [v2](yummy_updated_architecture_651012b6.plan.md).

---

## Фаза 1 -- Ядро

### 1.1 User -- расширение модели

**Бэкенд:**

- [yummy-api/src/users/schemas/user.schema.ts](yummy-api/src/users/schemas/user.schema.ts) -- добавить поля `displayName: string` (default: ''), `avatarColor: string` (default: '')
- [yummy-api/src/users/dto/user.dto.ts](yummy-api/src/users/dto/user.dto.ts) -- добавить `displayName`, `avatarColor` в DTO
- Создать `yummy-api/src/users/dto/update-profile.dto.ts` -- DTO для `PUT /users/profile` с полями `displayName?`, `avatarColor?`
- [yummy-api/src/users/users.service.ts](yummy-api/src/users/users.service.ts) -- добавить метод `updateProfile(userId, dto)`, обновить `getProfile` (возвращать новые поля)
- [yummy-api/src/users/users.repository.ts](yummy-api/src/users/users.repository.ts) -- добавить метод `updateProfile(id, data)`
- [yummy-api/src/users/users.controller.ts](yummy-api/src/users/users.controller.ts) -- добавить `@Put('profile')` с `@UserId()` декоратором

**Фронтенд:**

- [yummy-web/src/api/usersApi.ts](yummy-web/src/api/usersApi.ts) -- добавить `displayName`, `avatarColor` в `IUserProfile`, добавить mutation `updateProfile`

### 1.2 Family -- новый модуль

**Бэкенд -- создать модуль `yummy-api/src/families/`:**

- `models.ts` -- enum `FamilyMemberRole { OWNER, MEMBER }`
- `schemas/family.schema.ts` -- Mongoose schema: `name`, `description`, `members[{userId, role, joinedAt}]`, `inviteCode` (unique), `createdAt` (timestamps: true)
- `dto/family.dto.ts` -- ответ API: `id`, `name`, `description`, `members[{id, username, displayName, role, joinedAt}]`, `inviteCode`
- `dto/create-family.dto.ts` -- `name` (required), `description?`
- `dto/update-family.dto.ts` -- `name?`, `description?`
- `dto/join-family.dto.ts` -- `inviteCode` (required)
- `families.repository.ts` -- методы: `create`, `findByMemberId`, `findById`, `update`, `delete`, `addMember`, `removeMember`, `findByInviteCode`, `updateInviteCode`
- `families.service.ts` -- бизнес-логика: createFamily (генерация inviteCode из nanoid/crypto), getMyFamily, updateFamily (проверка OWNER), deleteFamily (проверка OWNER), joinByCode, leaveFamily, removeMember (проверка OWNER), regenerateInviteCode
- `families.controller.ts` -- эндпоинты:
  - `POST /families` -- создать (JWT)
  - `GET /families/my` -- моя семья (JWT)
  - `PUT /families/:id` -- обновить (JWT, OWNER)
  - `DELETE /families/:id` -- удалить (JWT, OWNER)
  - `POST /families/join` -- присоединиться по коду (JWT)
  - `POST /families/:id/leave` -- покинуть (JWT)
  - `DELETE /families/:id/members/:userId` -- удалить участника (JWT, OWNER)
  - `POST /families/:id/invite-code` -- новый код (JWT, OWNER)
- `families.module.ts` -- imports: MongooseModule.forFeature, AuthModule; exports: FamiliesRepository
- [yummy-api/src/app.module.ts](yummy-api/src/app.module.ts) -- добавить `FamiliesModule`

**Фронтенд -- Family:**

- Создать `yummy-web/src/pages/families/familiesApi.ts` -- RTK Query: `createFamily`, `getMyFamily`, `updateFamily`, `deleteFamily`, `joinFamily`, `leaveFamily`, `removeMember`, `regenerateInviteCode`
- Создать `yummy-web/src/pages/families/models.ts` -- интерфейсы `IFamily`, `IFamilyMember`, `ICreateFamilyPayload`, `IJoinFamilyPayload`, enum `FamilyMemberRole`
- Создать `yummy-web/src/pages/families/FamilyPage/index.tsx` -- страница:
  - Если `getMyFamily` вернул 404 -> экран onboarding (кнопка "Создать семью" + поле inviteCode + кнопка "Присоединиться")
  - Если есть семья -> название, описание, список участников (аватар + displayName + роль), кнопка "Пригласить" (копирование inviteCode), кнопка "Покинуть" (для MEMBER), кнопки удаления участников (для OWNER)
- Создать `yummy-web/src/pages/families/components/FamilyModal.tsx` -- модалка создания семьи: `name` (required), `description`
- Создать `yummy-web/src/pages/families/components/JoinFamilyModal.tsx` -- модалка присоединения: `inviteCode` (required)
- Создать `yummy-web/src/pages/families/components/InviteCodeBlock.tsx` -- блок с кодом приглашения и кнопкой копирования
- [yummy-web/src/routes/models.ts](yummy-web/src/routes/models.ts) -- добавить `FAMILY = '/family'`
- [yummy-web/src/routes/routes.ts](yummy-web/src/routes/routes.ts) -- добавить FamilyPage в `userRoutes`
- [yummy-web/src/components/core/PageLayout/headers/utils.tsx](yummy-web/src/components/core/PageLayout/headers/utils.tsx) -- добавить пункт "Семья" в навигацию (между Dishes и More), новая иконка
- Переводы: обновить `public/locales/ru/common.json` и `en/common.json` -- ключи для Family

### 1.3 Tag и Ingredient -- справочники

**Бэкенд -- модуль Tags (`yummy-api/src/tags/`):**

- `schemas/tag.schema.ts` -- `name` (required), `familyId` (ref: Family). Compound unique index `{name, familyId}`
- `dto/tag.dto.ts` -- `id`, `name`
- `dto/create-tag.dto.ts` -- `name` (required)
- `tags.repository.ts` -- `findAllByFamilyId`, `create`, `deleteById`, `findByNameAndFamilyId`
- `tags.service.ts` -- `getTagsByFamily(userId)` (определяет familyId через userId), `createTag(name, userId)`, `deleteTag(id, userId)`
- `tags.controller.ts`:
  - `GET /tags` -- все теги моей семьи (JWT)
  - `POST /tags` -- создать тег (JWT)
  - `DELETE /tags/:id` -- удалить (JWT)
- `tags.module.ts` -- imports: MongooseModule.forFeature, AuthModule, FamiliesModule

**Бэкенд -- модуль Ingredients (`yummy-api/src/ingredients/`):**

- `schemas/ingredient.schema.ts` -- `name` (required), `familyId` (ref: Family). Compound unique index `{name, familyId}`
- `dto/ingredient.dto.ts` -- `id`, `name`
- `dto/create-ingredient.dto.ts` -- `name` (required)
- `ingredients.repository.ts` -- `searchByFamilyId(familyId, query)`, `create`, `deleteById`, `findByNameAndFamilyId`
- `ingredients.service.ts` -- `searchIngredients(query, userId)`, `createIngredient(name, userId)`, `deleteIngredient(id, userId)`
- `ingredients.controller.ts`:
  - `GET /ingredients?query=мол` -- поиск ингредиентов моей семьи (JWT)
  - `POST /ingredients` -- создать (JWT)
  - `DELETE /ingredients/:id` -- удалить (JWT)
- `ingredients.module.ts`
- [yummy-api/src/app.module.ts](yummy-api/src/app.module.ts) -- добавить `TagsModule`, `IngredientsModule`

**Фронтенд:**

- Создать `yummy-web/src/pages/tags/tagsApi.ts` -- `getTags` (query), `createTag` (mutation)
- Создать `yummy-web/src/pages/ingredients/ingredientsApi.ts` -- `searchIngredients` (query с параметром `query`), `createIngredient` (mutation)

### 1.4 Dish (Recipe) -- расширение модели

**Бэкенд:**

- [yummy-api/src/dishes/models.ts](yummy-api/src/dishes/models.ts) -- добавить enum `DishCategory { BREAKFAST, FIRST, SECOND, SALAD, SOUP, DESSERT, DRINK, SNACK, OTHER }`
- [yummy-api/src/dishes/schemas/dish.schema.ts](yummy-api/src/dishes/schemas/dish.schema.ts) -- обновить схему:
  - Убрать: `mainIngredients`, `author` (массив)
  - Добавить: `ingredients[{ingredientId: ObjectId ref Ingredient, amount: string}]`, `steps[{order: number, text: string}]`, `cookingTime: number`, `servings: number`, `sourceUrl: string`, `category: DishCategory`, `familyId: ObjectId ref Family`, `authorId: ObjectId ref User` (один, не массив)
  - Добавить `timestamps: true`
  - Оставить: `name`, `description`, `difficulty`, `tags` (изменить тип на `ObjectId[] ref Tag`), `collections`
- [yummy-api/src/dishes/dto/create-and-update-dish.dto.ts](yummy-api/src/dishes/dto/create-and-update-dish.dto.ts) -- обновить DTO: убрать `mainIngredients`, добавить `ingredients[]`, `steps[]`, `cookingTime`, `servings`, `sourceUrl`, `category`
- [yummy-api/src/dishes/dto/dish.dto.ts](yummy-api/src/dishes/dto/dish.dto.ts) -- обновить: добавить новые поля, теги как `{id, name}[]` (populated), ингредиенты как `{ingredientId, ingredientName, amount}[]` (populated), `authorId`, `authorName`
- [yummy-api/src/dishes/dishes.repository.ts](yummy-api/src/dishes/dishes.repository.ts) -- обновить `mapper` (populate tags и ingredients), обновить `createDish`, `getDishesList` (фильтр по familyId вместо author), добавить метод `getDishById` с populate
- [yummy-api/src/dishes/dishes.service.ts](yummy-api/src/dishes/dishes.service.ts) -- обновить `createDish` (добавить familyId), обновить `getDishesList` (по familyId), обновить `checkDishAuthor` (использовать authorId), добавить метод `getDishById(id)`
- [yummy-api/src/dishes/dishes.controller.ts](yummy-api/src/dishes/dishes.controller.ts) -- добавить `@Get(':id')` для получения одного рецепта, добавить `@Get('random')` для случайного рецепта
- [yummy-api/src/dishes/dishes.module.ts](yummy-api/src/dishes/dishes.module.ts) -- добавить FamiliesModule в imports

**Фронтенд -- модели и API:**

- [yummy-web/src/pages/dishes/models.ts](yummy-web/src/pages/dishes/models.ts) -- обновить `IDish` (добавить `ingredients[{ingredientId, ingredientName, amount}]`, `steps[{order, text}]`, `cookingTime`, `servings`, `sourceUrl`, `category`, `authorId`, `authorName`, `tags` как `{id, name}[]`), обновить `IDishPayload`
- [yummy-web/src/pages/dishes/dishesApi.ts](yummy-web/src/pages/dishes/dishesApi.ts) -- добавить `getDish` (query, GET), `getRandomDish` (query, GET)

**Фронтенд -- RecipeModal (Drawer):**

- [yummy-web/src/pages/dishes/DishModal.tsx](yummy-web/src/pages/dishes/DishModal.tsx) -- переписать из Modal в Drawer. Три секции (можно Ant Design Steps или просто Divider):
  - **Основное:** name, description, category (Select), difficulty (radio), cookingTime (InputNumber), servings (InputNumber), sourceUrl (Input), tags (Select mode="multiple" с данными из `GET /tags` + возможность создания нового тега inline)
  - **Ингредиенты:** Form.List -- каждая строка: Select (ингредиент из справочника с поиском + "создать новый") + Input (amount) + кнопка удаления
  - **Приготовление:** Form.List -- каждая строка: авто-номер + TextArea + кнопка удаления. Кнопка "Добавить шаг"

**Фронтенд -- RecipeDetailPage:**

- Создать `yummy-web/src/pages/dishes/Detail/index.tsx`:
  - Использует `getDish(id)` -- полный рецепт
  - PageLayout с showBackButton
  - Шапка: название, автор (аватар + имя), теги (PrimaryTag)
  - Мета-блок: cookingTime (иконка часов), servings (иконка тарелки), DifficultyLabel, category
  - Секция "Ингредиенты": список `ingredientName -- amount` с чекбоксами (локальный useState)
  - Секция "Приготовление": нумерованные шаги
  - Ссылка на источник (если sourceUrl)
  - Кнопки: Редактировать (открывает Drawer), Удалить, Добавить в коллекцию, "Хочу это!"
- [yummy-web/src/routes/routes.ts](yummy-web/src/routes/routes.ts) -- добавить маршрут DISH_DETAIL -> DishDetail
- [yummy-web/src/components/dishes/DishCard/index.tsx](yummy-web/src/components/dishes/DishCard/index.tsx) -- обновить карточку: показывать cookingTime, servings, category; onClick -> navigate to detail page

### 1.5 Collection -- адаптация под Family

**Бэкенд:**

- [yummy-api/src/collections/schemas/collections.schema.ts](yummy-api/src/collections/schemas/collections.schema.ts) -- убрать `allowedUsers[]`, добавить `familyId: ObjectId ref Family`, `createdBy: ObjectId ref User`, `coverIcon: string`
- [yummy-api/src/collections/models.ts](yummy-api/src/collections/models.ts) -- убрать `AllowedUsersRoles`, `CollectionActions`. Оставить/упростить
- [yummy-api/src/collections/dto/collection.dto.ts](yummy-api/src/collections/dto/collection.dto.ts) -- убрать `allowedUsers`, `actions`, добавить `familyId`, `createdBy`, `coverIcon`
- [yummy-api/src/collections/dto/create-and-update-collection.dto.ts](yummy-api/src/collections/dto/create-and-update-collection.dto.ts) -- обновить
- [yummy-api/src/collections/collections.repository.ts](yummy-api/src/collections/collections.repository.ts) -- `getCollectionsList` фильтрует по familyId (не по allowedUsers), убрать `collectionMapper` с allowedUsers, убрать `getCollectionActions`
- [yummy-api/src/collections/collections.service.ts](yummy-api/src/collections/collections.service.ts) -- переделать проверки: вместо `checkCollectionUserRole` проверять принадлежность к семье. createCollection -- добавлять familyId и createdBy
- [yummy-api/src/collections/collections.module.ts](yummy-api/src/collections/collections.module.ts) -- добавить FamiliesModule в imports

**Фронтенд:**

- [yummy-web/src/pages/collections/List/models.ts](yummy-web/src/pages/collections/List/models.ts) -- убрать `AllowedUser`, `CollectionActions`, `allowedUsers`, `actions` из `ICollection`. Добавить `familyId`, `createdBy`, `coverIcon`
- [yummy-web/src/pages/ProfilePage/models.ts](yummy-web/src/pages/ProfilePage/models.ts) -- убрать `IUserRoles` (CREATOR/EDITOR/VIEWER), он больше не нужен
- [yummy-web/src/components/collections/CollectionCard/index.tsx](yummy-web/src/components/collections/CollectionCard/index.tsx) -- убрать логику actions через allowedUsers, упростить (все члены семьи могут edit, только createdBy может delete)
- [yummy-web/src/pages/collections/Detail/index.tsx](yummy-web/src/pages/collections/Detail/index.tsx) -- убрать allowedUsers логику
- [yummy-web/src/pages/collections/Detail/AddDishesModal.tsx](yummy-web/src/pages/collections/Detail/AddDishesModal.tsx) -- реализовать: поиск рецептов семьи с чекбоксами (аналог DishCollectionsModal "наоборот")
- [yummy-web/src/components/collections/CollectionModal.tsx](yummy-web/src/components/collections/CollectionModal.tsx) -- без существенных изменений

---

## Фаза 2 -- Выбор еды и избранное

### 2.1 MealRequest -- новый модуль

**Бэкенд -- создать `yummy-api/src/meal-requests/`:**

- `models.ts` -- enums: `MealType { BREAKFAST, LUNCH, DINNER, SNACK }`, `MealRequestStatus { PENDING, APPROVED, DONE }`
- `schemas/meal-request.schema.ts` -- `familyId`, `recipeId?`, `customText?`, `userId`, `date`, `mealType`, `status` (default: PENDING), timestamps
- `dto/meal-request.dto.ts` -- ответ: `id`, `familyId`, `recipe?: {id, name}` (populated), `customText`, `user: {id, username, displayName}` (populated), `date`, `mealType`, `status`
- `dto/create-meal-request.dto.ts` -- `recipeId?`, `customText?`, `date`, `mealType`
- `dto/update-meal-request-status.dto.ts` -- `status`
- `meal-requests.repository.ts` -- `create`, `findByFamilyAndDate(familyId, date)`, `updateStatus`, `deleteById`, `findById`
- `meal-requests.service.ts` -- бизнес-логика: создание (проверка членства в семье, валидация recipeId или customText), список по дате, обновление статуса, удаление (только свои)
- `meal-requests.controller.ts`:
  - `POST /meal-requests` -- создать (JWT)
  - `POST /meal-requests/list` -- список по дате (JWT), body: `{date, familyId}`
  - `PUT /meal-requests/:id` -- обновить статус (JWT)
  - `DELETE /meal-requests/:id` -- удалить свой (JWT)
- `meal-requests.module.ts`
- [yummy-api/src/app.module.ts](yummy-api/src/app.module.ts) -- добавить `MealRequestsModule`

**Фронтенд -- MealRequest:**

- Создать `yummy-web/src/pages/meal-requests/mealRequestsApi.ts` -- RTK Query
- Создать `yummy-web/src/pages/meal-requests/models.ts` -- интерфейсы, enums

**Фронтенд -- MainPage дашборд:**

- [yummy-web/src/pages/MainPage/index.tsx](yummy-web/src/pages/MainPage/index.tsx) -- полностью переписать:
  - Заголовок: "Сегодня, {дата}" (через Luxon, уже подключен)
  - Если нет семьи: onboarding блок (кнопки "Создать семью" / "Присоединиться")
  - Если есть семья: блоки по mealType (Завтрак/Обед/Ужин/Перекус), каждый содержит карточки MealRequest
  - Карточка MealRequest: аватар + displayName, текст ("хочет Борщ" или "хочет что-нибудь мясное"), статус (иконка), кнопки смены статуса
  - Кнопка "Хочу поесть" в actions PageLayout -> открывает MealRequestModal
  - Кнопка "Случайный рецепт" -> вызов `GET /dishes/random`

**Фронтенд -- MealRequestModal:**

- Создать `yummy-web/src/pages/meal-requests/components/MealRequestModal.tsx`:
  - mealType: Radio.Group (Завтрак/Обед/Ужин/Перекус)
  - date: DatePicker (default: сегодня)
  - Выбор рецепта: Select с поиском из `POST /dishes/search` по семье ИЛИ customText (TextArea)
  - Кнопка "Отправить"

**Фронтенд -- "Хочу это!" на RecipeDetailPage:**

- В `yummy-web/src/pages/dishes/Detail/index.tsx` -- добавить кнопку "Хочу это!", которая открывает MealRequestModal с предзаполненным recipeId

### 2.2 Favorite -- новый модуль

**Бэкенд -- создать `yummy-api/src/favorites/`:**

- `schemas/favorite.schema.ts` -- `userId` (ref: User), `recipeId` (ref: Dish), `createdAt`. Compound unique index `{userId, recipeId}`
- `dto/favorite.dto.ts` -- `id`, `recipeId`
- `favorites.repository.ts` -- `toggle(userId, recipeId)` (upsert/delete), `findByUserId(userId, params)` (pageable), `isFavorite(userId, recipeId)`, `getFavoriteRecipeIds(userId)` (для пометки в списке)
- `favorites.service.ts` -- `toggleFavorite`, `getMyFavorites`, `checkFavorite`
- `favorites.controller.ts`:
  - `POST /favorites/:recipeId` -- toggle (JWT)
  - `GET /favorites` -- мои избранные (JWT, pageable)
- `favorites.module.ts`
- [yummy-api/src/app.module.ts](yummy-api/src/app.module.ts) -- добавить `FavoritesModule`

**Фронтенд:**

- Создать `yummy-web/src/pages/favorites/favoritesApi.ts` -- `toggleFavorite` (mutation), `getMyFavorites` (query)
- [yummy-web/src/components/dishes/DishCard/index.tsx](yummy-web/src/components/dishes/DishCard/index.tsx) -- добавить иконку сердца (Heart) с toggle
- На RecipeDetailPage -- иконка сердца в шапке

---

## Фаза 3 -- Доработки

### 3.1 ProfilePage

- [yummy-web/src/pages/ProfilePage/index.tsx](yummy-web/src/pages/ProfilePage/index.tsx) -- реализовать: большой аватар, editable displayName (PUT /users/profile), username/email отображение, "В семье: {name}", "Рецептов: {count}", кнопка "Сменить пароль"

### 3.2 SettingsPage

- [yummy-web/src/pages/SettingsPage/index.tsx](yummy-web/src/pages/SettingsPage/index.tsx) -- реализовать: Select для языка (i18n.changeLanguage), Switch для темы (Ant Design ConfigProvider algorithm), версия приложения

### 3.3 Фильтры и поиск рецептов

- [yummy-web/src/pages/dishes/List/index.tsx](yummy-web/src/pages/dishes/List/index.tsx) -- добавить блок фильтров над CardsList:
  - Input.Search -- поиск по названию (параметр `query`)
  - Select -- фильтр по category (enum)
  - Select -- фильтр по difficulty (enum)
  - Select -- фильтр по тегам (данные из `GET /tags`, mode="multiple")
  - Radio.Group -- время готовки ("Любое" / "до 30 мин" / "30-60 мин" / "60+ мин")
  - Switch -- "Только избранное"
- Использовать существующий Pageable механизм с `filters[]` и `sort[]`

### 3.4 Навигация

- [yummy-web/src/components/core/PageLayout/headers/utils.tsx](yummy-web/src/components/core/PageLayout/headers/utils.tsx) -- обновить MENU_ITEMS:
  - Сегодня (/) -- HomeIcon
  - Рецепты (/dishes) -- TrayIcon
  - Коллекции (/collections) -- FolderIcon
  - Семья (/family) -- новая иконка (SmileFaceIcon или UserIcon)
  - Ещё (/more) -- MenuIcon (только мобайл)
- Desktop: 4 пункта (без "Ещё"). Mobile: 5 пунктов

### 3.5 Переводы

- `public/locales/ru/common.json` -- добавить ключи: family, createFamily, joinFamily, inviteCode, copyInviteCode, leaveFamily, removeMember, owner, member, today, breakfast, lunch, dinner, snack, wantToEat, mealRequest, pending, approved, done, randomRecipe, favorites, addToFavorites, removeFromFavorites, category, cookingTime, servings, minutes, portions, steps, ingredients, addIngredient, addStep, sourceUrl, recipe, и т.д.
- `public/locales/en/common.json` -- аналогичные ключи на английском
- `public/locales/ru/validation.json` и `en/validation.json` -- добавить ключи для валидации новых полей

### 3.6 AddDishesModal

- [yummy-web/src/pages/collections/Detail/AddDishesModal.tsx](yummy-web/src/pages/collections/Detail/AddDishesModal.tsx) -- реализовать по аналогии с DishCollectionsModal но "наоборот": поиск рецептов семьи, чекбоксы для добавления в коллекцию, infinite scroll

