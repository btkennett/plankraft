import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export const runtime = "nodejs";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(req: Request): Promise<Response> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new Response(
      JSON.stringify({
        error:
          "BLOB_READ_WRITE_TOKEN is not set. Provision a Vercel Blob store and add the token to .env.local (or Vercel project env).",
      }),
      { status: 503, headers: { "content-type": "application/json" } },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await req.json()) as HandleUploadBody;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ACCEPTED,
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: true,
        // anonymous public uploads — portfolio scope; bump to authenticated upload
        // before any production launch
        tokenPayload: JSON.stringify({ scope: "inspiration" }),
      }),
      onUploadCompleted: async () => {
        // No durable record-keeping in this phase.
        // Phase 8: optionally hook up KV to track uploads for moderation / TTL purge.
      },
    });
    return Response.json(json);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Upload failed." }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }
}
