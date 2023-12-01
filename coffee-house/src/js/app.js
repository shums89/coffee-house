// Подключение основного файла стилей
import "../scss/style.scss";

// Функционал 
//====================================================================

import * as flsFunctions from "./files/functions.js";

// Проверка поддержки webp, добавление класса webp или no-webp для HTML
// Необходимо для корректного отображения webp из css
flsFunctions.isWebp();


/* Модуль для работы с меню (Бургер) */
flsFunctions.menuInit();

// Прочее 
//====================================================================

/* Подключаем файлы со своим кодом */
import "./files/cross-check.js";
import "./files/script.js";