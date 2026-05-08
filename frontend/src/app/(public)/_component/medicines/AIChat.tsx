"use client";
import { useState, useRef, useEffect } from "react";
import askAi from "../../action/askAi";

interface Medicine {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
    seller_id: string;
    category: string[];
    is_active: boolean;
    manufacturer: string;
    image: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface MedicineAIModalProps {
    medicine: any;
    onClose: () => void;
}

interface ChatState {
    question: string;
    answer: string;
    isLoading: boolean;
}

export default function AiChat({ medicine, onClose }: MedicineAIModalProps) {
    const [input, setInput] = useState("");
    const [chat, setChat] = useState<ChatState | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [animateQ, setAnimateQ] = useState(false);
    const [animateA, setAnimateA] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (chat?.question) {
            setAnimateQ(false);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimateQ(true));
            });
        }
    }, [chat?.question]);

    useEffect(() => {
        if (chat && !chat.isLoading) {
            setAnimateA(false);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimateA(true));
            });
        }
    }, [chat?.isLoading]);

    const sendMessage = async () => {
        const question = input.trim();
        if (!question || isLoading) return;

        setInput("");
        setIsLoading(true);
        setAnimateQ(false);
        setAnimateA(false);
        setChat({ question, answer: "", isLoading: true });

        const systemPrompt = `You are a helpful medical AI assistant. The user is asking about this specific medicine:
Name: ${medicine.name}
Description: ${medicine.description}
Categories: ${medicine.category.join(", ")}
Manufacturer: ${medicine.manufacturer}
Price: ${medicine.price} BDT
Stock: ${medicine.stockQuantity} units

Answer the user's question concisely and clearly in 2-4 sentences. Be accurate and helpful. And if he ask anything outside this medicine or something you are not sure about just reply "I don't know, please consult a doctor or pharmacist for this."`;

        try {
            const data = await askAi(systemPrompt, question);
            const answer = data.choices?.[0]?.message?.content ?? "No response received.";
            setChat({ question, answer, isLoading: false });
        } catch {
            setChat({ question, answer: "Connection error. Please try again.", isLoading: false });
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage();
    };

    const resetChat = () => {
        setChat(null);
        setAnimateQ(false);
        setAnimateA(false);
        setInput("");
        inputRef.current?.focus();
    };

    return (
        <>
            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(24px) scale(0.97); }
                    to   { opacity: 1; transform: translateX(0)   scale(1);    }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-24px) scale(0.97); }
                    to   { opacity: 1; transform: translateX(0)     scale(1);    }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.96) translateY(12px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0);    }
                }
                @keyframes backdropIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                .modal-enter    { animation: modalIn    0.25s cubic-bezier(0.34,1.56,0.64,1) forwards; }
                .backdrop-enter { animation: backdropIn 0.2s ease forwards; }
                .slide-right    { animation: slideInRight 0.3s cubic-bezier(0.34,1.2,0.64,1) forwards; }
                .slide-left     { animation: slideInLeft  0.3s cubic-bezier(0.34,1.2,0.64,1) forwards; }
                .fade-up        { animation: fadeInUp     0.25s ease forwards; }

                .send-btn { transition: transform 0.15s ease, background 0.2s ease; }
                .send-btn:hover:not(:disabled) { transform: scale(1.08); }
                .send-btn:active:not(:disabled) { transform: scale(0.94); }

                .close-btn { transition: transform 0.15s ease, color 0.2s ease; }
                .close-btn:hover { transform: rotate(90deg); color: black; }
            `}</style>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] backdrop-enter">
                <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 flex flex-col overflow-hidden shadow-lg modal-enter">

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-black">Medicine AI</p>
                                <p className="text-xs text-gray-400">{medicine.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {chat && (
                                <button onClick={resetChat} title="Reset"
                                    className="p-1.5 text-gray-400 hover:text-black transition-colors rounded-md hover:bg-gray-100">
                                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>
                            )}
                            <button onClick={onClose} className="close-btn p-1.5 text-gray-400 rounded-md hover:bg-gray-100">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 min-h-[260px] max-h-[320px] overflow-y-auto px-5 py-4 flex flex-col gap-3">
                        {!chat ? (
                            <div className="flex flex-col items-center justify-center h-full py-10 text-center gap-2 fade-up">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-black">Ask about this medicine</p>
                                <p className="text-xs text-gray-400">Side effects, dosage, interactions & more</p>
                            </div>
                        ) : (
                            <>
                                {/* User Question */}
                                <div className={`flex justify-end ${animateQ ? "slide-right" : "opacity-0"}`}>
                                    <div className="bg-black text-white text-sm px-4 py-2.5 rounded-[18px] rounded-br-[4px] max-w-[80%] leading-relaxed shadow-sm">
                                        {chat.question}
                                    </div>
                                </div>

                                {/* AI Answer */}
                                <div className={`flex justify-start ${chat.isLoading ? "opacity-100" : animateA ? "slide-left" : "opacity-0"}`}>
                                    <div className="bg-gray-50 border border-gray-100 text-black text-sm px-4 py-2.5 rounded-[18px] rounded-bl-[4px] max-w-[80%] leading-relaxed shadow-sm">
                                        {chat.isLoading ? (
                                            <div className="flex gap-1 items-center py-1">
                                                {[0, 1, 2].map((i) => (
                                                    <span key={i}
                                                        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                                                        style={{ animationDelay: `${i * 0.15}s` }}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            chat.answer
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="px-5 py-4 border-t border-gray-100 flex gap-2 items-center">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            placeholder="Ask anything about this medicine..."
                            className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-black placeholder-gray-400 outline-none focus:border-gray-400 focus:bg-white transition-colors disabled:opacity-50"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            className="send-btn w-9 h-9 rounded-lg bg-black flex items-center justify-center flex-shrink-0 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}