import { anthropic } from "@ai-sdk/anthropic";
import { streamObject } from "ai";
import { PlanInputSchema, PlanSchema } from "@/lib/plan/schema";
import { SYSTEM_PROMPT, composeUserPrompt } from "@/lib/plan/prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "ANTHROPIC_API_KEY is not set. Add it to .env.local for local dev or to the Vercel project settings.",
      }),
      { status: 503, headers: { "content-type": "application/json" } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const parsed = PlanInputSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Invalid input", issues: parsed.error.issues }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  const result = streamObject({
    model: anthropic("claude-sonnet-4-6"),
    schema: PlanSchema,
    system: SYSTEM_PROMPT,
    prompt: composeUserPrompt(parsed.data),
    providerOptions: {
      anthropic: {
        cacheControl: { type: "ephemeral" },
      },
    },
  });

  return result.toTextStreamResponse();
}
