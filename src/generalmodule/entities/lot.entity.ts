import { TYPE_LOT } from '../../constants/type-lot';
import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { LotCycle } from './lot-cycle.entity';

@Entity('lots')
@Unique(['name'])
export class Lot extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'enum', default: TYPE_LOT.LOT, enum: TYPE_LOT })
  type: TYPE_LOT;

  @OneToMany(() => LotCycle, (lotCycle) => lotCycle.lot)
  lotCycles: LotCycle[];
}
