import { ArticleEntity } from "../article.entity";

export interface ArticleResponse {
    article: ArticleEntity
}

export interface ArticlesResponse {
    articles: ArticleEntity[]
    articlesCount: number
}