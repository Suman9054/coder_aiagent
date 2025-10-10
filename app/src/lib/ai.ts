import { Ollama } from "@langchain/ollama";


export const llm = new Ollama({
    model:"qwen3",
    temperature:0,
    maxRetries:2,
    
})


