import { llm } from "@/lib/ai";
import { systemPrompt, viteprompt } from "@/lib/prompt";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai/agent")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { query } = await request.json();

          const response = await llm.stream([
            { role: "system", content: systemPrompt() },
            {
              role: "developer",
              content:
                "make the app good looking and modern with modern frameworks, read the system prompt properly and follow the response pattern as described in the system prompt",
            },
            { role: "assistant", content: viteprompt() },
            { role: "user", content: query },
          ]);

          const encoder = new TextEncoder();
          
          const stream = new ReadableStream({
            async start(controller) {
              try {
                for await (const chunk of response) {
                    controller.enqueue(encoder.encode(chunk));
                }
                controller.close();
              } catch (error) {
                console.error("Stream error:", error);
                controller.error(error);
              }
            },
          });

          return new Response(stream, {
            status: 200,
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              "Connection": "keep-alive",
              "X-Accel-Buffering": "no", // Disable nginx buffering
            },
          });
        } catch (e) {
          console.error("Handler error:", e);
          return new Response(JSON.stringify({ err: String(e) }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});