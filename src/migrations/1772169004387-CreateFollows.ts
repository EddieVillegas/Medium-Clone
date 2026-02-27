import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFollows1772169004387 implements MigrationInterface {
    name = 'CreateFollows1772169004387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followindId" integer NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "follows"`);
    }

}
