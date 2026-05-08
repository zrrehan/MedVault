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
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const sendMessage = async () => {
        const question = input.trim();
        if (!question || isLoading) return;

        setInput("");
        setIsLoading(true);
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
            const answer =
                data.choices?.[0]?.message?.content ?? "No response received.";

            setChat({ question, answer, isLoading: false });
        } catch {
            setChat({
                question,
                answer: "Connection error. Please try again.",
                isLoading: false,
            });
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
        setInput("");
        inputRef.current?.focus();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 flex flex-col overflow-hidden shadow-sm">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-4M9 3h6m-6 0a2 2 0 00-2 2v1m8-3a2 2 0 012 2v1m0 0H9m6-3v4m0 0H9" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-black">Medicine AI</p>
                            <p className="text-xs text-gray-400">{medicine.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {chat && (
                            <button
                                onClick={resetChat}
                                className="p-1.5 text-gray-400 hover:text-black transition-colors rounded-md hover:bg-gray-100"
                                title="Reset"
                            >
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-1.5 text-gray-400 hover:text-black transition-colors rounded-md hover:bg-gray-100"
                        >
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 min-h-[260px] max-h-[320px] overflow-y-auto px-5 py-4 flex flex-col gap-3">
                    {!chat ? (
                        <div className="flex flex-col items-center justify-center h-full py-10 text-center gap-2">
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
                            {/* User Question — right aligned */}
                            <div className="flex justify-end">
                                <div className="bg-black text-white text-sm px-4 py-2.5 rounded-[18px] rounded-br-[4px] max-w-[80%] leading-relaxed">
                                    {chat.question}
                                </div>
                            </div>

                            {/* AI Answer — left aligned */}
                            <div className="flex justify-start">
                                <div className="bg-gray-50 border border-gray-100 text-black text-sm px-4 py-2.5 rounded-[18px] rounded-bl-[4px] max-w-[80%] leading-relaxed">
                                    {chat.isLoading ? (
                                        <div className="flex gap-1 items-center py-1">
                                            {[0, 1, 2].map((i) => (
                                                <span
                                                    key={i}
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
                        className="w-9 h-9 rounded-lg bg-black flex items-center justify-center flex-shrink-0 hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}