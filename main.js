import { render } from './controllers/app.js';

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
