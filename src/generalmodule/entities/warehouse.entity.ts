import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { WarehouseByUser } from './warehouse-by-user.entity';

@Entity('warehouses')
@Unique(['name'])
export class Warehouse extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(
    () => WarehouseByUser,
    (warehouseByUser) => warehouseByUser.warehouse,
  )
  warehouseByUser: Warehouse[];
}
