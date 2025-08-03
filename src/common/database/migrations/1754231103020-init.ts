import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1754231103020 implements MigrationInterface {
  name = 'Init1754231103020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "balance_change_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "user_id" uuid NOT NULL, "type" character varying(20) NOT NULL, "status" character varying(20) NOT NULL, "amount_value" numeric NOT NULL, "amount_currency" character varying(10) NOT NULL, "method" character varying(20) NOT NULL, "remarks" text, "approved_at" TIMESTAMP, "rejected_at" TIMESTAMP, "processed_at" TIMESTAMP, "reason" text, CONSTRAINT "PK_49eb8c72c9f0e9311fcb4be9342" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "balance_change_requests"`);
  }
}
