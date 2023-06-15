import { Entity, Index, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../config/base.entity';
import { Company } from './company.entity';
import { User } from '../../usuario/entities/user.entity';

@Entity('company_by_user')
@Index(['company', 'user'], { unique: true })
export class CompanyByUser extends BaseEntity {
  @ManyToOne(() => Company, (company) => company.companyByUser)
  company: number;

  @ManyToOne(() => User, (user) => user.companyByUser)
  user: number;
}
