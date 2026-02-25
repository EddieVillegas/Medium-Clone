import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import { TagEntity } from "@app/tag/tag.entity"
import { UserEntity } from "@app/user/user.entity"
import {CreateUsers1771949121862 as CreateUsers} from "@app/migrations/1771949121862-CreateUsers"
import {AddUsernameToUsers1771958555670 as AddUsernameToUsers} from "@app/migrations/1771958555670-AddUsernameToUsers"
import {CreateArticles1772055023756 as CreateArticles} from '@app/migrations/1772055023756-CreateArticles'
import { ArticleEntity } from "@app/article/article.entity"
import { AddRelationsBetweenArticleAndUser1772057855827 as AddRelationBetweenArticleAndUser } from '@app/migrations/1772057855827-AddRelationsBetweenArticleAndUser'

const config: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: "db",
    entities: [TagEntity, UserEntity, ArticleEntity],
    synchronize: false,
    migrations: [CreateUsers, AddUsernameToUsers, CreateArticles, AddRelationBetweenArticleAndUser]
}

export default config