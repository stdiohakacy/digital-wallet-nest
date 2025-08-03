import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1754234486253 implements MigrationInterface {
  name = 'Initial1754234486253';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "balance_change_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "user_id" uuid NOT NULL, "type" character varying(20) NOT NULL, "status" character varying(20) NOT NULL, "amount_value" numeric NOT NULL, "amount_currency" character varying(10) NOT NULL, "method" character varying(20) NOT NULL, "remarks" text, "approved_at" TIMESTAMP, "rejected_at" TIMESTAMP, "processed_at" TIMESTAMP, CONSTRAINT "PK_49eb8c72c9f0e9311fcb4be9342" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ledger_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "wallet_id" uuid NOT NULL, "type" character varying(20) NOT NULL, "amount_value" numeric NOT NULL, "amount_currency" character varying(10) NOT NULL, "balance_after" numeric NOT NULL, "timestamp" TIMESTAMP NOT NULL, "remark" text, "source_ref" uuid, CONSTRAINT "PK_6efcb84411d3f08b08450ae75d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "wallets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" TIMESTAMP NOT NULL DEFAULT now(), "created_user_id" uuid NOT NULL, "updated_date" TIMESTAMP DEFAULT now(), "updated_user_id" uuid, "deleted_date" TIMESTAMP, "deleted_user_id" uuid, "user_id" uuid NOT NULL, "balance_value" numeric NOT NULL, "balance_currency" character varying(10) NOT NULL, CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ledger_entries" ADD CONSTRAINT "FK_bb5cd6d7046b98d8faabe9c18fe" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ledger_entries" ADD CONSTRAINT "FK_01a991fe49410647bda5bbb5fc9" FOREIGN KEY ("source_ref") REFERENCES "balance_change_requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ledger_entries" DROP CONSTRAINT "FK_01a991fe49410647bda5bbb5fc9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ledger_entries" DROP CONSTRAINT "FK_bb5cd6d7046b98d8faabe9c18fe"`,
    );
    await queryRunner.query(`DROP TABLE "wallets"`);
    await queryRunner.query(`DROP TABLE "ledger_entries"`);
    await queryRunner.query(`DROP TABLE "balance_change_requests"`);
  }
}
