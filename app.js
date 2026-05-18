const chat = document.getElementById("chat");
const input = document.getElementById("input");

document.getElementById("send")
  .addEventListener("click", sendMessage);

async function sendMessage() {

  const text = input.value;

  addMessage(text, "user");

  input.value = "";

  const botDiv = addMessage("", "bot");

  const response = await fetch(
    "boom-ai.sh031300.workers.dev",
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

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {

    const { done, value } =
      await reader.read();

    if (done) break;

    const chunk =
      decoder.decode(value);

    botDiv.innerHTML += chunk;
  }
}

function addMessage(text, role) {

  const div = document.createElement("div");

  div.className = `msg ${role}`;

  div.innerHTML = text;

  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight;

  return div;
}
