import { modules } from '../data/modules.js';
import { quizzes } from '../data/quizzes.js';
import { el } from '../views/render.js';
import { store } from '../state/store.js';
import { route } from './router.js';

const app = document.getElementById('app');

function progress() {
  const done = store.get().done || [];
  return Math.round((done.length / modules.length) * 100);
}

function nav(active) {
  return el('div', { class: 'card' }, [
    el('div', { class: 'row' }, [
      el('h1', {}, ['Algoria Quest']),
      el('span', { class: 'pill' }, ['Modular SPA'])
    ]),
    el('p', { class: 'muted' }, ['Belajar algoritma, array, looping, fungsi, if-else, dan project akhir.']),
    el('div', { class: 'progress' }, [
      el('div', { class: 'bar', style: `width:${progress()}%` })
    ]),
    ...modules.map(m =>
      el('button', {
        class: `navbtn ${active === m.id ? 'active' : ''}`,
        onclick: () => (location.hash = m.id)
      }, [m.title, ' — ', m.desc])
    )
  ]);
}

function home() {
  return el('div', { class: 'shell grid two' }, [
    nav('home'),
    el('div', { class: 'grid' }, [
      el('div', { class: 'card' }, [
        el('h2', {}, ['Mulai dari mana?']),
        el('p', {}, ['Pilih modul di kiri. Setiap modul punya materi, challenge, dan quiz.']),
        el('div', { class: 'row' }, [
          el('button', { class: 'btn', onclick: () => (location.hash = 'algoritma') }, ['Mulai Belajar']),
          el('button', { class: 'btn ghost', onclick: () => (location.hash = 'project') }, ['Lihat Project Akhir'])
        ])
      ]),
      el('div', { class: 'card' }, [
        el('h3', {}, ['Contoh Project Akhir']),
        el('ul', {}, [
          el('li', {}, ['Kalkulator sederhana dengan history.']),
          el('li', {}, ['Sistem presensi dengan array of objects.']),
          el('li', {}, ['Export data ke CSV.'])
        ])
      ])
    ])
  ]);
}

function modulePage(id) {
  const m = modules.find(x => x.id === id);
  const q = quizzes[id]?.[0];
  if (!m) return home();

  return el('div', { class: 'shell grid two' }, [
    nav(id),
    el('div', { class: 'grid' }, [
      el('div', { class: 'card' }, [
        el('h2', {}, [m.title]),
        el('p', { class: 'muted' }, [m.desc]),
        ...m.lessons.map(ls =>
          el('div', { class: 'card', style: 'margin-top:12px' }, [
            el('h4', {}, [ls.title]),
            el('p', {}, [ls.body])
          ])
        )
      ]),
      el('div', { class: 'card' }, [
        el('h3', {}, ['Mini Quiz']),
        el('p', {}, [q.q]),
        ...q.c.map((t, i) =>
          el('button', {
            class: 'choice',
            onclick: (e) => {
              [...e.currentTarget.parentNode.querySelectorAll('.choice')].forEach(b => b.disabled = true);
              e.currentTarget.classList.add(i === q.a ? 'correct' : 'wrong');
              if (i === q.a) {
                store.set({
                  ...store.get(),
                  done: [...new Set([...(store.get().done || []), id])]
                });
              }
              alert(i === q.a ? 'Benar! ' + q.e : 'Belum tepat. Coba lagi.');
            }
          }, [t])
        )
      ])
    ])
  ]);
}

export function render() {
  const r = route();
  app.innerHTML = '';
  app.append(r === 'home' ? home() : modulePage(r));
}
