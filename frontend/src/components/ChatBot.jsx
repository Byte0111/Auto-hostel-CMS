import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const hostelContext = `You are a helpful hostel complaint system assistant. You can help students with:
- How to file a complaint
- Checking complaint status
- Understanding the complaint categories (Electrical, Plumbing, Furniture, Cleaning, Other)
- Priority levels (Low, Medium, High)
- General hostel information

Keep responses brief and helpful. If asked about anything else, politely say you can only help with hostel complaint system related questions.`;

function formatContext(chatHistory) {
  const context = chatHistory.map(m => 
    `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
  ).join('\n');
  return `${hostelContext}\n\n${context}`;
}

async function getBotResponse(messages) {
  const context = formatContext(messages.slice(-5));
  
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: context,
        stream: false
      })
    });
    const data = await response.json();
    return data.response || "I couldn't process that. Please try again.";
  } catch {
    return "I can't connect to the AI server. Make sure Ollama is running on your computer.";
  }
}

function getSimpleResponse(message) {
  const m = message.toLowerCase();
  
  if (m.includes('status') || m.includes('track')) {
    return "To check your complaint status, go to the Dashboard and look at the status field (Pending, In Progress, or Resolved).";
  }
  if (m.includes('how to file') || m.includes('file') || m.includes('complain')) {
    return "To file a complaint: 1) Go to Dashboard, 2) Fill the form with category, description, room number and priority, 3) Click Submit.";
  }
  if (m.includes('category')) {
    return "Complaint categories: Electrical, Plumbing, Furniture, Cleaning, or Other. Choose the most relevant one.";
  }
  if (m.includes('priority')) {
    return "Priority levels: Low (minor issues), Medium (needs fixing soon), High (urgent/emergency).";
  }
  if (m.includes('hello') || m.includes('hi') || m.includes('hey')) {
    return "Hello! I'm here to help with the hostel complaint system. Ask me about filing complaints, checking status, or any other query.";
  }
  if (m.includes('thank')) {
    return "You're welcome! Let me know if you need anything else.";
  }
  return "I'm here to help with the hostel complaint system. You can ask me about filing complaints, checking status, categories, or priority levels.";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your hostel assistant. Ask me about filing complaints, checking status, or any other query." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    
    try {
      const response = await getBotResponse([...messages, { role: 'user', content: userMsg }]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      const simpleResponse = getSimpleResponse(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: simpleResponse }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-full shadow-lg hover:bg-slate-700 transition-all hover:scale-110 z-50"
        title="Chat with assistant"
      >
        <MessageCircle size={28} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white border-2 border-slate-900 rounded-xl shadow-[8px_8px_0px_#1e293b] flex flex-col z-50 overflow-hidden">
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-semibold">Hostel Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-slate-700 p-1 rounded">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-pink-200' : 'bg-slate-200'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white border-2 border-slate-900'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-white border-2 border-slate-900 px-3 py-2 rounded-lg text-sm">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>
          
          <div className="p-3 border-t-2 border-slate-900 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 border-2 border-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-700 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}