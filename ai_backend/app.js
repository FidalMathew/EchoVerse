const express = require("express");
require("dotenv").config();
const cors = require("cors");

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const port = process.env.PORT || 8000;

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// async function run() {
//   const chatSession = model.startChat({
//     generationConfig,
//     // safetySettings: Adjust safety settings
//     // See https://ai.google.dev/gemini-api/docs/safety-settings
//     history: [],
//   });

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
// }

// run();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/tags", async (req, res) => {
  const { postContent } = req.body;

  const additionalText =
    'Return all the tags that can be included in the post. The options are const tags = "FamilyDynamics",  "HealthChallenges","PersonalGrowth","Relationships","MentalHealth","ParentingExperiences",WorkplaceIssues","FinancialStruggles", "SocialIssues", "Others". The response should be in the format: "tags": ["FamilyDynamics", "HealthChallenges", "PersonalGrowth"]';

  const prompt = postContent + additionalText;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response.text();

  const jsonString = "{" + response + "}";

  console.log(response, jsonString);

  let jsonObject = JSON.parse(jsonString);

  // Access the tags array
  let tagsArray = jsonObject.tags;
  console.log(tagsArray);

  res.json({ tags: tagsArray }).status(200);
});

app.post("/advice", async (req, res) => {
  const { postContent, advice } = req.body;

  console.log(postContent);
  const additionalText =
    'Provide advice on the post content. The response should be in the format:- "advice": "Your advice goes here". Respond with only 1 paragraph';
  const prompt = postContent + advice + additionalText;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response.text();
  // Format the advice content
  //   let formattedAdvice = formatAdviceContent(response);

  res.json({ advice: response }).status(200);
});

app.listen(port, () => {
  console.log("Server is running on port 8000");
});
