import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { LotCycle } from './lot-cycle.entity';

@Entity('cycles')
@Unique(['cycle'])
export class Cycle extends BaseEntity {
  @Column({ type: 'varchar', length: 10, nullable: false })
  cycle: string;

  @Column({ type: 'date', name: 'start_date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date', nullable: false })
  endDate: Date;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => LotCycle, (lotCycle) => lotCycle.cycle)
  lotCycles: LotCycle[];
}
