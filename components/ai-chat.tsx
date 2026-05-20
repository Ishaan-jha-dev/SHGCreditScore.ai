'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, RotateCcw } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type AIChatProps = {
  agentType: 'ecommerce' | 'schemes' | 'advisor';
  shgProfile?: Record<string, unknown>;
  initialMessage?: string;
  placeholder?: string;
  accentColor?: string;
};

export function AIChat({ agentType, shgProfile, initialMessage, placeholder, accentColor = 'primary' }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessage ? [{ role: 'assistant', content: initialMessage }] : []
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Add empty assistant message to stream into
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          agentType,
          shgProfile,
        }),
      });

      if (!res.ok || !res.body) throw new Error('Failed to connect to AI');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: accumulated }
        ]);
      }
    } catch {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: '⚠️ Something went wrong. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const reset = () => {
    setMessages(initialMessage ? [{ role: 'assistant', content: initialMessage }] : []);
    setInput('');
  };

  const formatMessage = (text: string) => {
    // Convert markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="flex flex-col h-[600px] rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {agentType === 'ecommerce' && 'Ask me how to start selling your products on Amazon, Flipkart, or Meesho!'}
              {agentType === 'schemes' && 'Tell me about your SHG and I\'ll find all the government schemes you\'re eligible for!'}
              {agentType === 'advisor' && 'Ask me anything about growing your SHG business!'}
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-tr-sm'
                : 'bg-muted border border-border rounded-tl-sm text-foreground'
            }`}>
              {msg.role === 'assistant' && isLoading && idx === messages.length - 1 && msg.content === '' ? (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestion chips */}
      {messages.length === 0 || (messages.length === 1 && messages[0].role === 'assistant') ? (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {agentType === 'ecommerce' && [
            'Amazon pe kaise register karein?',
            'FSSAI license kaise milega?',
            'Product pricing kaise karein?',
          ].map(q => (
            <button key={q} onClick={() => sendMessage(q)}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted hover:bg-muted/80 text-foreground transition-colors">
              {q}
            </button>
          ))}
          {agentType === 'schemes' && [
            'PMEGP scheme ke baare mein batao',
            'Mudra loan kaise milega?',
            'Mujhe konsi schemes eligible hain?',
          ].map(q => (
            <button key={q} onClick={() => sendMessage(q)}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted hover:bg-muted/80 text-foreground transition-colors">
              {q}
            </button>
          ))}
        </div>
      ) : null}

      {/* Input */}
      <div className="border-t border-border p-3 flex gap-2 items-end bg-card">
        <button onClick={reset} title="Reset chat"
          className="flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground">
          <RotateCcw className="w-4 h-4" />
        </button>
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder={placeholder || 'Type your question... (Press Enter to send)'}
          className="flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary max-h-32 overflow-y-auto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          style={{ height: 'auto', minHeight: '36px' }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
          className="flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
