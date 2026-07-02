const KEY = 'algoria-progress';

export const store = {
  get() {
    return JSON.parse(localStorage.getItem(KEY) || '{"done":[]}');
  },
  set(v) {
    localStorage.setItem(KEY, JSON.stringify(v));
  }
};
