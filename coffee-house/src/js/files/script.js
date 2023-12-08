import { menuClose } from "./functions.js";

const links = document.querySelectorAll('.menu__link');

links.forEach(link => link.addEventListener('click', () => menuClose()));