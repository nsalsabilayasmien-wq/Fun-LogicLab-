export function route() {
  return location.hash.replace('#', '') || 'home';
}
