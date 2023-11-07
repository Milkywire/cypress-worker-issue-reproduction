const { setupWorker, http, HttpResponse } = MockServiceWorker;

const handlers = [
  http.get("https://jsonplaceholder.typicode.com/todos/3", async () => {
    console.log("msw intercepted!");
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const json = await response.json();
    return HttpResponse.json(json);
  }),
];

let worker;
function registerMSW() {
  console.log("starting msw worker");
  worker = setupWorker();

  worker.start({
    serviceWorker: {
      url: "./mockServiceWorker.js",
    },
  });

  worker.use(...handlers);
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

function clearParagraph() {
  const div = document.getElementById("paragraph");
  div.innerHTML = "";
}

registerMSW();
