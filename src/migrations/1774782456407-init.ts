import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1774782456407 implements MigrationInterface {
    name = 'Init1774782456407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense_groups" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "owner_id" integer, CONSTRAINT "PK_777b1df7969a9a0ed6ae4406548" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."expenses_split_type_enum" AS ENUM('EQUAL', 'EXACT', 'PERCENTAGE')`);
        await queryRunner.query(`CREATE TABLE "expenses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "split_type" "public"."expenses_split_type_enum" NOT NULL, "expense" numeric(10,2) NOT NULL, "group_id" integer, "created_by" integer, CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense_splits" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "paid" double precision NOT NULL, "owed" double precision NOT NULL, "expense_id" integer, "user_id" integer, CONSTRAINT "PK_67774a6f95e6b4acf7a5ce861b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense_users" ("expense_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_4f1b54ef2b7e979a78917434e45" PRIMARY KEY ("expense_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_621538b30998d448a21997c904" ON "expense_users" ("expense_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7dde0a8c2cc4a4d5049f630347" ON "expense_users" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "expense_groups" ADD CONSTRAINT "FK_76803b93fc9553125f6c6040737" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_d4e9271763ee685f5d746a4e550" FOREIGN KEY ("group_id") REFERENCES "expense_groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_7c0c012c2f8e6578277c239ee61" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense_splits" ADD CONSTRAINT "FK_a4c2e32db9bc4200aad335b93e5" FOREIGN KEY ("expense_id") REFERENCES "expenses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense_splits" ADD CONSTRAINT "FK_008dfb10e46b8d53061b0b6ac26" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense_users" ADD CONSTRAINT "FK_621538b30998d448a21997c904a" FOREIGN KEY ("expense_id") REFERENCES "expenses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expense_users" ADD CONSTRAINT "FK_7dde0a8c2cc4a4d5049f6303475" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_users" DROP CONSTRAINT "FK_7dde0a8c2cc4a4d5049f6303475"`);
        await queryRunner.query(`ALTER TABLE "expense_users" DROP CONSTRAINT "FK_621538b30998d448a21997c904a"`);
        await queryRunner.query(`ALTER TABLE "expense_splits" DROP CONSTRAINT "FK_008dfb10e46b8d53061b0b6ac26"`);
        await queryRunner.query(`ALTER TABLE "expense_splits" DROP CONSTRAINT "FK_a4c2e32db9bc4200aad335b93e5"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_7c0c012c2f8e6578277c239ee61"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_d4e9271763ee685f5d746a4e550"`);
        await queryRunner.query(`ALTER TABLE "expense_groups" DROP CONSTRAINT "FK_76803b93fc9553125f6c6040737"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dde0a8c2cc4a4d5049f630347"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_621538b30998d448a21997c904"`);
        await queryRunner.query(`DROP TABLE "expense_users"`);
        await queryRunner.query(`DROP TABLE "expense_splits"`);
        await queryRunner.query(`DROP TABLE "expenses"`);
        await queryRunner.query(`DROP TYPE "public"."expenses_split_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "expense_groups"`);
    }

}
