import { PartialType } from '@nestjs/swagger';
import { CreateGeneralmoduleDto } from './create-generalmodule.dto';

export class UpdateGeneralmoduleDto extends PartialType(CreateGeneralmoduleDto) {}
