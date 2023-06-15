import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { CompanyByUser } from './company-by-user.entity';

@Entity('companies')
@Unique(['name'])
export class Company extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => CompanyByUser, (companyByUser) => companyByUser.company)
  companyByUser: CompanyByUser[];
}
