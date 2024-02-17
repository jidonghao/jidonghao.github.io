interface ArticleStructure {
    [key: string]: string[];
}

function extractArticleStructure(article: string): ArticleStructure {
    const regex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
    const matches = article.matchAll(regex);
    const structure: ArticleStructure = {};

    for (const match of matches) {
        const tag = match[0];
        const level = match[1];
        const content = match[2].trim();

        if (!structure[`h${level}`]) {
            structure[`h${level}`] = [];
        }

        structure[`h${level}`].push(content);
    }

    return structure;
}

export default {
    extractArticleStructure
}
