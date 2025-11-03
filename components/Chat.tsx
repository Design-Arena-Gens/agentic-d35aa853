"use client";

import { useEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';

export type ChatMessage = { role: 'assistant' | 'user'; content: string };

const SUGGESTIONS = [
  'What are today\'s popular items?',
  'How many calories in a Big Mac?',
  'When does breakfast end?',
  'Any vegetarian options?',
  'Recommend a $7 meal',
  'Allergens in Chicken McNuggets',
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I\'m your McDonald\'s assistant. Ask about menu, nutrition, allergens, hours, or get recommendations." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setInput('');
    const next = [...messages, { role: 'user' as const, content }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch('/api/agent', { method: 'POST', body: JSON.stringify({ message: content, history: next }), headers: { 'Content-Type': 'application/json' } });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setMessages([...next, { role: 'assistant', content: 'Sorry, I had trouble answering. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="quickRow">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="quickBtn" onClick={() => send(s)}>{s}</button>
        ))}
      </div>
      <div className="messages" ref={listRef}>
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && <MessageBubble role="assistant" content="Thinking?" />}
      </div>
      <div className="inputRow">
        <input className="input" placeholder="Ask about menu, nutrition, allergens, hours, deals?" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} />
        <button className="sendBtn" onClick={() => send()} disabled={loading}>Send</button>
      </div>
    </>
  );
}
