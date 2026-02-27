import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { ArticleEntity } from "./article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@app/user/user.entity";
import { ArticleResponse, ArticlesResponse } from "./types/articleResponse.interface";
import slugify from "slugify";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepo: Repository<ArticleEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ){}

    async createAricle(
        currentUser: UserEntity,
        createArticleDto: CreateArticleDto
    ): Promise<ArticleEntity>{
        const article = new ArticleEntity()
        Object.assign(article, createArticleDto)
        if(!article.tagList) article.tagList = []
        article.author = currentUser
        article.slug = this.getSlug(createArticleDto.title)
        return await this.articleRepo.save(article)
    }

    buildArticleResponse(
        article: ArticleEntity
    ): ArticleResponse {
        return {article}
    }

    private getSlug(title: string): string {
        return(
            slugify(title, {lower: true}) + '-' + 
            ((Math.random() * Math.pow(36,6)) | 0).toString()
        )
    }

    findBySlug(
        slug: string
    ): Promise<ArticleEntity | null> {
        const article = this.articleRepo.findOne({
            where: {
                slug
            }
        })
        return article
    }

    async deleteArticle(
        slug: string,
        currentUserId: number,
    ): Promise<DeleteResult>{
        const article = await this.findBySlug(slug)
        if(!article) throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND)
        if(article.author.id !== currentUserId) throw new HttpException('You are not an author', HttpStatus.FORBIDDEN)
        return this.articleRepo.delete({ slug: article.slug })
    }

    async updateArticle(
        slug: string,
        updateArticle: CreateArticleDto,
        currentUserId: number,
    ){
        const article = await this.findBySlug(slug)
        if(!article) throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND)
        if(article.author.id !== currentUserId) throw new HttpException('You are not an author', HttpStatus.FORBIDDEN)
        Object.assign(article, updateArticle)
        return this.articleRepo.save(article)
    }

    async findAll(
        currentUserId: number,
        q: any
    ): Promise<ArticlesResponse>{
        const queryBuilder = await this.articleRepo
            .createQueryBuilder('articles')
            .leftJoinAndSelect('articles.author', 'author ')
            .orderBy('articles.author', 'ASC')

        if(q.tag){
            queryBuilder.andWhere('articles.tagList LIKE :tag', {
                tag: `%${q.tag}`
            })
        }

        if(q.author){
            const author = await this.userRepo.findOne({
                where: {
                    username: q.author
                }
            })
            queryBuilder.andWhere('articles.authorId = :id', {
                id:  author?.id
            })
        }

        if(q.limit){
            queryBuilder.limit(q.limit)
        }

        if(q.offset){
            queryBuilder.offset(q.offset)
        }

        const articles = await queryBuilder.getMany()
        const articlesCount = await queryBuilder.getCount()

        return {articles, articlesCount}
    }
}