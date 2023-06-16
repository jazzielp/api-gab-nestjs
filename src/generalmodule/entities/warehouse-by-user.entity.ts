import { Entity, Index, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../config/base.entity';
import { User } from '../../usuario/entities/user.entity';
import { Warehouse } from './warehouse.entity';

@Entity('warehouse_by_user')
@Index(['warehouse', 'user'], { unique: true })
export class WarehouseByUser extends BaseEntity {
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.warehouseByUser)
  warehouse: number;

  @ManyToOne(() => User, (user) => user.companyByUser)
  user: number;
}
