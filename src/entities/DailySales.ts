import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { MenuSlct } from './MenuSlct';

@Entity('dailysales')
export class DailySales {
  @Index('menu_name_idx')
  @ManyToOne(() => MenuSlct, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'menu_name' })
  menu_name!: string;

  @Column({ nullable: false })
  sales_quantity!: number;
}
