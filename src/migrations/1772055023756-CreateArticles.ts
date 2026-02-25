import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticles1772055023756 implements MigrationInterface {
    name = 'CreateArticles1772055023756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "tagLigs" TO "tagList"`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "tagList" TO "tagLigs"`);
    }

}
