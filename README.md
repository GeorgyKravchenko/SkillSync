# SkillSync 

<div align="center">
  <img src="frontend/public/logo.png" alt="SkillSync Logo" width="200"/>
</div>

## 🚀 Огляд

SkillSync - це сучасний веб-додаток, розроблений з використанням Next.js 15 та Express.js, що демонструє високий рівень навичок у розробці повноцінних веб-додатків. Проект показує експертизу у розробці як фронтенду, так і бекенду, з акцентом на безпеку та продуктивність.

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
- Zustand
- React Query
- React Hook Form

### Бекенд
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Argon2
- Jest

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
│   ├── src/           # Вихідний код
│   ├── public/        # Статичні файли
│   └── ...
├── backend/           # Express.js сервер
│   ├── src/          # Вихідний код
│   ├── prisma/       # Схема бази даних
│   └── __tests__/    # Тести
└── ...
```

## 🔒 Безпека

- JWT аутентифікація
- Хешування паролів з Argon2
- Helmet для захисту заголовків
- CORS налаштування
- Валідація вхідних даних

## 🎯 Оптимізація

- Server-side Rendering (SSR)
- Оптимізація зображень
- Кешування з React Query
- TypeScript для типобезпеки

## 📈 Майбутні Покращення

- [ ] Додавання WebSocket для real-time функціоналу
- [ ] Інтеграція з соціальними мережами
- [ ] Покращення UI/UX
- [ ] Додавання аналітики
- [ ] Підтримка інших мов

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