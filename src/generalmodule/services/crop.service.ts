import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { CreateCropDto, UpdateCropDto } from '../dto/crop.dto';
import { Crop } from '../entities/crop.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>, //Injection to use the repository of the entity
  ) {}

  //Crate
  // ...........................................................................
  async create(createCropDto: CreateCropDto) {
    try {
      return await this.cropRepository.save(createCropDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findAll
  // ...........................................................................
  async findAll(): Promise<Crop[]> {
    try {
      const crops: Crop[] = await this.cropRepository.find();
      if (!crops || crops.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Crops not found',
        });
      }
      return crops;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findOne
  // ...........................................................................
  async findOne(id: number): Promise<Crop> {
    try {
      const crop: Crop = await this.cropRepository.findOne({
        relations: ['lotCycles'],
        where: { id },
      });
      if (!crop) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Crop not found',
        });
      }
      return crop;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //update
  // ...........................................................................
  async update(
    id: number,
    updateCropDto: UpdateCropDto,
  ): Promise<UpdateResult> {
    try {
      const crop: UpdateResult = await this.cropRepository.update(
        id,
        updateCropDto,
      );
      if (crop.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return crop;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //remove
  // ...........................................................................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const crop: DeleteResult = await this.cropRepository.delete(id);
      if (crop.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return crop;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
