require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Дата знакомства с Мирой: 6 сентября 2025, 19:54 МСК
const meetingDate = new Date('2025-09-06T16:54:00.000Z'); // UTC время (МСК -3)

function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44); // Примерное количество дней в месяце
    const years = Math.floor(days / 365.25);

    const remainingDays = days % 7;
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    let result = '';
    
    if (years > 0) result += `${years} ${getYearWord(years)} `;
    if (months > 0 && years === 0) result += `${months} ${getMonthWord(months)} `;
    if (weeks > 0 && months === 0 && years === 0) result += `${weeks} ${getWeekWord(weeks)} `;
    if (remainingDays > 0) result += `${remainingDays} ${getDayWord(remainingDays)} `;
    if (remainingHours > 0) result += `${remainingHours} ${getHourWord(remainingHours)} `;
    if (remainingMinutes > 0) result += `${remainingMinutes} ${getMinuteWord(remainingMinutes)} `;
    if (remainingSeconds > 0 || result === '') result += `${remainingSeconds} ${getSecondWord(remainingSeconds)}`;

    return result.trim();
}

function getYearWord(num) {
    if (num % 10 === 1 && num % 100 !== 11) return 'год';
    if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) return 'года';
    return 'лет';
}

function getMonthWord(num) {
    if (num % 10 === 1 && num % 100 !== 11) return 'месяц';
    if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) return 'месяца';
    return 'месяцев';
}

function getWeekWord(num) {
    if (num % 10 === 1 && num % 100 !== 11) return 'неделя';
    if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) return 'недели';
    return 'недель';
}

function getDayWord(num) {
    if (num % 10 === 1 && num % 100 !== 11) return 'день';
    if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) return 'дня';
    return 'дней';
}

function getHourWord(num) {
    if (num % 10 === 1 && num % 100 !== 11) return 'час';
    if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) return 'часа';
    return 'часов';
}

function getMinuteWord(num) {
    if (num % 10 === 1 && num % 100 !== 11) return 'минута';
    if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) return 'минуты';
    return 'минут';
}

function getSecondWord(num) {
    if (num % 10 === 1 && num % 100 !== 11) return 'секунда';
    if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) return 'секунды';
    return 'секунд';
}

// Команда /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    activeChats.add(chatId); // Добавляем чат для уведомлений
    
    bot.sendMessage(chatId, `Привет! 💕 
Этот бот показывает, сколько времени прошло с момента знакомства с Мирой!

📅 МСК: 6 сентября 2025, 19:54
🌍 У Миры: 7 сентября 2025, 01:54

Используй команды:
/timer - показать таймер
/mira - специальное сообщение для Миры
/nik или /nikita - сообщение для Никиты
/help - помощь

🔔 Бот будет присылать случайные напоминания днём!`);
});

// Команда /timer
bot.onText(/\/timer/, (msg) => {
    const chatId = msg.chat.id;
    const now = new Date();
    const timeDiff = now.getTime() - meetingDate.getTime();
    const timeString = formatTime(timeDiff);
    
    bot.sendMessage(chatId, `⏰ С момента знакомства с Мирой прошло:\n\n💖 ${timeString} 💖\n\n📅 МСК: 6 сентября 2025, 19:54\n🌍 У Миры: 7 сентября 2025, 01:54`);
});

// Команда /mira - специальное сообщение
bot.onText(/\/mira/, (msg) => {
    const chatId = msg.chat.id;
    const now = new Date();
    const timeDiff = now.getTime() - meetingDate.getTime();
    const timeString = formatTime(timeDiff);
    
    bot.sendMessage(chatId, `🌟 Мира! 🌟

💕 Мы знакомы уже ${timeString}!

И каждая секунда была прекрасной! ✨

📅 МСК: 6 сентября 2025, 19:54
🌍 У Миры: 7 сентября 2025, 01:54
Именно тогда всё началось... 💫`);
});

// Команды /nik и /nikita - специальные сообщения для Никиты
bot.onText(/\/(nik|nikita)/, (msg) => {
    const chatId = msg.chat.id;
    const now = new Date();
    const timeDiff = now.getTime() - meetingDate.getTime();
    const timeString = formatTime(timeDiff);
    
    bot.sendMessage(chatId, `👑 Никита! 👑

🔥 Мы с Мирой знакомы уже ${timeString}!

Время летит незаметно... ⚡

📅 МСК: 6 сентября 2025, 19:54
🌍 У Миры: 7 сентября 2025, 01:54
И каждый момент на счету! 💪`);
});

// Команда /help
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Доступные команды:

⏰ /timer - показать таймер отношений
💖 /mira - специальное сообщение для Миры  
📅 /start - начальное сообщение
❓ /help - это сообщение

Бот работает 24/7 и всегда готов показать, сколько времени вы вместе! 💕`);
});

// Обработка любых других сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    // Регистрируем активные чаты
    activeChats.add(chatId);

    // Игнорируем команды
    if (text && text.startsWith('/')) return;

    // Реагируем на слова "мира", "таймер", "время"
    if (text && (text.toLowerCase().includes('мира') || 
                 text.toLowerCase().includes('таймер') || 
                 text.toLowerCase().includes('время'))) {
        const now = new Date();
        const timeDiff = now.getTime() - meetingDate.getTime();
        const timeString = formatTime(timeDiff);
        
        bot.sendMessage(chatId, `💕 ${timeString} вместе! 💕`);
    }
});

// Хранилище для отправленных уведомлений (чтобы не дублировать)
const sentNotifications = new Set();
// Хранилище активных чатов для уведомлений
const activeChats = new Set();

// Функция для ежедневных уведомлений
function scheduleRandomDailyNotification() {
    setInterval(() => {
        const now = new Date();
        const today = now.toDateString();
        
        // Если уже отправляли сегодня - пропускаем
        if (sentNotifications.has(today)) return;
        
        // Проверяем время (только днём с 10:00 до 20:00)
        const hour = now.getHours();
        if (hour < 10 || hour > 20) return;
        
        // Случайный шанс отправить (примерно 1 раз в день)
        const randomChance = Math.random();
        if (randomChance < 0.1) { // 10% шанс каждые 10 минут = примерно 1 раз в день
            const timeDiff = now.getTime() - meetingDate.getTime();
            const timeString = formatTime(timeDiff);
            
            const messages = [
                `💫 Напоминание о любви! 💫\n\nВы с Мирой знакомы уже ${timeString}!\n\n⏰ Каждая минута драгоценна! 💕`,
                `🌟 Время летит! 🌟\n\nС момента знакомства с Мирой прошло:\n${timeString}\n\n💖 И это только начало... ✨`,
                `⏰ Ежедневное напоминание ⏰\n\n💕 Мира + Никита = ${timeString} счастья!\n\n🎉 Пусть время идёт, любовь остаётся! 💫`
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            // Отправляем всем активным чатам
            activeChats.forEach(chatId => {
                bot.sendMessage(chatId, randomMessage).catch(err => {
                    console.log(`Не удалось отправить в чат ${chatId}:`, err.message);
                    // Удаляем неактивный чат
                    activeChats.delete(chatId);
                });
            });
            
            console.log('📱 Отправлено ежедневное уведомление в', activeChats.size, 'чатов');
            sentNotifications.add(today);
        }
    }, 600000); // Проверяем каждые 10 минут
}

// Очистка уведомлений в полночь
function clearDailyNotifications() {
    setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            sentNotifications.clear();
            console.log('🔄 Сброс ежедневных уведомлений');
        }
    }, 60000); // Проверяем каждую минуту
}

console.log('🤖 Бот запущен! Готов считать время с Мирой...');

// Запускаем систему уведомлений
scheduleRandomDailyNotification();
clearDailyNotifications();