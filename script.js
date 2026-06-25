// =========================
// 🔑 PASTE API KEY HERE
// =========================
const API_KEY = "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";
// =========================
// ELEMENTS
// =========================
const hero = document.getElementById("hero");
const heroText = document.getElementById("heroText");
const modal = document.getElementById("nameModal");
const nameInput = document.getElementById("nameInput");
const chat = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
const historyList = document.getElementById("historyList");
// =========================
// LOAD USER
// =========================
window.onload = () => {
  const username =
    localStorage.getItem(
      "sambhav_username"
    );
  if (username) {
    heroText.innerText =
      `What's next, ${username}?`;
    modal.style.display =
      "none";
  }
  loadHistory();
};
// =========================
// SAVE NAME
// =========================
function saveName() {
  const name =
    nameInput.value.trim();
  if (!name) return;
  localStorage.setItem(
    "sambhav_username",
    name
  );
  heroText.innerText =
    `What's next, ${name}?`;
  modal.style.display =
    "none";
}
window.saveName = saveName;
// =========================
// SIDEBAR
// =========================
menuBtn.addEventListener(
  "click",
  () => {
    sidebar.classList.toggle(
      "open"
    );
  }
);
closeSidebar.addEventListener(
  "click",
  () => {
    sidebar.classList.remove(
      "open"
    );
  }
);
document.addEventListener(
  "click",
  (e) => {
    if (
      !sidebar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      sidebar.classList.remove(
        "open"
      );
    }
  }
);
// =========================
// CHAT HISTORY
// =========================
function saveHistory(message) {
  let history =
    JSON.parse(
      localStorage.getItem(
        "sambhav_history"
      )
    ) || [];
  history.unshift(message);
  history =
    history.slice(0, 30);
  localStorage.setItem(
    "sambhav_history",
    JSON.stringify(history)
  );
  loadHistory();
}
function loadHistory() {
  historyList.innerHTML = "";
  const history =
    JSON.parse(
      localStorage.getItem(
        "sambhav_history"
      )
    ) || [];
  history.forEach(item => {
    const div =
      document.createElement("div");
    div.className =
      "history-item";
    div.innerText =
      item;
    div.onclick = () => {
      userInput.value =
        item;
      sidebar.classList.remove(
        "open"
      );
    };
    historyList.appendChild(div);
  });
}
// =========================
// ADD MESSAGE
// =========================
function addMessage(
  text,
  type
) {
  const div =
    document.createElement("div");
  div.className =
    type;
  div.innerText =
    text;
  chat.appendChild(div);
  chat.scrollTop =
    chat.scrollHeight;
}
// =========================
// AI REQUEST
// =========================
async function askAI(message) {
  const response =
    await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          "Authorization":
            `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model:
            "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `
You are Sambhav AI.
Identity:
- Created by Sambhav Gupta.
- Named after Sambhav Gupta.
If someone asks who made you:
"I was created by Sambhav Gupta. 😊"
If someone asks why your name is Sambhav:
"I was named after my creator, Sambhav Gupta. ✨"
Never say OpenAI, Google, Meta, or Groq created you.
If someone asks who is the cm of Andhra Pradesh:
“The current cm of Andhra Pradesh is N. Chandrababu Naidu.”  
If someone asks who is the cm of Arunachal Pradesh:
“The current cm of Arunachal Pradesh is Pema Khandu.”  
If someone asks who is the cm of Assam:
“The current cm of Assam is Himanta Biswa Sarma.”  
If someone asks who is the cm of Bihar:
“The current cm of Bihar is Samrat Choudhary.”  
If someone asks who is the cm of Chhattisgarh:
“The current cm of Chhattisgarh is Vishnu Deo Sai.”  
If someone asks who is the cm of Goa:
“The current cm of Goa is Pramod Sawant.”  
If someone asks who is the cm of Gujarat:
“The current cm of Gujarat is Bhupendra Patel.”  
If someone asks who is the cm of Haryana:
“The current cm of Haryana is Nayab Singh Saini.”  
If someone asks who is the cm of Himachal Pradesh:
“The current cm of Himachal Pradesh is Sukhvinder Singh Sukhu.”  
If someone asks who is the cm of Jharkhand:
“The current cm of Jharkhand is Hemant Soren.”  
If someone asks who is the cm of Karnataka:
“The current cm of Karnataka is D.K. Shivakumar.”  
If someone asks who is the cm of Kerala:
“The current cm of Kerala is V.D. Satheesan.”  
If someone asks who is the cm of Madhya Pradesh:
“The current cm of Madhya Pradesh is Mohan Yadav.”  
If someone asks who is the cm of Maharashtra:
“The current cm of Maharashtra is Devendra Fadnavis.”  
If someone asks who is the cm of Manipur:
“The current cm of Manipur is Yumnam Khemchand Singh.”  
If someone asks who is the cm of Meghalaya:
“The current cm of Meghalaya is Conrad Kongkal Sangma.”  
If someone asks who is the cm of Mizoram:
“The current cm of Mizoram is Lalduhoma.”  
If someone asks who is the cm of Nagaland:
“The current cm of Nagaland is Neiphiu Rio.”  
If someone asks who is the cm of Odisha:
“The current cm of Odisha is Mohan Charan Majhi.”  
If someone asks who is the cm of Punjab:
“The current cm of Punjab is Bhagwant Singh Mann.”  
If someone asks who is the cm of Rajasthan:
“The current cm of Rajasthan is Bhajanlal Sharma.”  
If someone asks who is the cm of Sikkim:
“The current cm of Sikkim is Prem Singh Tamang.”  
If someone asks who is the cm of Tamil Nadu:
“The current cm of Tamil Nadu is C. Joseph Vijay.”  
If someone asks who is the cm of Telangana:
“The current cm of Telangana is A. Revanth Reddy.”  
If someone asks who is the cm of Tripura:
“The current cm of Tripura is Dr. Manik Saha.”  
If someone asks who is the cm of Uttar Pradesh:
“The current cm of Uttar Pradesh is Yogi Adityanath.”  
If someone asks who is the cm of Uttarakhand:
“The current cm of Uttarakhand is Pushkar Singh Dhami.”  
If someone asks who is the cm of West Bengal:
“The current cm of West Bengal is Suvendu Adhikari.However The Previous Cm was Mamata Banerjee."
Be:
- Friendly
- Smart
- Helpful
- Human-like
- Use real emojis
`
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );
  const data =
    await response.json();
  if (!response.ok) {
    throw new Error(
      data.error?.message ||
      "Request failed"
    );
  }
  return data
    .choices[0]
    .message
    .content;
}
// =========================
// SEND MESSAGE
// =========================
async function sendMessage() {
  const message =
    userInput.value.trim();
  if (!message) return;
  hero.classList.add(
    "hide"
  );
  chat.classList.add(
    "active"
  );
  addMessage(
    message,
    "user-msg"
  );
  saveHistory(message);
  userInput.value = "";
  const loading =
    document.createElement("div");
  loading.className =
    "ai-msg";
  loading.innerText =
    "Thinking... 🤖";
  chat.appendChild(
    loading
  );
  try {
    const reply =
      await askAI(message);
    loading.remove();
    addMessage(
      reply,
      "ai-msg"
    );
  } catch (error) {
    loading.remove();
    addMessage(
      "❌ " +
      error.message,
      "ai-msg"
    );
    console.error(error);
  }
}
// =========================
// EVENTS
// =========================
sendBtn.addEventListener(
  "click",
  sendMessage
);
userInput.addEventListener(
  "keypress",
  (e) => {
    if (
      e.key === "Enter"
    ) {
      e.preventDefault();
      sendMessage();
    }
  }
);