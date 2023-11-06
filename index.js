function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then((reg) => {
      if (reg.active) console.log("service worker active");
    });
  }
}

function unregisterServiceWorker() {
  navigator.serviceWorker.register("service-worker.js").then((reg) => {
    reg.unregister();
    console.log("service worker unregistered");
  });
}

/**
 *
 * @param {number} todo
 */
function callApi(todo) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${todo}`)
    .then((response) => response.json())
    .then((json) => {
      const div = document.getElementById("paragraph");
      div.innerHTML = json.title;
    });
}

registerServiceWorker();
