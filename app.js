const response = await fetch(
  "https://boom-ai.sh031300.workers.dev/",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: text,
      profile: {
        age: "20대",
        purpose: "데이트"
      }
    })
  }
);

const data = await response.json();

botDiv.innerHTML = data.text;
