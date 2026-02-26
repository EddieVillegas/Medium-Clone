import { Controller, Post, UseGuards, Body, Param, Get } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { User } from "@app/user/decorators/user.decorator";
import { UserEntity } from "@app/user/user.entity";
import { ArticleRespose } from "./types/articleResponse.interface";

@Controller('articles')
export class ArticleController {

    constructor(
        private readonly articleService: ArticleService
    ){}

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @User() currentUser: UserEntity,
        @Body('article') createArticleDto: CreateArticleDto
    ): Promise<ArticleRespose> {
        const article = await this.articleService.createAricle(
            currentUser, 
            createArticleDto
        )
        return this.articleService.buildArticleResponse(article)
    }

    @Get(':slug')
    async getSingleArticle(
        @Param('slug') slug: string
    ): Promise<ArticleRespose|null>{
        const article = await this.articleService.findBySlug(slug)
        return article 
        ? this.articleService.buildArticleResponse(article)
        : null
    }
}