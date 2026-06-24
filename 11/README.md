1. ЛОКАЛИЗАЦИЯ САЙТА
📌 Атрибут lang
Указывает язык страницы или элемента.

html
<!-- Язык всей страницы -->
<html lang="ru">

<!-- Язык конкретного элемента -->
<p lang="en">Hello!</p>
<p lang="ru">Привет!</p>
Зачем:

✅ Для поисковиков (SEO)

✅ Для скринридеров (правильное произношение)

✅ Для браузеров (предложение перевода)

✅ Для правильного отображения шрифтов

📌 Кодировка символов (charset)
Определяет, как браузер понимает символы.

html
<!-- Рекомендуемая кодировка (универсальная) -->
<meta charset="UTF-8">

<!-- Полный вариант -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
Зачем:

✅ Правильное отображение русского языка

✅ Поддержка эмодзи (😊, 🎉)

✅ Специальные символы (©, ®, €)

✅ Избежание кракозябр (????)

Какие бывают кодировки:

Кодировка	Описание
UTF-8	Универсальная (рекомендуется)
windows-1251	Русская (устаревшая)
KOI8-R	Русская (старая)
ISO-8859-5	Русская (редко)
📌 Тег <time>
Для отображения даты и времени.

html
<!-- Только дата -->
<time datetime="2024-01-15">15 января 2024</time>

<!-- Дата и время -->
<time datetime="2024-01-15T14:30:00">15 января, 14:30</time>

<!-- Только время -->
<time datetime="14:30">14:30</time>

<!-- В проекте -->
<div class="date">
    <time datetime="2024-01-15">15.01.2024</time>
</div>
Зачем:

✅ Машиночитаемый формат

✅ Помогает поисковикам

✅ Используется в календарях

✅ Правильное отображение дат

📌 Тег <abbr>
Для аббревиатур и сокращений.

html
<!-- Аббревиатура с расшифровкой -->
<abbr title="Cascading Style Sheets">CSS</abbr>
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- Пример -->
<p>Я использую <abbr title="JavaScript">JS</abbr></p>

<!-- В проекте -->
<abbr title="Российский рубль">₽</abbr>
Зачем:

✅ Показывает расшифровку при наведении

✅ Помогает скринридерам

✅ Улучшает понимание

✅ Полезно для новичков

📌 Полный пример локализации
html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Мой сайт</title>
</head>
<body>
    <h1>Добро пожаловать!</h1>
    
    <!-- Аббревиатура -->
    <p>Язык: <abbr title="HyperText Markup Language">HTML</abbr></p>
    
    <!-- Дата -->
    <p>Сегодня: <time datetime="2024-01-15">15 января 2024</time></p>
    
    <!-- Английская фраза -->
    <p lang="en">Welcome to my website!</p>
</body>
</html>

2. РАБОТА С ФОРМАМИ И ВАЛИДАЦИЕЙ
📌 preventDefault()
Отменяет стандартное поведение браузера.

javascript
// Отмена отправки формы
form.addEventListener('submit', function(e) {
    e.preventDefault(); // ❌ Не отправит форму
    // Делаем свою обработку
});

// Отмена перехода по ссылке
link.addEventListener('click', function(e) {
    e.preventDefault(); // ❌ Не перейдёт по ссылке
});

// Отмена контекстного меню
document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // ❌ Не покажет меню
});
Где использовать:

javascript
// Форма не отправляется, пока не проверим
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Отправляем данные
        this.submit();
    }
});
📌 value
Получает или устанавливает значение поля ввода.

javascript
// ===== ПОЛУЧИТЬ ЗНАЧЕНИЕ =====
const name = document.getElementById('name').value;        // строка
const age = parseInt(document.getElementById('age').value); // число
const amount = parseFloat(document.getElementById('amount').value); // число с точкой
const date = document.getElementById('date').value;        // строка
const select = document.getElementById('select').value;    // выбранный вариант

// ===== УСТАНОВИТЬ ЗНАЧЕНИЕ =====
document.getElementById('name').value = 'Иван';
document.getElementById('amount').value = '1000';
document.getElementById('date').value = '2024-01-15';
document.getElementById('select').value = 'option2';

// ===== ПРИМЕР В ПРОЕКТЕ =====
const type = transactionType.value;      // 'income' или 'expense'
const amount = parseFloat(transactionAmount.value);
const description = transactionDescription.value.trim();
📌 checked
Для чекбоксов и радио-кнопок.

javascript
// ===== ПОЛУЧИТЬ СОСТОЯНИЕ =====
const isChecked = document.getElementById('agree').checked; // true/false
const isSelected = document.querySelector('input[name="gender"]:checked');

// ===== УСТАНОВИТЬ =====
document.getElementById('agree').checked = true;
document.getElementById('agree').checked = false;

// ===== ВСЕ ЧЕКБОКСЫ =====
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(cb => {
    if (cb.checked) {
        console.log('Выбрано:', cb.value);
    }
});

// ===== РАДИО-КНОПКИ =====
const radio = document.querySelector('input[name="gender"]:checked');
if (radio) {
    console.log('Выбран:', radio.value);
}
📌 Валидация форм (полный пример)
javascript
function validateForm() {
    // 1. Проверка пустых полей
    const name = document.getElementById('name').value;
    if (!name || name.trim() === '') {
        alert('Введите имя!');
        document.getElementById('name').focus();
        return false;
    }

    // 2. Проверка числа
    const amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Введите корректную сумму!');
        document.getElementById('amount').focus();
        return false;
    }

    // 3. Проверка email
    const email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.')) {
        alert('Введите корректный email!');
        document.getElementById('email').focus();
        return false;
    }

    // 4. Проверка длины
    const text = document.getElementById('text').value;
    if (text.length > 200) {
        alert('Текст не должен превышать 200 символов');
        document.getElementById('text').focus();
        return false;
    }

    // 5. Проверка даты
    if (!document.getElementById('date').value) {
        alert('Выберите дату!');
        document.getElementById('date').focus();
        return false;
    }

    // 6. Проверка чекбокса
    if (!document.getElementById('agree').checked) {
        alert('Примите условия!');
        return false;
    }

    return true; // ✅ Все проверки пройдены
}

// Использование
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Отправляем данные
        this.submit();
    }
});
📌 Валидация в трекере расходов
javascript
function addTransaction() {
    // 1. Проверка суммы
    const amount = parseFloat(transactionAmount.value);
    if (!amount || amount <= 0) {
        alert('Введите сумму!');
        transactionAmount.focus();
        return; // ❌ Останавливаем
    }

    // 2. Проверка даты
    const date = transactionDate.value;
    if (!date) {
        alert('Выберите дату!');
        transactionDate.focus();
        return;
    }

    // 3. Проверка описания (длина)
    const description = transactionDescription.value.trim();
    if (description.length > 200) {
        alert('Описание не должно превышать 200 символов');
        transactionDescription.focus();
        return;
    }

    // ✅ Все проверки пройдены
    // Добавляем транзакцию
    // ...
}
🎯 Шпаргалка
Локализация
Элемент	Что делает	Пример
lang	Язык страницы	<html lang="ru">
charset	Кодировка	<meta charset="UTF-8">
<time>	Дата/время	<time datetime="2024-01-15">
<abbr>	Аббревиатура	<abbr title="CSS">CSS</abbr>
Формы и валидация
Метод/Свойство	Что делает	Пример
preventDefault()	Отменяет стандартное поведение	e.preventDefault()
value	Значение поля	input.value
checked	Состояние чекбокса	checkbox.checked
Валидация в трекере
javascript
// 1. Проверка суммы
if (!amount || amount <= 0) { alert('Ошибка!'); return; }

// 2. Проверка даты
if (!date) { alert('Ошибка!'); return; }

// 3. Проверка длины
if (description.length > 200) { alert('Ошибка!'); return; }