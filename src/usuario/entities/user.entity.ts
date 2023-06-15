import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';

import { ROLES } from '../../constants/roles';
import { BaseEntity } from '../../config/base.entity';
import { CompanyByUser } from '../../generalmodule/entities/company-by-user.entity';

@Entity('users')
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.BASIC })
  role: ROLES;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => CompanyByUser, (companyByUser) => companyByUser.user)
  companyByUser: CompanyByUser[];
}
