import { envVar } from "@/utils/envVar";

export default async function askAi(systemPrompt:any, question:any) {
    let data = await fetch('https://api.llm7.io/v1/chat/completions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                `Bearer ${envVar.AI_SECRET}`,

        },
        body: JSON.stringify({
            model: "default",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question },
            ],
        }),
    })
    let posts = await data.json()
    return posts;
}