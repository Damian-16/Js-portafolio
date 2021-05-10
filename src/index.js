import Template from '@templates/Template.js';
console.log('hola');
import '@styles/main.css';
import '@styles/vars.styl';


// console.log("hello")

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
