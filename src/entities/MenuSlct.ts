import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('menu_slct')
export class MenuSlct {
  @PrimaryColumn({ nullable: false })
  menu_name!: string;

  @Column({ nullable: false })
  menu_price!: number;

  @Column({ nullable: false })
  menu_stock!: number;
}
