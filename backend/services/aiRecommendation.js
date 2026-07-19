const {GoogleGenAI} = require("@google/genai");


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
async function testGemini(userData) {
    const prompt = `
    You are an AI assistant that provides general educational diabetes lifestyle advice.

    Return ONLY valid JSON.

    {
    "diet": "",
    "exercise": "",
    "foodsToAvoid": "",
    "lifestyle": "",
    "motivation": ""
    }

    User Details:
    BMI: ${userData.BMI }
    Blood Sugar: ${userData.beforeMeal} mg/dL (before meal), ${userData.afterMeal} mg/dL (after meal)
    Today's Calories: ${userData.total_calories} kcal
    Today's Carbohydrates: ${userData.total_carbs} g
    Exercise: ${userData.exerciseDuration} minutes
    Emotion: ${userData.emotions[0] || "Neutral"}
    `;
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });
  
  return response.text;
}
module.exports = { testGemini };