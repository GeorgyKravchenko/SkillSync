# SkillSync

<div align="center">
  <img src="frontend/public/logo.png" alt="SkillSync Logo" width="200"/>
</div>

## 🚀 Огляд

SkillSync - це сучасна платформа для обміну знаннями та досвідом, розроблена з використанням Next.js 15 та Express.js. Проект демонструє високий рівень навичок у розробці повноцінних веб-додатків з акцентом на безпеку, продуктивність та зручність користування.

## ✨ Ключові Особливості

- **Сучасний Фронтенд**: Next.js 15 з React 19 та TypeScript
- **Потужний Бекенд**: Express.js з TypeScript та Prisma ORM
- **Безпека**: JWT аутентифікація, Argon2 хешування, Helmet для захисту
- **Сучасний UI**: Tailwind CSS з типографічними розширеннями
- **Управління Станом**: Zustand для клієнтського стану
- **Форми**: React Hook Form для валідації форм
- **Тестування**: Jest для модульних тестів
- **API**: RESTful архітектура з Express.js

## 🛠️ Технічний Стек

### Фронтенд
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Zustand (управління станом)
- React Query (кешування та синхронізація)
- React Hook Form (валідація форм)

### Бекенд
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (аутентифікація)
- Argon2 (хешування паролів)
- Jest (тестування)
- Cloudinary (зберігання зображень)

## 🏗️ Архітектура

- **Монолітна Структура**: Розділення на frontend та backend
- **Типізація**: Повна підтримка TypeScript
- **API**: RESTful ендпоінти
- **База Даних**: Prisma ORM з PostgreSQL
- **Безпека**: JWT токени, хешування паролів

## 🚀 Початок Роботи

1. Клонуйте репозиторій
```bash
git clone https://github.com/yourusername/skillsync.git
```

2. Встановіть залежності для фронтенду
```bash
cd frontend
npm install
```

3. Встановіть залежності для бекенду
```bash
cd ../backend
npm install
```

4. Налаштуйте змінні середовища
```bash
# В frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001

# В backend/.env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"
CLOUDINARY_URL="your-cloudinary-url"
```

5. Запустіть розробку
```bash
# Термінал 1 (frontend)
cd frontend
npm run dev

# Термінал 2 (backend)
cd backend
npm run dev
```

## 📦 Структура Проекту

```
├── frontend/           # Next.js додаток
│   ├── src/
│   │   ├── app/       # Сторінки додатку
│   │   ├── components/# UI компоненти
│   │   ├── hooks/     # React хуки
│   │   ├── services/  # API сервіси
│   │   ├── types/     # TypeScript типи
│   │   └── utils/     # Утиліти
│   └── public/        # Статичні файли
│
├── backend/           # Express.js сервер
│   ├── src/
│   │   ├── controllers/# Контролери
│   │   ├── middleware/# Middleware
│   │   ├── routes/    # API роути
│   │   ├── services/  # Бізнес-логіка
│   │   └── utils/     # Утиліти
│   ├── prisma/        # Схема бази даних
│   └── uploads/       # Завантажені файли
└── ...
```

## 🔒 Безпека

- JWT аутентифікація
- Хешування паролів з Argon2
- Helmet для захисту заголовків
- CORS налаштування
- Валідація вхідних даних
- Безпечне зберігання файлів

## 🎯 Оптимізація

- Server-side Rendering (SSR)
- Кешування з React Query
- Оптимізація зображень
- TypeScript для типобезпеки

## 📈 Майбутні Покращення

- [+] Створення функціоналу лайків/дізлайків
- [+] Реалізація завантаження фото
- [ ] Додавання відповідей на коментарі
- [ ] Підключення редіс
- [ ] Реалізація CI та CD

## 🤝 Внесок у Проект

Внески вітаються! Будь ласка, створіть Pull Request.

## 📝 Ліцензія

Цей проект ліцензовано під MIT License - дивіться файл [LICENSE](LICENSE) для деталей.

## 👨‍💻 Автор

Ваше Ім'я - [Ваше Портфоліо](https://your-portfolio.com)

---

<div align="center">
  Зроблено з ❤️ використовуючи Next.js та Express.js
</div> 