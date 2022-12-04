import { MigrationInterface, QueryRunner } from "typeorm";

export class init1670168402077 implements MigrationInterface {
    name = 'init1670168402077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios"."rol_usuario" ("id_rol" integer NOT NULL, "id_usuario" integer NOT NULL, CONSTRAINT "PK_70f600c0a45051f987e9ce35641" PRIMARY KEY ("id_rol", "id_usuario"))`);
        await queryRunner.query(`CREATE TABLE "usuarios"."usuario" ("id" SERIAL NOT NULL, "email" character varying(150) NOT NULL, "usuario" character varying(150) NOT NULL, "nombre" character varying(255) NOT NULL, "apellido" character varying(255) NOT NULL, "activo" boolean NOT NULL DEFAULT true, "url_perfil" character varying(255) NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trazos"."trazo" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "cantidad_pasos" integer NOT NULL, "descripcion" text, "esta_terminado" boolean NOT NULL, "paso_actual" integer NOT NULL, "id_usuario" integer NOT NULL, "id_rol" integer NOT NULL, CONSTRAINT "PK_2befc8f85f0e4b4c982fc3ba067" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trazos"."paso" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "descripcion" text, "esta_terminado" boolean NOT NULL, "paso_numero" integer NOT NULL, "id_usuario" integer, "id_rol" integer, "id_trazo" integer NOT NULL, CONSTRAINT "PK_8e3282e393e6adc679129a5ccf5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios"."rol" ("id" SERIAL NOT NULL, "rol" character varying(20) NOT NULL, "descripcion" text, "es_publico" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guardados"."trazo_guardado" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "cantidad_pasos" integer NOT NULL, "descripcion" text, CONSTRAINT "PK_66c6bf116fc0486ec6f5bbe38bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guardados"."paso_guardado" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "descripcion" text, "paso_numero" integer NOT NULL, "id_rol" integer NOT NULL, "id_trazo_guardado" integer NOT NULL, CONSTRAINT "PK_e5fb4b00a09d2a03c927c12e52b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios"."casbin_rule" ("id" SERIAL NOT NULL, "ptype" character varying, "v0" character varying, "v1" character varying, "v2" character varying, "v3" character varying, "v4" character varying, "v5" character varying, "v6" character varying, CONSTRAINT "PK_e147354d31e2748a3a5da5e3060" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, "destroyedAt" TIMESTAMP, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_28c5d1d16da7908c97c9bc2f74" ON "session" ("expiredAt") `);
        await queryRunner.query(`ALTER TABLE "usuarios"."rol_usuario" ADD CONSTRAINT "FK_5162b3cd91a9144b2645a767179" FOREIGN KEY ("id_rol") REFERENCES "usuarios"."rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios"."rol_usuario" ADD CONSTRAINT "FK_42b1513078ccbeaafbfe2574f96" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trazos"."trazo" ADD CONSTRAINT "FK_a49d5a6f205a89caee5690bc6df" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trazos"."trazo" ADD CONSTRAINT "FK_43274fb5bf473c822ca83ba4dd5" FOREIGN KEY ("id_rol") REFERENCES "usuarios"."rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trazos"."paso" ADD CONSTRAINT "FK_23b2dfb4c472fa77a895554919f" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"."usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trazos"."paso" ADD CONSTRAINT "FK_ef1284729236ed89001e7d471eb" FOREIGN KEY ("id_rol") REFERENCES "usuarios"."rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trazos"."paso" ADD CONSTRAINT "FK_f8ffbdafe4dcd4d1717d3239dac" FOREIGN KEY ("id_trazo") REFERENCES "trazos"."trazo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guardados"."paso_guardado" ADD CONSTRAINT "FK_60d0a950c0d1b5737697b24cc44" FOREIGN KEY ("id_rol") REFERENCES "usuarios"."rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guardados"."paso_guardado" ADD CONSTRAINT "FK_8b3474ec2730817c4f6bfd59d3d" FOREIGN KEY ("id_trazo_guardado") REFERENCES "guardados"."trazo_guardado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guardados"."paso_guardado" DROP CONSTRAINT "FK_8b3474ec2730817c4f6bfd59d3d"`);
        await queryRunner.query(`ALTER TABLE "guardados"."paso_guardado" DROP CONSTRAINT "FK_60d0a950c0d1b5737697b24cc44"`);
        await queryRunner.query(`ALTER TABLE "trazos"."paso" DROP CONSTRAINT "FK_f8ffbdafe4dcd4d1717d3239dac"`);
        await queryRunner.query(`ALTER TABLE "trazos"."paso" DROP CONSTRAINT "FK_ef1284729236ed89001e7d471eb"`);
        await queryRunner.query(`ALTER TABLE "trazos"."paso" DROP CONSTRAINT "FK_23b2dfb4c472fa77a895554919f"`);
        await queryRunner.query(`ALTER TABLE "trazos"."trazo" DROP CONSTRAINT "FK_43274fb5bf473c822ca83ba4dd5"`);
        await queryRunner.query(`ALTER TABLE "trazos"."trazo" DROP CONSTRAINT "FK_a49d5a6f205a89caee5690bc6df"`);
        await queryRunner.query(`ALTER TABLE "usuarios"."rol_usuario" DROP CONSTRAINT "FK_42b1513078ccbeaafbfe2574f96"`);
        await queryRunner.query(`ALTER TABLE "usuarios"."rol_usuario" DROP CONSTRAINT "FK_5162b3cd91a9144b2645a767179"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_28c5d1d16da7908c97c9bc2f74"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "usuarios"."casbin_rule"`);
        await queryRunner.query(`DROP TABLE "guardados"."paso_guardado"`);
        await queryRunner.query(`DROP TABLE "guardados"."trazo_guardado"`);
        await queryRunner.query(`DROP TABLE "usuarios"."rol"`);
        await queryRunner.query(`DROP TABLE "trazos"."paso"`);
        await queryRunner.query(`DROP TABLE "trazos"."trazo"`);
        await queryRunner.query(`DROP TABLE "usuarios"."usuario"`);
        await queryRunner.query(`DROP TABLE "usuarios"."rol_usuario"`);
    }

}
