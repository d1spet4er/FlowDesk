"use client";

import { useState } from "react";


const users = [
  {
    name: "Алексей Смирнов",
    email: "alex@example.com",
    plan: "Pro",
    status: "Active",
    date: "Сегодня, 14:32",
  },
  {
    name: "Мария Иванова",
    email: "maria@example.com",
    plan: "Business",
    status: "Active",
    date: "Сегодня, 12:18",
  },
  {
    name: "Дмитрий Волков",
    email: "dmitry@example.com",
    plan: "Free",
    status: "Active",
    date: "Вчера, 19:42",
  },
  {
    name: "Анна Петрова",
    email: "anna@example.com",
    plan: "Pro",
    status: "Blocked",
    date: "Вчера, 16:11",
  },
  {
    name: "Илья Морозов",
    email: "ilya@example.com",
    plan: "Pro",
    status: "Active",
    date: "12 авг, 10:24",
  },
];

const navigation = [
  { name: "Dashboard", icon: "▦" },
  { name: "Пользователи", icon: "♙" },
  { name: "Подписки", icon: "◈" },
  { name: "Платежи", icon: "₽" },
  { name: "Аналитика", icon: "↗" },
];

export default function Home() {
  const [active, setActive] = useState("Dashboard");

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#17191c]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-[250px] flex-col border-r border-[#e5e7eb] bg-white lg:flex">
          <div className="flex h-[72px] items-center border-b border-[#e5e7eb] px-6">
            <div>
              <div className="text-[19px] font-bold tracking-[-0.03em]">
                FlowDesk
              </div>
              <div className="text-[11px] text-[#8a8f98]">
                Admin Console
              </div>
            </div>
          </div>

          <div className="flex-1 px-3 py-5">
            <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9ca1aa]">
              Основное
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActive(item.name)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition ${
                    active === item.name
                      ? "bg-[#111827] text-white"
                      : "text-[#626873] hover:bg-[#f3f4f6] hover:text-[#17191c]"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center text-[15px]">
                    {item.icon}
                  </span>

                  {item.name}
                </button>
              ))}
            </nav>

            <div className="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9ca1aa]">
              Система
            </div>

            <nav className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-[#626873] hover:bg-[#f3f4f6]">
                <span>⚙</span>
                Настройки
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-[#626873] hover:bg-[#f3f4f6]">
                <span>?</span>
                Помощь
              </button>
            </nav>
          </div>

          <div className="border-t border-[#e5e7eb] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111827] text-xs font-semibold text-white">
                АИ
              </div>

              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold">
                  Алексей Иванов
                </div>
                <div className="truncate text-[11px] text-[#8a8f98]">
                  Administrator
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex h-[72px] items-center justify-between border-b border-[#e5e7eb] bg-white px-5 sm:px-8">
            <div>
              <div className="text-[18px] font-semibold">
                {active}
              </div>
              <div className="text-[12px] text-[#8a8f98]">
                Управление платформой
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#626873] hover:bg-[#f8f9fa]">
                ♧
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
              </button>

              <button className="hidden h-9 items-center gap-2 rounded-lg border border-[#e5e7eb] px-3 text-[13px] font-medium sm:flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111827] text-[9px] text-white">
                  АИ
                </span>
                Алексей
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="p-5 sm:p-8">
            <div className="mx-auto max-w-[1400px]">
              {/* Welcome */}
              <div className="mb-7">
                <h1 className="text-[25px] font-bold tracking-[-0.03em]">
                  Добрый день, Алексей
                </h1>

                <p className="mt-1 text-[14px] text-[#737984]">
                  Вот что происходит с FlowDesk сегодня.
                </p>
              </div>

              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Пользователи"
                  value="1 248"
                  change="+12.5%"
                  positive
                  description="за последние 30 дней"
                />

                <StatCard
                  title="Активные подписки"
                  value="186"
                  change="+8.2%"
                  positive
                  description="по сравнению с прошлым месяцем"
                />

                <StatCard
                  title="Выручка"
                  value="₽842 560"
                  change="+18.7%"
                  positive
                  description="за текущий месяц"
                />

                <StatCard
                  title="Новые пользователи"
                  value="42"
                  change="+6.4%"
                  positive
                  description="за последние 24 часа"
                />
              </div>

              {/* Charts */}
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
                <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-[15px] font-semibold">
                        Выручка
                      </h2>
                      <p className="mt-1 text-[12px] text-[#8a8f98]">
                        Последние 7 месяцев
                      </p>
                    </div>

                    <button className="rounded-md border border-[#e5e7eb] px-2.5 py-1.5 text-[11px] text-[#626873]">
                      7 месяцев
                    </button>
                  </div>

                  <RevenueChart />
                </div>

                <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
                  <div>
                    <h2 className="text-[15px] font-semibold">
                      Подписки
                    </h2>

                    <p className="mt-1 text-[12px] text-[#8a8f98]">
                      Распределение тарифов
                    </p>
                  </div>

                  <div className="mt-7 flex items-center justify-center">
                    <div className="relative flex h-[190px] w-[190px] items-center justify-center rounded-full bg-[conic-gradient(#111827_0_55%,#6366f1_55%_82%,#e5e7eb_82%_100%)]">
                      <div className="flex h-[125px] w-[125px] flex-col items-center justify-center rounded-full bg-white">
                        <span className="text-[25px] font-bold">
                          186
                        </span>
                        <span className="text-[11px] text-[#8a8f98]">
                          подписок
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <PlanRow
                      name="Pro"
                      value="102"
                      percentage="55%"
                      color="bg-[#111827]"
                    />

                    <PlanRow
                      name="Business"
                      value="50"
                      percentage="27%"
                      color="bg-[#6366f1]"
                    />

                    <PlanRow
                      name="Free"
                      value="34"
                      percentage="18%"
                      color="bg-[#d1d5db]"
                    />
                  </div>
                </div>
              </div>

              {/* Users */}
              <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-white">
                <div className="flex flex-col gap-4 border-b border-[#e5e7eb] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-[15px] font-semibold">
                      Последние пользователи
                    </h2>

                    <p className="mt-1 text-[12px] text-[#8a8f98]">
                      Недавно зарегистрированные аккаунты
                    </p>
                  </div>

                  <button className="rounded-lg bg-[#111827] px-3.5 py-2 text-[12px] font-medium text-white hover:bg-[#252b36]">
                    Все пользователи
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#e5e7eb] bg-[#fafafa] text-left text-[11px] font-semibold uppercase tracking-wide text-[#8a8f98]">
                        <th className="px-5 py-3">Пользователь</th>
                        <th className="px-5 py-3">Тариф</th>
                        <th className="px-5 py-3">Статус</th>
                        <th className="px-5 py-3">Дата</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user.email}
                          className="border-b border-[#f0f1f3] last:border-0 hover:bg-[#fafafa]"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef0f3] text-[11px] font-semibold">
                                {user.name
                                  .split(" ")
                                  .map((word) => word[0])
                                  .join("")}
                              </div>

                              <div>
                                <div className="text-[13px] font-semibold">
                                  {user.name}
                                </div>

                                <div className="text-[11px] text-[#8a8f98]">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-md bg-[#f1f2f4] px-2 py-1 text-[11px] font-medium">
                              {user.plan}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                                user.status === "Active"
                                  ? "text-[#16803c]"
                                  : "text-[#c2410c]"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  user.status === "Active"
                                    ? "bg-[#22c55e]"
                                    : "bg-[#f97316]"
                                }`}
                              />

                              {user.status === "Active"
                                ? "Активен"
                                : "Заблокирован"}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-[12px] text-[#737984]">
                            {user.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Activity */}
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
                  <h2 className="text-[15px] font-semibold">
                    Последняя активность
                  </h2>

                  <div className="mt-5 space-y-5">
                    <Activity
                      title="Новая подписка"
                      description="Алексей Смирнов оформил Pro"
                      time="5 минут назад"
                    />

                    <Activity
                      title="Новый пользователь"
                      description="Мария Иванова создала аккаунт"
                      time="18 минут назад"
                    />

                    <Activity
                      title="Платёж получен"
                      description="Платёж на сумму ₽2 990"
                      time="34 минуты назад"
                    />

                    <Activity
                      title="Пользователь заблокирован"
                      description="Анна Петрова"
                      time="1 час назад"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
                  <h2 className="text-[15px] font-semibold">
                    Быстрые действия
                  </h2>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <QuickAction
                      title="Добавить пользователя"
                      description="Создать новый аккаунт"
                    />

                    <QuickAction
                      title="Создать тариф"
                      description="Добавить новый план"
                    />

                    <QuickAction
                      title="Посмотреть платежи"
                      description="История транзакций"
                    />

                    <QuickAction
                      title="Открыть аналитику"
                      description="Подробные показатели"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  change,
  description,
  positive,
}: {
  title: string;
  value: string;
  change: string;
  description: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
      <div className="text-[12px] text-[#737984]">{title}</div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="text-[25px] font-bold tracking-[-0.03em]">
          {value}
        </div>

        <span
          className={`mb-1 rounded-md px-2 py-1 text-[10px] font-semibold ${
            positive
              ? "bg-[#ecfdf3] text-[#16803c]"
              : "bg-[#fef2f2] text-[#dc2626]"
          }`}
        >
          {change}
        </span>
      </div>

      <div className="mt-2 text-[11px] text-[#9ca1aa]">
        {description}
      </div>
    </div>
  );
}

function PlanRow({
  name,
  value,
  percentage,
  color,
}: {
  name: string;
  value: string;
  percentage: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span>{name}</span>
      </div>

      <div className="flex items-center gap-4 text-[#737984]">
        <span>{value}</span>
        <span className="w-8 text-right">{percentage}</span>
      </div>
    </div>
  );
}

function Activity({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#111827]" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
          <span className="text-[12px] font-semibold">{title}</span>

          <span className="text-[10px] text-[#9ca1aa]">{time}</span>
        </div>

        <div className="mt-1 text-[11px] text-[#737984]">
          {description}
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <button className="rounded-lg border border-[#e5e7eb] p-4 text-left transition hover:border-[#cfd3d8] hover:bg-[#fafafa]">
      <div className="text-[12px] font-semibold">{title}</div>

      <div className="mt-1 text-[10px] text-[#8a8f98]">
        {description}
      </div>
    </button>
  );
}

function RevenueChart() {
  const points = "0,170 70,145 140,155 210,110 280,125 350,75 420,92 490,45 560,60 630,20";

  return (
    <div className="mt-7">
      <div className="relative h-[230px] w-full overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="border-t border-dashed border-[#e9eaec]" />
          <div className="border-t border-dashed border-[#e9eaec]" />
          <div className="border-t border-dashed border-[#e9eaec]" />
          <div className="border-t border-dashed border-[#e9eaec]" />
          <div className="border-t border-dashed border-[#e9eaec]" />
        </div>

        <svg
          viewBox="0 0 630 190"
          className="absolute bottom-0 left-0 h-[190px] w-full"
          preserveAspectRatio="none"
        >
          <polyline
            points={points}
            fill="none"
            stroke="#111827"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.split(" ").map((point, index) => {
            const [cx, cy] = point.split(",");

            return (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r="4"
                fill="white"
                stroke="#111827"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex justify-between text-[10px] text-[#9ca1aa]">
        <span>Фев</span>
        <span>Мар</span>
        <span>Апр</span>
        <span>Май</span>
        <span>Июн</span>
        <span>Июл</span>
        <span>Авг</span>
      </div>
    </div>
  );
}