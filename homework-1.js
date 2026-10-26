const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Цена билета по категории (1, 2, 3)
function ticketPrice(category) {
  if (category === 1) return 300;
  if (category === 2) return 500;
  if (category === 3) return 900;
  return 0; // неизвестная категория
}

// Сколько билетов можно купить на бюджет (только через while, без деления)
function maxTickets(budget, price) {
  let count = 0;
  let moneyLeft = budget;

  while (moneyLeft >= price) {
    moneyLeft = moneyLeft - price;
    count = count + 1;
  }
  return count;
}

// Вывод чека для кассы
function printTicketResult(category, budget) {
  const price = ticketPrice(category);

  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }

  const count = maxTickets(budget, price);
  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`);
}

// Стоимость доставки
function deliveryPrice(distance, total) {
  // Если заказ от 3000 — доставка бесплатно
  if (total >= 3000) {
    return 0;
  }

  // До 3 км включительно — бесплатно
  if (distance <= 3) {
    return 0;
  }

  // От 4 до 10 км включительно — 200 рублей
  if (distance >= 4 && distance <= 10) {
    return 200;
  }

  // Больше 10 км: 200 + 25 за каждый км после 10
  const extraKm = distance - 10;
  const cost = 200 + (extraKm * 25);
  return cost;
}

// Вывод результата доставки
function printDelivery(distance, total) {
  const cost = deliveryPrice(distance, total);
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${cost} руб.`);
}

// Лестница: печать ступеней с continue и break
function printSteps(height) {
  let builtCount = 0;

  for (let i = 1; i <= height; i++) {
    // Ступень 4 не строят
    if (i === 4) {
      continue;
    }

    console.log(`Ступень ${i}`);
    builtCount = builtCount + 1;

    // После 10-й ступени дальше не строим
    if (i === 10) {
      console.log('Дальше лестница не построена');
      break;
    }
  }

  console.log(`Всего построено: ${builtCount}`);
}

// Главное меню и выбор задачи
function start() {
  console.log('Выберите задачу:');
  console.log('1 — билетная касса');
  console.log('2 — доставка заказа');
  console.log('3 — лестница');

  rl.question('Ваш выбор: ', (choiceText) => {
    const choice = Number(choiceText);

    if (choice === 1) {
      rl.question('Категория билета: ', (catText) => {
        const category = Number(catText);
        rl.question('Бюджет: ', (budgetText) => {
          const budget = Number(budgetText);
          printTicketResult(category, budget);
          rl.close();
        });
      });
    } else if (choice === 2) {
      rl.question('Расстояние: ', (distText) => {
        const distance = Number(distText);
        rl.question('Сумма заказа: ', (totalText) => {
          const total = Number(totalText);
          printDelivery(distance, total);
          rl.close();
        });
      });
    } else if (choice === 3) {
      rl.question('Высота лестницы: ', (heightText) => {
        const height = Number(heightText);
        printSteps(height);
        rl.close();
      });
    } else {
      console.log('такой задачи нет');
      rl.close();
    }
  });
}

start();
