import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { LotCycle } from './lot-cycle.entity';

@Entity('crops')
@Unique(['name'])
export class Crop extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'boolean', default: true })
  isCrop: boolean;

  @OneToMany(() => LotCycle, (lotCycles) => lotCycles.crop)
  lotCycles: LotCycle[];
}
