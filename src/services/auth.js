export default {
  callbacks: [],
  jwt: window.sessionStorage.getItem('jwt'),

  subscribe(cb) {
    this.callbacks.push(cb);
  },

  update() {
    this.callbacks.forEach(cb => cb());
  },

  setJWT(jwt) {
    this.jwt = jwt;
    window.sessionStorage.setItem('jwt', jwt);
    this.update();
  },
};
