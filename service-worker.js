self.addEventListener("fetch", async (event) => {
  if (event.request.url === "https://jsonplaceholder.typicode.com/todos/2") {
    event.respondWith(fetch("https://jsonplaceholder.typicode.com/todos/1"));
  }
});
