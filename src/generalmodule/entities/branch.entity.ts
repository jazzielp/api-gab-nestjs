import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { BranchByUser } from './branch-by-user.entity';

@Entity('branches')
@Unique(['name'])
export class Branch extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => BranchByUser, (branchByUser) => branchByUser.branch)
  branchByUser: Branch[];
}
