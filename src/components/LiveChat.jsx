import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MessageCircle } from 'lucide-react';

const LiveChat = () => {
    const [messages, setMessages] = useState([
        { id: 1, user: 'Instructor', text: 'Welcome to the live session on Advanced React Patterns!', isInstructor: true, time: '10:00 AM' },
        { id: 2, user: 'Sarah', text: 'Excited to be here!', isInstructor: false, time: '10:01 AM' },
        { id: 3, user: 'Alex', text: 'Will we cover Server Components today?', isInstructor: false, time: '10:02 AM' },
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = {
            id: Date.now(),
            user: 'You',
            text: input,
            isInstructor: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInput('');

        // Simulate AI/Instructor response
        if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    user: 'Instructor',
                    text: 'Hello! Glad you could join us.',
                    isInstructor: true,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
            }, 1500);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageCircle className="text-indigo-600 w-5 h-5" />
                    <h3 className="font-bold text-gray-800 dark:text-white">Live Chat</h3>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-gray-500 font-medium">124 Online</span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-1.5 mb-1">
                            <span className={`text-xs font-bold ${msg.isInstructor ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>
                                {msg.user}
                            </span>
                            <span className="text-[10px] text-gray-400">{msg.time}</span>
                        </div>
                        <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                            msg.user === 'You' 
                                ? 'bg-indigo-600 text-white rounded-tr-none' 
                                : msg.isInstructor 
                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-gray-800 dark:text-indigo-100 border border-indigo-100 dark:border-indigo-800 rounded-tl-none'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Send a message..."
                        className="w-full pl-4 pr-12 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors disabled:opacity-50"
                        disabled={!input.trim()}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LiveChat;
