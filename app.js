async function generate() {
  const business = document.getElementById("business").value;
  const goal = document.getElementById("goal").value;

  const prompt = `
You are an Instagram expert.

Business: ${business}
Goal: ${goal}

Generate:
- 5 Reel ideas
- 1 sales caption
- CTA to DM
`;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDRJ3Y7VgLDZOtrIY4xyzke9UuK0YIPIKk",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await res.json();
  output.textContent =
    data.candidates[0].content.parts[0].text;
}
