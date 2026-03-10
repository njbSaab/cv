# BotAdminPanel — Полная документация функционала

## 📋 Оглавление

1. [Общее описание](#общее-описание)
2. [Технологический стек](#технологический-стек)
3. [Структура приложения](#структура-приложения)
4. [Функциональные модули](#функциональные-модули)
5. [API и конфигурация](#api-и-конфигурация)
6. [Маршрутизация](#маршрутизация)
7. [Компоненты и UI](#компоненты-и-ui)
8. [Развёртывание](#развёртывание)

---

## 📌 Общее описание

**BotAdminPanel** — это административная панель для управления Telegram-ботом, написанная на **Angular 18**. Приложение предоставляет полный цикл управления:

- Настройка бота (приветствия, меню, кнопки)
- Управление пользователями (бот и сайта)
- Email-маркетинг (рассылки, шаблоны, история)
- События и лендинги (создание, редактирование, статистика)
- Quiz-система (викторины с email-цепочками)
- Push-уведомления
- Управление медиа (изображения)
- Обучающие материалы

---

## 🛠 Технологический стек

| Категория | Технология | Версия |
|-----------|------------|--------|
| **Framework** | Angular | 18.1.2 |
| **Language** | TypeScript | 5.5.2 |
| **Styling** | Tailwind CSS | 3.4.17 |
| **UI Framework** | DaisyUI | 4.12.22 |
| **PostCSS** | @tailwindcss/postcss | 4.1.7 |
| **State Management** | RxJS | 7.8.0 |
| **Forms** | Angular FormsModule | 18.1.0 |
| **HTTP** | Angular HttpClientModule | 18.1.0 |
| **Build Tool** | Angular CLI | 18.1.2 |
| **Testing** | Karma + Jasmine | 6.4.0 / 5.1.0 |
| **Containerization** | Docker (Nginx:alpine) | — |

---

## 📁 Структура приложения

```
bot-admin-panel/
├── src/
│   ├── app/
│   │   ├── admin/                    # Lazy-loaded модуль админки
│   │   │   ├── admin.module.ts
│   │   │   ├── admin-routing.module.ts
│   │   │   ├── pages/                # Страницы админки
│   │   │   │   ├── admin-page/       # Главная страница админки
│   │   │   │   ├── add-button/       # Добавление кнопок
│   │   │   │   ├── push/             # Push-уведомления
│   │   │   │   ├── users/            # Пользователи бота
│   │   │   │   ├── site-users/       # Пользователи сайта
│   │   │   │   ├── email-sent/       # Email-рассылки
│   │   │   │   │   ├── emails-table/
│   │   │   │   │   ├── email-template-editor/
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── users-table/
│   │   │   │   │   │   └── send-mode-tabs/
│   │   │   │   ├── events-sites/     # События и лендинги
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── event-create/
│   │   │   │   │   │   ├── event-edit/
│   │   │   │   │   │   ├── event-view/
│   │   │   │   │   │   ├── event-email-push/
│   │   │   │   │   │   └── app-countdown-timer/
│   │   │   │   ├── images/           # Управление изображениями
│   │   │   │   │   ├── image-upload/
│   │   │   │   │   └── images-table/
│   │   │   │   ├── quiz/             # Quiz-система
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   ├── quiz-form/
│   │   │   │   │   │   ├── email-template-editor/
│   │   │   │   │   │   ├── email-editor-container/
│   │   │   │   │   │   ├── chain-email-editor/
│   │   │   │   │   │   └── view-page/
│   │   │   │   │   └── quiz-preview/
│   │   │   │   └── tutorials/        # Обучающие материалы
│   │   │   └── components/           # Переиспользуемые компоненты
│   │   │       ├── tab/              # Вкладки функционала
│   │   │       │   ├── greeting-bot/
│   │   │       │   ├── posts-bot/
│   │   │       │   ├── menu-buttons/
│   │   │       │   ├── main-buttons-menu/
│   │   │       │   ├── news-bot/
│   │   │       │   └── news-category/
│   │   │       └── ui/               # UI-компоненты
│   │   │           ├── popup-edit/
│   │   │           ├── inline-buttons/
│   │   │           ├── edit-btn-main/
│   │   │           └── edit-btn-icon/
│   │   ├── shared/                   # Общий модуль
│   │   │   ├── shared.module.ts
│   │   │   ├── components/           # Переиспользуемые компоненты
│   │   │   ├── services/             # Сервисы (API, auth, etc.)
│   │   │   ├── pipes/                # Кастомные пайпы
│   │   │   └── utils/                # Утилиты
│   │   ├── guards/                   # Guards для маршрутов
│   │   │   └── auth.guard.ts
│   │   ├── interfaces/               # TypeScript интерфейсы
│   │   ├── data/                     # Статические данные
│   │   │   └── template-letters.ts
│   │   ├── event-edit/               # Редактор событий
│   │   ├── main-page/                # Главная страница
│   │   │   └── main/
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   └── assets/                   # Статические ресурсы
│   ├── environments/
│   │   └── environment.ts            # Конфигурация окружения
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── .env                              # Переменные окружения
├── angular.json
├── tailwind.config.js
├── Dockerfile
└── package.json
```

---

## 🎯 Функциональные модули

### 1. **Настройка бота** (`/admin`)

#### GreetingBotComponent
- Редактирование приветственного сообщения бота
- Настройка текста приветствия
- Предпросмотр сообщения

#### MenuButtonsComponent
- Управление основными кнопками меню бота
- Добавление/удаление кнопок
- Редактирование названий и действий

#### MainButtonsMenuComponent
- Конфигурация главного меню
- Порядок кнопок
- Иконки кнопок

#### InlineButtonsComponent
- Настройка inline-кнопок
- Привязка действий к кнопкам
- Callback данные

#### PostsBotComponent
- Управление постами бота
- Создание и редактирование постов
- Планирование публикаций

#### NewsBotComponent
- Управление новостной лентой
- Категории новостей

#### NewsCategoryComponent
- Создание и редактирование категорий
- Иерархия категорий

---

### 2. **Управление пользователями**

#### UsersComponent (`/admin/users`)
- Просмотр всех пользователей бота
- Таблица пользователей с фильтрацией
- Статистика по пользователям
- Экспорт данных

#### SiteUsersComponent (`/admin/site-users`)
- Пользователи сайта (зарегистрированные)
- Разграничение прав доступа
- История активностей

---

### 3. **Email-маркетинг** (`/admin/email-sent`)

#### EmailSentComponent
- Главная страница email-рассылок
- История всех отправленных писем
- Статусы отправок

#### EmailsTableComponent
- Таблица отправленных писем
- Фильтрация по дате, статусу, получателю
- Детали каждой рассылки

#### EmailTemplateEditorComponent
- Визуальный редактор шаблонов
- Подстановка переменных (`{{name}}`, `{{email}}`, etc.)
- Предпросмотр шаблона
- Сохранение версий шаблонов

#### SendModeTabsComponent
- Выбор режима отправки:
  - Мгновенная отправка
  - Отложенная отправка
  - По расписанию

#### UsersTableComponent
- Выбор получателей рассылки
- Сегментация аудитории
- Предпросмотр списка получателей

---

### 4. **События и лендинги** (`/admin/events`)

#### EventsSitesComponent
- Список всех событий
- Статусы событий (активно, завершено, запланировано)

#### EventCreateComponent
- Создание нового события
- Заполнение основной информации
- Настройка лендинга

#### EventEditComponent
- Редактирование существующего события
- Изменение дат, описания, настроек
- Предпросмотр лендинга

#### EventViewComponent
- Просмотр деталей события
- Статистика участия
- Управление регистрациями

#### EventEmailPushComponent
- Email-уведомления о событии
- Напоминания участникам
- Изменения в событии

#### CountdownTimerComponent
- Таймер обратного отсчёта до события
- Настройка отображения
- Интеграция с лендингом

---

### 5. **Quiz-система** (`/admin/quiz`)

#### QuizComponent
- Главная страница викторин
- Список всех quiz'ов
- Статистика прохождений

#### QuizPreviewComponent
- Предпросмотр викторины
- Тестирование перед публикацией

#### QuizFormComponent
- Создание/редактирование викторины
- Добавление вопросов
- Настройка вариантов ответов
- Правильные ответы

#### ViewPageComponent
- Настройка страницы результатов
- Отображение после прохождения

#### EmailTemplatePreviewComponent
- Предпросмотр email-шаблонов для quiz

#### EmailEditorContainerComponent
- Контейнер для редактора писем
- Интеграция с шаблонами

#### QuizEmailTemplateEditorComponent
- Редактор шаблонов для quiz-рассылок
- Переменные для результатов

#### ChainEmailEditorComponent
- Настройка цепочки писем
- Автоматические письма после прохождения
- Дрип-кампании

---

### 6. **Push-уведомления** (`/admin/push`)

#### PushComponent
- Создание push-уведомлений
- Выбор аудитории
- Планирование отправки
- История отправленных push'ей

---

### 7. **Управление изображениями** (`/admin/images`)

#### ImagesComponent
- Главная страница медиа-библиотеки

#### ImageUploadComponent
- Загрузка изображений
- Drag & Drop
- Прогресс загрузки

#### ImagesTableComponent
- Таблица всех изображений
- Предпросмотр
- Редактирование метаданных
- Удаление изображений

---

### 8. **Обучающие материалы** (`/admin/tutorials`)

#### TutorialsComponent
- Создание туториалов
- Управление контентом
- Публикация для пользователей

---

### 9. **Дополнительные компоненты**

#### AddButtonComponent
- Быстрое добавление кнопок
- Универсальный интерфейс

#### PopupEditComponent
- Всплывающие окна редактирования
- Inline-редактирование

#### EditBtnMainComponent / EditBtnIconComponent
- Кнопки редактирования с иконками
- Быстрые действия

---

## 🔌 API и конфигурация

### Переменные окружения (`.env`)

```bash
AUTH_EMAIL=admin-bot-1x
AUTH_PASSWORD=tJfB59iWxAXL
AUTH_API_URL=https://vi.devsmm.pro/api/
AUTH_BASE_URL=https://vi.devsmm.pro/
```

### Конфигурация окружения (`environment.ts`)

| Параметр | Значение | Описание |
|----------|----------|----------|
| `apiUrl` | `https://vicyber.devsmm.pro/api/` | Основной API |
| `baseUrl` | `https://vicyber.devsmm.pro` | Базовый URL |
| `imageUrl` | `https://vicyber.devsmm.pro` | URL для изображений |
| `apiUrlEventLandings` | Cloudflare Workers | API лендингов событий |
| `apiUrlEvents` | Cloudflare Workers | API событий |
| `apiUrlEventsStatistics` | Cloudflare Workers | Статистика событий |
| `secret` | `1xjap-admin` | Секретный ключ API |
| `domenUrl` | `https://1xjap.com/` | Основной домен проекта |
| `localQuiz` | `https://vicyber.devsmm.pro` | Quiz-сервис |
| `adminSecretQuiz` | `top4winner-admin-qusmmcyber` | Quiz-секрет |
| `geo` | `vi` | Гео-регион |
| `emailServiceUrl` | `http://localhost:3500` | Email-сервис |
| `app` | `qusmmcyber-vi` | Идентификатор приложения |
| `emailDomein` | `https://1xjap.com` | Email-домен |

### Поддерживаемые гео-регионы

- **VN** (Вьетнам) — `vietget.online`
- **KR** (Корея) — `1xarea.com`
- **JP** (Япония) — `1xjet.jp`
- **VI** (Вьетнам Cyber) — `1xjap.com`

---

## 🛣 Маршрутизация

### Основной роутинг (`app-routing.module.ts`)

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/` | `MainComponent` | Главная страница |
| `/admin` | `AdminModule` (lazy) | Админ-панель |
| `**` | Redirect to `/` | 404 → главная |

### Роутинг админки (`admin-routing.module.ts`)

| Путь | Компонент | Описание |
|------|-----------|----------|
| `/admin` | `AdminPageComponent` | Дашборд админки |
| `/admin/add-button` | `AddButtonComponent` | Добавление кнопок |
| `/admin/push` | `PushComponent` | Push-уведомления |
| `/admin/users` | `UsersComponent` | Пользователи бота |
| `/admin/site-users` | `SiteUsersComponent` | Пользователи сайта |
| `/admin/email-sent` | `EmailSentComponent` | Email-рассылки |
| `/admin/events` | `EventsSitesComponent` | События |
| `/admin/quiz` | `QuizComponent` | Викторины |
| `/admin/tutorials` | `TutorialsComponent` | Туториалы |
| `/admin/images` | `ImagesComponent` | Изображения |

### Guards

- **AuthGuard** — защита маршрутов `/admin`, требует авторизации

---

## 🧩 Компоненты и UI

### Стилистика
- **Tailwind CSS** — утилитарные классы
- **DaisyUI** — готовые UI-компоненты (кнопки, формы, модальные окна, таблицы)

### UI-паттерны

| Компонент | Назначение |
|-----------|------------|
| `PopupEditComponent` | Модальные окна редактирования |
| `InlineButtonsComponent` | Inline-кнопки для таблиц |
| `EditBtnMainComponent` | Кнопка главного действия |
| `EditBtnIconComponent` | Кнопка с иконкой |
| `SendModeTabsComponent` | Табы выбора режима |
| `CountdownTimerComponent` | Таймер обратного отсчёта |

### Формы
- Angular `FormsModule` (template-driven forms)
- Валидация на уровне компонентов

---

## 🚀 Развёртывание

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm start
# или
ng serve

# Сборка проекта
npm run build

# Watch-режим
npm run watch

# Тесты
npm test
```

### Production-сборка

```bash
npm run build
# Выполняет:
# 1. node set-env.js (генерация environment)
# 2. ng build --configuration production
```

### Docker-развёртывание

```dockerfile
# Dockerfile
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY dist/bot-admin-panel/browser /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
```

**Сборка и запуск:**

```bash
# Сборка
npm run build

# Docker build
docker build -t bot-admin-panel .

# Docker run
docker run -p 80:80 -p 443:443 bot-admin-panel
```

---

## 📊 Архитектурные принципы

1. **Lazy Loading** — модуль админки загружается только при переходе
2. **Guard Protection** — все админ-маршруты защищены `AuthGuard`
3. **Shared Module** — переиспользуемые компоненты в одном модуле
4. **Feature Modules** — каждый функциональный блок в отдельном модуле
5. **Environment Configuration** — конфигурация через `environment.ts`
6. **Hash-based Routing** — маршрутизация с хэшем (`useHash: true`)

---

## 📝 Планы развития (архитектурный файл `architecture.fsd.txt`)

Проект следует принципам **Feature-Sliced Design**:

- **entities/** — бизнес-сущности (Event, User, EmailTemplate)
- **features/** — пользовательские сценарии (greeting-bot, event-edit)
- **widgets/** — крупные блоки (sidebar, data-table)
- **pages/** — композиционные страницы
- **shared/** — общая инфраструктура (API, UI-kit, утилиты)

---

## 🔐 Безопасность

- Авторизация через `AUTH_EMAIL` / `AUTH_PASSWORD`
- Секретные ключи API для каждого сервиса
- Guard-защита админ-маршрутов
- Разделение прав (бот пользователи / сайт пользователи)

---

## 📞 Контакты и поддержка

Документация создана на основе анализа кодовой базы проекта.

**Версия документации:** 1.0  
**Дата обновления:** Март 2026



# Instruction Bot Project Documentation

## 📝 Обзор проекта (Project Overview)

**Instruction Bot** — это многофункциональный Telegram-бот, разработанный на платформе **NestJS**. Бот предоставляет пользователям доступ к иерархическим меню, новостям спорта и персонализированным приветствиям. Проект включает в себя полноценный backend с REST API для управления контентом бота.

## 🛠 Технологический стек (Tech Stack)

- **Framework:** NestJS (Node.js)
- **Language:** TypeScript
- **Telegram Bot API:** Telegraf / `nestjs-telegraf`
- **Database:** MySQL
- **ORM:** TypeORM
- **API Client:** Axios (для взаимодействия с внешними сервисами, например, отправка email)

## 📁 Структура проекта (Project Structure)

- `src/bot/` — Основная логика Telegram-бота (контроллеры, сервисы, обработчики).
- `src/api/` — REST API для управления контентом (админ-панель/внешние системы).
- `src/entities/` — Описание сущностей базы данных (TypeORM).
- `src/users/` — Управление данными пользователей Telegram.
- `src/database/` — Модуль инициализации базы данных.

## 🚀 Основные функции (Key Features)

### 1. Telegram Бот
- **Многоуровневые меню:** Поддержка древовидной структуры меню (главное меню -> подменю -> посты).
- **Персонализированные приветствия:** Система приветственных сообщений с поддержкой переменных (например, `[Name]`) и изображений.
- **Подписка на новости:** Пользователи могут выбирать категории спорта, которые им интересны.
- **Верификация Email:** Для активации новостной рассылки используется процесс подтверждения email через одноразовый код (OTP).
- **Обработка постов:** Посты могут содержать текст, изображения и интерактивные inline-кнопки.

### 2. Управление контентом (API)
- **CRUD операции:** Эндпоинты для управления таблицами меню, кнопками, постами и приветствиями.
- **Интеграция:** Возможность подключения внешних систем для обновления контента бота в реальном времени.

### 3. База данных
- **Сущности:**
  - `User`: Данные пользователей Telegram, их состояния и email.
  - `MenuTable`: Структура меню и подменю.
  - `MenuButton` / `MenuPostButton`: Интерактивные кнопки.
  - `MenuPost`: Контентные сообщения.
  - `NewsCategory`: Категории спортивных новостей.
  - `GreetingBot`: Шаблоны приветствий.

## ⚙️ Процесс работы (Workflow)

1. **Запуск:** При команде `/start` бот создает или обновляет запись пользователя и показывает приветственные сообщения.
2. **Навигация:** Пользователь перемещается по меню, созданному в базе данных.
3. **Опрос:** Для получения новостей пользователь проходит опрос, выбирая интересующие его категории.
4. **Email:** Бот запрашивает email, отправляет код подтверждения через внешний API и сохраняет верифицированный адрес.
5. **Новости:** На основе подписок пользователь получает актуальные новости.

## 🌐 Локализация
- Интерфейс бота ориентирован на японских пользователей (**Japanese UI**).
- Логи и комментарии в коде частично на русском и английском языках.

---
*Документация создана автоматически для описания структуры и функционала проекта.*
