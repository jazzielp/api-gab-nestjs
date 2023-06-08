import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, Unique } from 'typeorm';

@Entity('branches')
@Unique(['name'])
export class Branch extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
