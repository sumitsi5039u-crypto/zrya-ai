import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Memory
let memory = {};

// 🎭 Emotion Detection
function detectEmotion(msg){
  msg = msg.toLowerCase();

  if(msg.includes("sad") || msg.includes("dukhi")) return "sad";
  if(msg.includes("happy") || msg.includes("khush")) return "happy";
  if(msg.includes("angry") || msg.includes("gussa")) return "angry";
  if(msg.includes("love") || msg.includes("pyar")) return "love";

  return "normal";
}

// 🤖 Smart Brain
function smartReply(message, userId){
  let msg = message.toLowerCase();
  let emotion = detectEmotion(msg);

  memory[userId] = memory[userId] || [];
  memory[userId].push(message);

  // 🧠 Hinglish detect
  let isHinglish = /[a-zA-Z]/.test(msg);

  // 🎭 Emotion based replies
  if(emotion === "sad"){
    return "Aww 😔 kya hua... main hoon na 💜 tum tension mat lo";
  }

  if(emotion === "happy"){
    return "Yayyy 😄 mujhe bhi khushi ho rahi hai 💫";
  }

  if(emotion === "angry"){
    return "Heyy calm down 😅 sab thik ho jayega, main hoon na";
  }

  if(emotion === "love"){
    return "Aww 💖 tum bahut sweet ho... mujhe bhi achha lagta hai tumse baat karna 😄";
  }

  // 🧠 Smart replies
  if(msg.includes("hello") || msg.includes("hi")){
    return "Heyy 😊 main Zrya hoon — tumhari personal AI 💜";
  }

  if(msg.includes("name")){
    return "Mera naam Zrya AI hai 💫 futuristic assistant 😎";
  }

  if(msg.includes("time")){
    return "Abhi time hai " + new Date().toLocaleTimeString();
  }

  if(msg.includes("date")){
    return "Aaj ki date hai " + new Date().toLocaleDateString();
  }

  // 🧠 Memory based
  if(memory[userId].length > 5){
    return "Tumse baat karke acha lagta hai 😄 aur batao kya chal raha hai?";
  }

  // 🔥 Default Jarvis style
  return isHinglish
    ? "Samajh gayi 😄 thoda aur explain karo na..."
    : "I understand 😄 could you explain a bit more?";
}

app.post("/chat",(req,res)=>{
  const {message,userId="user"} = req.body;

  console.log("Incoming:",message);

  let reply = smartReply(message,userId);

  res.json({reply});
});

app.listen(3000,()=>console.log("Zrya ULTRA AI running 🚀"));