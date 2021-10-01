import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class InitialCreation1631105291051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns:[
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar"
                },
                {
                    name: "password",
                    type: "varchar"
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`)
    }

}
