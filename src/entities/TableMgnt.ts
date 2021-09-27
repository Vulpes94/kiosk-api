import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('table_mgnt')
export class TableMgnt {
  @PrimaryColumn({ nullable: false })
  table_no!: number;

  @Column({ nullable: false })
  table_name!: string;
}
