import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavoritesRelationsBetweenArticleAndUser1772152768210 implements MigrationInterface {
    name = 'AddFavoritesRelationsBetweenArticleAndUser1772152768210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_favorires_articles" ("usersId" integer NOT NULL, "articlesId" integer NOT NULL, CONSTRAINT "PK_3ede857074ecfa4e1d6b22ed294" PRIMARY KEY ("usersId", "articlesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f0dc420cd03ee9f12d78a7d60f" ON "users_favorires_articles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9b29b5ad1fadf7ccb599e7c48c" ON "users_favorires_articles" ("articlesId") `);
        await queryRunner.query(`ALTER TABLE "users_favorires_articles" ADD CONSTRAINT "FK_f0dc420cd03ee9f12d78a7d60fc" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorires_articles" ADD CONSTRAINT "FK_9b29b5ad1fadf7ccb599e7c48c6" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorires_articles" DROP CONSTRAINT "FK_9b29b5ad1fadf7ccb599e7c48c6"`);
        await queryRunner.query(`ALTER TABLE "users_favorires_articles" DROP CONSTRAINT "FK_f0dc420cd03ee9f12d78a7d60fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9b29b5ad1fadf7ccb599e7c48c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0dc420cd03ee9f12d78a7d60f"`);
        await queryRunner.query(`DROP TABLE "users_favorires_articles"`);
    }

}
