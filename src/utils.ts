export type NoteArticle = {
    id: number;
    key: string;
    name: string;
    publishAt: string;
    eyecatch: string;
    noteUrl: string;
    likeCount: number;
    body: string;
    hashtags: { hashtag: { name: string } }[];
};

type NoteApiResponse = {
    data: {
        contents: NoteArticle[];
        isLastPage: boolean;
        totalCount: number;
    };
};

export async function fetchNoteArticles(username: string, page = 1): Promise<NoteArticle[]> {
    const base = import.meta.env.VITE_NOTE_API_BASE ?? "/note-api";
    const res = await fetch(
        `${base}/api/v2/creators/${username}/contents?kind=note&page=${page}`
    );
    if (!res.ok) throw new Error(`Note API error: ${res.status}`);
    const json: NoteApiResponse = await res.json();
    return json.data.contents;
}

