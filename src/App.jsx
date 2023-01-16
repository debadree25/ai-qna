import './App.css';
import React, { useEffect, useState } from 'react';
import openAI from './api/openai';
import ChatInput from './components/ChatInput';
import ChatContainer from './components/ChatContainer';
import ChatHeader from './components/ChatHeader';

import PROMPTS from './constants/prompts';

function App() {
  const [messages, setMessages] = useState([]);
  const [runningPrompt, setRunningPrompt] = useState(PROMPTS.DEFAULT);
  const [botThinking, setBotThinking] = useState(false);

  useEffect(() => {
    openAI(runningPrompt, true).then(({ ai, prompt }) => {
      setMessages([
        ...messages,
        { speaker: 'ai', content: ai, timestamp: Date.now() },
      ]);
      setRunningPrompt(prompt);
    });
  }, []);

  const onMessageByUser = (userInput) => {
    setBotThinking(() => true);
    setMessages((prev) => [
      ...prev,
      { speaker: 'user', content: userInput, timestamp: Date.now() },
    ]);
    const questionByUser = `Q: ${userInput}\nA: `;
    const pr = runningPrompt + questionByUser;
    openAI(pr, false).then(({ ai, prompt }) => {
      setMessages((prev) => [
        ...prev,
        { speaker: 'ai', content: ai, timestamp: Date.now() },
      ]);
      setRunningPrompt(prompt);
      setBotThinking(() => false);
    });
  };

  return (
    <section className="window">
      <ChatHeader />
      <ChatContainer messages={messages} botThinking={botThinking} />
      <ChatInput onMessageByUser={onMessageByUser} botThinking={botThinking} />
    </section>
  );
}

export default App;
