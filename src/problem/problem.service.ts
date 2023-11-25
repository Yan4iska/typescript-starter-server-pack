import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
  ){}

  async create(createProblemDto: CreateProblemDto, id: number) {
    const newProblem = {
      title: createProblemDto.title,
      content: createProblemDto.content,
      category: {id: +createProblemDto.category},
      case: {id: +createProblemDto.case},
      user: {id: id},
      parent: createProblemDto.parent? {id: +createProblemDto.parent} : null,
      
    }

    if(!newProblem)
      throw new BadRequestException('Something went wrong...')
    return await this.problemRepository.save(newProblem)
  }

  

  async findAll(id: number) {
    return await this.problemRepository.find({
      where: {
        user: {id:id},
      },
      relations:{
        parent: true
      },
      order:{
        createdAt: 'DESC',
      }
    })
  }

  async findOne(id: number) {
    const problem =  await this.problemRepository.findOne({
      where:{
        id:id,
      },
      relations:{
        parent: true
      }
    });
    if(!problem) throw new NotFoundException('Problem not found!')
    return problem
  }

  async update(id: number, updateProblemDto: UpdateProblemDto) {
    const problem = await this.problemRepository.findOne({
      where:{
        id:id,
      },
    })
    if(!problem) throw new NotFoundException('Problem not found!')

    return await this.problemRepository.update(id, updateProblemDto);
  }

  async remove(id: number) {
    const problem = await this.problemRepository.findOne({
      where:{
        id:id,
      },
    })
    if(!problem) throw new NotFoundException('Problem not found!')
    return await this.problemRepository.delete(id)
  }

  async findAllWithPagination(id: number, page: number, limit:number){
    const problems = await this.problemRepository.find({
      where: {
        user: {id:id}
      },
      relations:{
        parent: true,
        category: true,
        case: true,
        user: true
      },
      order: {
        createdAt: 'DESC'
      },
      take: limit,
      skip: (page-1)*limit
    })

    return problems
  }
}
