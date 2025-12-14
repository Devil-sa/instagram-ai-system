import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCMIjNCoh9hSEHXxH0l4faaOkOg7R7i-bI",
  authDomain: "instaproje.firebaseapp.com",
  projectId: "instaproje"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔐 Protect page
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

const genBtn = document.getElementById("genBtn");
const output = document.getElementById("output");

genBtn.addEventListener("click", async () => {
  const business = document.getElementById("business").value;
  const goal = document.getElementById("goal").value;

  output.textContent = "Generating content... ⏳";

  const prompt = `
You are an Instagram marketing expert.

Business type: ${business}
Goal: ${goal}

Generate:
1. 5 viral Reel ideas
2. 1 sales caption
3. 1 CTA to get customers via DM
`;

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDRJ3Y7VgLDZOtrIY4xyzke9UuK0YIPIKk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: prompt }] }
          ]
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    output.textContent =
      data.candidates[0].content.parts[0].text;

  } catch (err) {
    output.textContent = "❌ AI Error:\n" + err.message;
    console.error(err);
  }
});