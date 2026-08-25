# FlowDesk

FlowDesk — full-stack SaaS admin dashboard, созданный на Next.js, TypeScript, Prisma, PostgreSQL и Auth.js.

Проект демонстрирует полноценную архитектуру административной панели: авторизацию, защищённые API, CRUD, подписки, платежи, аналитику, работу с базой данных, настройки администратора и адаптивный интерфейс.

## Live Demo

Проект доступен онлайн:

https://flow-desk-self.vercel.app

### Demo credentials

```text
Email: admin@flowdesk.dev
Password: FlowDesk123!
```

> Данные используются только для демонстрации возможностей проекта.

## Возможности

- Dashboard с общей статистикой
- Управление пользователями
- Добавление пользователей
- Редактирование пользователей
- Удаление пользователей
- Поиск и фильтрация
- Управление подписками
- Просмотр платежей
- Аналитика на основе реальных данных из базы
- График выручки
- Диаграмма распределения тарифов
- Настройки администратора
- Авторизация через Auth.js
- JWT-сессии
- Role-based access
- Защищённые `/admin` маршруты
- Защищённые API endpoints
- Loading / Error / Empty состояния
- Адаптивный sidebar
- Мобильная навигация
- Production deployment на Vercel
- PostgreSQL database

## Стек

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Recharts

### Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL
- Auth.js / NextAuth
- bcryptjs

### Deployment

- Vercel
- Prisma Postgres

## Структура проекта

```text
app/
├── admin/
│   ├── analytics/
│   ├── payments/
│   ├── settings/
│   ├── subscriptions/
│   └── users/
│
├── api/
│   ├── analytics/
│   ├── auth/
│   ├── payments/
│   ├── settings/
│   ├── subscriptions/
│   └── users/
│
├── components/
└── login/

lib/
├── prisma.ts
└── require-admin.ts

prisma/
├── migrations/
├── schema.prisma
└── seed.ts

types/
├── analytics.ts
├── next-auth.d.ts
├── payment.ts
├── settings.ts
├── subscription.ts
└── user.ts

auth.ts
prisma.config.ts
```

## Архитектура

FlowDesk использует full-stack архитектуру на основе Next.js App Router.

```text
React UI
   ↓
Next.js Route Handlers
   ↓
Authentication / Authorization
   ↓
Prisma ORM
   ↓
PostgreSQL
```

Основная логика приложения разделена между пользовательским интерфейсом, API endpoints, серверной авторизацией и базой данных.

## Авторизация

FlowDesk использует Auth.js с Credentials Provider.

Схема авторизации:

```text
Login
  ↓
Auth.js
  ↓
Проверка email и password
  ↓
Admin из PostgreSQL
  ↓
bcrypt password verification
  ↓
JWT session
  ↓
Protected admin area
```

Доступ к `/admin` разрешён только авторизованному пользователю с ролью:

```text
ADMIN
```

API административной панели также защищены отдельной серверной проверкой авторизации.

Без активной сессии защищённые endpoints возвращают:

```json
{
  "message": "Unauthorized"
}
```

## Пользователи

Раздел Users поддерживает полный CRUD:

- получение пользователей через API
- создание пользователя
- изменение пользователя
- удаление пользователя
- поиск
- фильтрацию по тарифу
- фильтрацию по статусу

Поддерживаемые статусы пользователей:

```text
Active
Inactive
Blocked
```

Поддерживаемые тарифы:

```text
Free
Pro
Business
```

Интерфейс также содержит:

- loading state
- error state
- empty state
- модальные окна
- подтверждение удаления

Все изменения сохраняются в PostgreSQL.

## Подписки

Каждый пользователь может иметь подписку.

Поддерживаемые тарифы:

- Free
- Pro
- Business

Статусы подписки:

- Active
- Canceled
- PastDue

Подписки связаны с пользователями через Prisma relations.

```text
User
  ↓
Subscription
```

## Платежи

Платежи связаны с пользователями и подписками.

Поддерживаемые статусы:

- Succeeded
- Pending
- Failed
- Refunded

Поддерживаемые методы:

- Card
- PayPal
- BankTransfer

Денежные значения хранятся в базе в минимальных денежных единицах.

Например:

```text
$29.00 → 2900
$79.00 → 7900
```

Такой подход позволяет избежать ошибок floating-point при работе с денежными значениями.

## Аналитика

Раздел Analytics использует реальные данные из PostgreSQL.

Отображаются:

- общее количество пользователей
- количество активных подписок
- общая выручка
- количество failed payments
- выручка за последние месяцы
- распределение пользователей по тарифам

Для визуализации данных используется Recharts.

## Настройки

В разделе Settings администратор может изменять:

- имя
- email
- название компании
- timezone

Изменения сохраняются через API в PostgreSQL.

Администратор определяется по ID из активной JWT-сессии.

## API

В проекте используются Next.js Route Handlers.

Основные endpoints:

```text
GET    /api/users
POST   /api/users

PUT    /api/users/:id
DELETE /api/users/:id

GET    /api/subscriptions

GET    /api/payments

GET    /api/analytics

GET    /api/settings
PUT    /api/settings

GET/POST /api/auth/[...nextauth]
```

Administrative API endpoints защищены проверкой сессии и роли пользователя.

## База данных

В production используется PostgreSQL.

Основные Prisma models:

```text
Admin
User
Subscription
Payment
```

Связи между моделями:

```text
Admin

User
├── Subscription
└── Payments

Subscription
├── User
└── Payments

Payment
├── User
└── Subscription
```

Prisma используется для:

- migrations
- database queries
- relations
- seed data
- type-safe database access

## Seed

Проект содержит seed-скрипт:

```text
prisma/seed.ts
```

Он создаёт тестового администратора, пользователей, подписки и платежи.

Demo administrator:

```text
Email: admin@flowdesk.dev
Password: FlowDesk123!
```

Пароль администратора хранится в базе в виде bcrypt hash.

## Адаптивность

FlowDesk поддерживает desktop и mobile интерфейсы.

На больших экранах используется фиксированный sidebar.

На мобильных устройствах:

- sidebar скрыт
- меню открывается по кнопке в Header
- sidebar отображается поверх страницы
- после выбора раздела меню автоматически закрывается
- таблицы поддерживают горизонтальную прокрутку

## Безопасность

В проекте используются:

- bcryptjs для хэширования паролей
- Auth.js
- JWT sessions
- серверная проверка `/admin`
- проверка роли ADMIN
- защищённые API endpoints
- environment variables
- PostgreSQL credentials через переменные окружения

Секретные данные не хранятся в GitHub.

Файлы:

```text
.env
.env.local
```

добавлены в `.gitignore`.

## Environment Variables

Для запуска проекта необходимы:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
AUTH_SECRET="your-secret"
```

`DATABASE_URL` используется приложением для подключения к PostgreSQL.

`DIRECT_URL` используется Prisma CLI для migrations и seed.

`AUTH_SECRET` используется Auth.js для работы с сессиями.

## Локальный запуск

Клонировать репозиторий:

```bash
git clone https://github.com/d1spet4er/FlowDesk.git
```

Перейти в папку проекта:

```bash
cd FlowDesk
```

Установить зависимости:

```bash
npm install
```

Создать `.env`:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
AUTH_SECRET="your-secret"
```

Сгенерировать Prisma Client:

```bash
npx prisma generate
```

Применить миграции:

```bash
npx prisma migrate deploy
```

Заполнить базу тестовыми данными:

```bash
npx prisma db seed
```

Запустить development server:

```bash
npm run dev
```

Приложение будет доступно:

```text
http://localhost:3000
```

## Production Build

Для проверки production build:

```bash
npm run build
```

После успешной сборки приложение можно запустить:

```bash
npm start
```

## Deployment

Production-версия FlowDesk размещена на Vercel.

Live Demo:

https://flow-desk-self.vercel.app

Production stack:

```text
Next.js
   ↓
Vercel
   ↓
Prisma
   ↓
PostgreSQL
```

Prisma Client автоматически генерируется после установки зависимостей:

```text
postinstall → prisma generate
```

## Что можно добавить в будущем

- pagination
- sorting
- server-side filtering
- password reset
- несколько административных ролей
- granular permissions
- audit logs
- notifications
- Stripe integration
- email notifications
- unit tests
- integration tests
- end-to-end tests
- Docker
- GitHub Actions / CI
- dark mode

## Цель проекта

FlowDesk создан как portfolio full-stack проект.

Основная цель — продемонстрировать практическую разработку SaaS admin dashboard, включая:

- Next.js App Router
- React
- TypeScript
- архитектуру компонентов
- REST-like API
- Prisma ORM
- PostgreSQL
- database relations
- authentication
- authorization
- CRUD
- работу с денежными данными
- аналитику
- loading / error / empty states
- responsive design
- production deployment