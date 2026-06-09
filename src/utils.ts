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

export async function fetchNoteArticles(
    username: string,
    page = 1
): Promise<{ contents: NoteArticle[]; isLastPage: boolean }> {
    const base = import.meta.env.VITE_NOTE_API_BASE ?? "/note-api";
    const res = await fetch(
        `${base}/api/v2/creators/${username}/contents?kind=note&page=${page}`
    );
    if (!res.ok) throw new Error(`Note APIエラー: ${res.status}`);
    const json: NoteApiResponse = await res.json();
    return { contents: json.data.contents, isLastPage: json.data.isLastPage };
}

export async function fetchAllNoteArticles(username: string): Promise<NoteArticle[]> {
    const all: NoteArticle[] = [];
    let page = 1;
    // 念のため上限を設けて無限ループを防ぐ
    while (page <= 50) {
        const { contents, isLastPage } = await fetchNoteArticles(username, page);
        all.push(...contents);
        if (isLastPage || contents.length === 0) break;
        page += 1;
    }
    return all;
}

