# FlowDesk

FlowDesk — production-like админ-панель SaaS-сервиса, созданная на Next.js, React, TypeScript, Prisma и SQLite.

Проект разрабатывается как сильный full-stack проект для портфолио и демонстрирует архитектуру реального SaaS-приложения: авторизацию, CRUD-сценарии, работу с API, базой данных, аналитикой, ролями и адаптивным интерфейсом.

## Возможности

- Dashboard с общей статистикой
- Управление пользователями
- Добавление, редактирование и удаление пользователей
- Поиск и фильтрация
- Управление подписками
- Просмотр платежей
- Аналитика на основе данных из базы
- График выручки
- Диаграмма распределения тарифов
- Настройки администратора
- Авторизация
- Защищённые admin-маршруты
- Роли пользователей
- Адаптивный sidebar
- Мобильная навигация
- Loading / Error / Empty состояния
- Prisma ORM
- SQLite
- Next.js API Route Handlers

## Стек

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite
- Auth.js / NextAuth
- Recharts
- Lucide React
- bcryptjs

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
```

## Архитектура

FlowDesk использует full-stack архитектуру:

```text
React UI
   ↓
Next.js Route Handlers
   ↓
Prisma ORM
   ↓
SQLite Database
```

Схема авторизации:

```text
Login
  ↓
Auth.js
  ↓
Проверка credentials
  ↓
Admin в базе данных
  ↓
JWT-сессия
  ↓
Защищённые маршруты /admin
```

## Пользователи

Раздел Users поддерживает:

- загрузку пользователей через API
- добавление пользователей
- редактирование пользователей
- удаление пользователей
- поиск
- фильтрацию по тарифу
- фильтрацию по статусу
- loading state
- error state
- empty state

Данные пользователей сохраняются в SQLite через Prisma.

## Подписки

Подписки связаны с пользователями через Prisma relation.

Поддерживаемые тарифы:

- Free
- Pro
- Business

Статусы подписки:

- Active
- Canceled
- Past Due

## Платежи

Платежи связаны с пользователями и подписками.

Поддерживаемые статусы:

- Succeeded
- Pending
- Failed
- Refunded

Денежные значения хранятся в базе в минимальных денежных единицах, чтобы избежать проблем с floating-point числами.

Например:

```text
$29.00 → 2900
$79.00 → 7900
```

## Аналитика

Analytics рассчитывается на основе реальных записей из базы данных.

Сейчас отображаются:

- общее количество пользователей
- активные подписки
- общая выручка
- неуспешные платежи
- выручка по месяцам
- распределение подписок по тарифам

Для визуализации используется Recharts.

## Настройки

В разделе Settings администратор может изменять:

- имя
- email
- название компании
- timezone

Настройки сохраняются в базе данных через API и Prisma.

## Авторизация

FlowDesk использует Auth.js с Credentials Provider.

Маршруты `/admin` защищаются на сервере.

Для локальной разработки используется тестовый администратор:

```text
Email: admin@flowdesk.dev
Password: FlowDesk123!
```

Тестовые credentials не предназначены для production-использования.

## Запуск проекта

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

Создать файл `.env`:

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secret"
```

Сгенерировать Prisma Client:

```bash
npx prisma generate
```

Применить миграции:

```bash
npx prisma migrate dev
```

Заполнить базу тестовыми данными:

```bash
npx prisma db seed
```

Запустить dev-сервер:

```bash
npm run dev
```

После запуска приложение будет доступно по адресу:

```text
http://localhost:3000
```

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

## База данных

Сейчас FlowDesk использует SQLite.

Основные модели Prisma:

- Admin
- User
- Subscription
- Payment

Связи:

```text
User
├── Subscription
└── Payments

Subscription
└── Payments
```

SQLite используется для удобной локальной разработки.

В production-проекте базу можно заменить на PostgreSQL.

## Production build

Для проверки production-сборки:

```bash
npm run build
```

Проект успешно проходит production build Next.js.

## Адаптивность

FlowDesk поддерживает адаптивный интерфейс.

На десктопе используется постоянный sidebar.

На мобильных устройствах sidebar скрывается и открывается через кнопку меню в Header.

Таблицы поддерживают горизонтальную прокрутку на небольших экранах.

## Безопасность

В проекте используются:

- хэширование паролей через bcryptjs
- Auth.js
- JWT-сессии
- серверная защита admin routes
- `.env` для секретных переменных
- проверка авторизации в API настроек

Файл `.env` не должен попадать в GitHub.

## Что можно улучшить в будущем

Возможные следующие этапы развития:

- PostgreSQL
- pagination
- sorting
- server-side filtering
- password reset
- дополнительные роли
- granular permissions
- audit logs
- notifications
- Stripe integration
- email notifications
- unit tests
- integration tests
- end-to-end tests
- Docker
- CI/CD
- dark mode

## Цель проекта

FlowDesk создаётся как portfolio-проект для демонстрации практических навыков full-stack разработки.

Основной акцент:

- архитектура React-компонентов
- TypeScript
- Next.js App Router
- API design
- работа с базой данных
- Prisma relations
- authentication
- authorization
- CRUD
- loading / error / empty состояния
- аналитика
- responsive UI
- production build
