import { generateResults } from "./requests/request";
import parseForInput from "./utils/parser";

const sendResponse = (message: string) => new Response(message);

async function handleRequest(request: Request) {
    try {
        const rep = await request.text();
        const val = parseForInput(rep);
        const results = await generateResults(val[0], val[1].replace("%3A", ":"), val[2].replace("%3A", ":"));
        return sendResponse(results);
    } catch (e) {
        return sendResponse(`:face_with_head_bandage: ${(e as Error).message}`);
    }
}

addEventListener("fetch", (event: any) =>
    event.respondWith(handleRequest(event.request))
);
