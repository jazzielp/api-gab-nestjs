import { Entity, Column, ManyToOne, Index } from 'typeorm';

import { BaseEntity } from '../../config/base.entity';
import { Lot } from './lot.entity';
import { Cycle } from './cycle.entity';
import { Crop } from './crop.entity';

@Entity('lot_cycles')
@Index(['lot', 'cycle', 'crop'], { unique: true })
export class LotCycle extends BaseEntity {
  @ManyToOne(() => Lot, (lot) => lot.lotCycles)
  lot: number;

  @ManyToOne(() => Cycle, (cycle) => cycle.lotCycles)
  cycle: number;

  @ManyToOne(() => Crop, (crop) => crop.lotCycles)
  crop: number;

  @Column({ type: 'int', nullable: false })
  haston: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
