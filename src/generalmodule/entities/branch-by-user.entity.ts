import { Entity, Index, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../config/base.entity';
import { User } from '../../usuario/entities/user.entity';
import { Branch } from './branch.entity';

@Entity('branch_by_user')
@Index(['branch', 'user'], { unique: true })
export class BranchByUser extends BaseEntity {
  @ManyToOne(() => Branch, (branch) => branch.branchByUser)
  branch: number;

  @ManyToOne(() => User, (user) => user.companyByUser)
  user: number;
}
