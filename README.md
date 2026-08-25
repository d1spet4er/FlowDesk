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
