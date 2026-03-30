import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGroupMembers1774796174431 implements MigrationInterface {
    name = 'AddGroupMembers1774796174431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense_group_members" ("expense_group_id" integer NOT NULL, "member_id" integer NOT NULL, CONSTRAINT "PK_4bb3245c558e6b9085401caa8c8" PRIMARY KEY ("expense_group_id", "member_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ac1f2c38b46e267bccbdb5271" ON "expense_group_members" ("expense_group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ad065c816530919d02bf4228d" ON "expense_group_members" ("member_id") `);
        await queryRunner.query(`ALTER TABLE "expense_group_members" ADD CONSTRAINT "FK_6ac1f2c38b46e267bccbdb5271c" FOREIGN KEY ("expense_group_id") REFERENCES "expense_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "expense_group_members" ADD CONSTRAINT "FK_4ad065c816530919d02bf4228d8" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_group_members" DROP CONSTRAINT "FK_4ad065c816530919d02bf4228d8"`);
        await queryRunner.query(`ALTER TABLE "expense_group_members" DROP CONSTRAINT "FK_6ac1f2c38b46e267bccbdb5271c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ad065c816530919d02bf4228d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ac1f2c38b46e267bccbdb5271"`);
        await queryRunner.query(`DROP TABLE "expense_group_members"`);
    }

}
