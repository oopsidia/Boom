const onboarding =
  document.getElementById("onboarding");

const chatScreen =
  document.getElementById("chatScreen");

const startBtn =
  document.getElementById("startBtn");

const chat =
  document.getElementById("chat");

const input =
  document.getElementById("input");

let profile = {};

startBtn.addEventListener("click", () => {

  profile = {
    age:
      document.getElementById("age").value,

    purpose:
      document.getElementById("purpose").value
  };

  onboarding.classList.add("hidden");

  chatScreen.classList.remove("hidden");
});

document
  .getElementById("send")
  .addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {

  if (e.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {

  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  input.value = "";

  const botDiv =
    addMessage("", "bot");

  try {

    const response = await fetch(
      "https://boom-ai.sh031300.workers.dev",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          message: text,
          profile
        })
      }
    );

    const data =
      await response.json();

    typeText(
      botDiv,
      data.text
    );

  } catch (err) {

    botDiv.innerHTML =
      "서버 연결 오류 😢";

    console.error(err);
  }
}

function addMessage(text, role) {

  const div =
    document.createElement("div");

  div.className =
    `msg ${role}`;

  div.innerHTML = text;

  chat.appendChild(div);

  chat.scrollTop =
    chat.scrollHeight;

  return div;
}

async function typeText(el, text) {

  for (let i = 0; i < text.length; i++) {

    el.innerHTML += text[i];

    await delay(18);

    chat.scrollTop =
      chat.scrollHeight;
  }
}

function delay(ms) {
  return new Promise(r =>
    setTimeout(r, ms)
  );
}
