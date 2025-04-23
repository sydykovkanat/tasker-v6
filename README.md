<img src="./public/logo.jpg" width="300" alt="Tasker.Front логотип">

## 🚀 Быстрый старт

### Режим разработки

```bash
# Установка зависимостей
bun install

# Запуск в режиме разработки
bun run dev
```

### Сборка для продакшн

```bash
# Создание сборки
bun run build

# Запуск продакшн версии локально
serve -s dist -l 3000
```

## 🐳 Деплой в Docker

```bash
# Сборка и пуш Docker образа в Docker Hub
docker buildx build --push --platform linux/amd64 -t shoro2024/tasker.front:0.0 .
```

> Замени `0.0` на номер версии (например, `1.0`, `1.1` и т.д.)
