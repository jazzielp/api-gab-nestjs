import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, Unique } from 'typeorm';

@Entity('warehouses')
@Unique(['name'])
export class Warehouse extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
