import { Controller, Post, UseGuards, Body, Param, Get, Delete, HttpException, HttpStatus, Put, UsePipes, ValidationPipe, Query } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { User } from "@app/user/decorators/user.decorator";
import { UserEntity } from "@app/user/user.entity";
import { ArticleResponse, ArticlesResponse } from "./types/articleResponse.interface";
import { DeleteResult } from "typeorm";

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
    ): Promise<ArticleResponse> {
        const article = await this.articleService.createAricle(
            currentUser, 
            createArticleDto
        )
        return this.articleService.buildArticleResponse(article)
    }

    @Get(':slug')
    @UseGuards(AuthGuard)
    async getSingleArticle(
        @Param('slug') slug: string
    ): Promise<ArticleResponse|null>{
        const article = await this.articleService.findBySlug(slug)
        if(!article) throw new HttpException('Article not found', HttpStatus.NOT_FOUND)
        return this.articleService.buildArticleResponse(article)
    }

    @Delete(':slug')
    @UseGuards(AuthGuard)
    async deleteArticle(
        @User('id') currentUserId: number,
        @Param('slug') slug: string
    ): Promise<DeleteResult>{
        return this.articleService.deleteArticle(slug, currentUserId)
    }
    
    @Put(':slug')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateArticle(
        @User('id') currentUserId: number,
        @Param('slug') slug: string,
        @Body('article') updateArticle: CreateArticleDto
    ){
        const article = await this.articleService.updateArticle(
            slug,
            updateArticle,
            currentUserId
        )
        return this.articleService.buildArticleResponse(article)
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(
        @User('id') currentId: number,
        @Query() q: string
    ): Promise<ArticlesResponse>{
        return await this.articleService.findAll(currentId, q)
    }
}