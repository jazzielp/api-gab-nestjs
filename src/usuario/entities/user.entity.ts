import { Column } from 'typeorm';

import { ROLES } from '../../constants/roles';
import { BaseEntity } from '../../config/base.entity';

export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  fisrtname: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  lastname: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;
  @Column({ type: 'enum', enum: ROLES, default: ROLES.BASIC })
  role: ROLES;
  @Column({ default: true })
  status: boolean;
}
