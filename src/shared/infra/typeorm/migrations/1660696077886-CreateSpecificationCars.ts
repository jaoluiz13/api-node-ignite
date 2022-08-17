import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSpecificationCars1660696077886
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specification_cars",
        columns: [
          { name: "car_id", type: "uuid" },
          { name: "specification_id", type: "uuid" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "specification_cars",
      new TableForeignKey({
        name: "FKSpecificationCar",
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        columnNames: ["specification_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
    await queryRunner.createForeignKey(
      "specification_cars",
      new TableForeignKey({
        name: "FKCarSpecification",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "specificarions_cars",
      "FKCarSpecification"
    );
    await queryRunner.dropForeignKey(
      "specificarions_cars",
      "FKSpecificationCar"
    );
    await queryRunner.dropTable("specificarions_cars");
  }
}
