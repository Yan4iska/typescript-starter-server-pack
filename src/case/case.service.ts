import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case } from './entities/case.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(Case)
    
    private readonly caseRepository: Repository<Case>
  ){}

  async create(createCaseDto: CreateCaseDto, id:number) {
    const isExist = await this.caseRepository.findBy({
      user: {id},
      title: createCaseDto.title,
    })

    if(isExist.length) throw new BadRequestException('This case already exist!')
    const newCase = {
  title: createCaseDto.title,
  user:{
    id:id,
  },
  }
    return this.caseRepository.save(newCase);
  }

  async findAll(id: number) {
    return await this.caseRepository.find({
      where:{
        user: {id},
      },
      relations:{
        problems:true,
      }
    })
  }

  async findOne(id: number) {
    const thisCase = await this.caseRepository.findOne({
      where:{
        id:id,
      },
      relations:{
        user: true,
        problems: true,
      }
    })

    if(!thisCase) throw new NotFoundException('Case not found!')
    return thisCase;
  }

  async update(id: number, updateCaseDto: UpdateCaseDto) {
    const thisCase = await this.caseRepository.findOne({
      where:{id:id},

    })

    if(!thisCase) throw new NotFoundException('case not found!')

    return await this.caseRepository.update(id, updateCaseDto);
  }

  async remove(id: number) {
    const thisCase = await this.caseRepository.findOne({
      where:{id},
    })
    if(!thisCase) throw new NotFoundException('case not found!')
    return await this.caseRepository.delete(id)
  }
}
