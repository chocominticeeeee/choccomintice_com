import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
    const url = new URL(request.url);
    const targetPath = url.pathname.replace(/^\/note-api/, "");
    const targetUrl = `https://note.com${targetPath}${url.search}`;

    const response = await fetch(targetUrl, {
        headers: {
            Accept: "application/json, text/plain, */*",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Referer: "https://note.com/",
        },
    });

    const body = await response.text();

    return new Response(body, {
        status: response.status,
        headers: {
            "Content-Type": response.headers.get("Content-Type") ?? "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=300",
        },
    });
};

export const config = { path: "/note-api/*" };
