import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';

@Module({
  controllers: [ProblemController],
  providers: [ProblemService],
  imports: [TypeOrmModule.forFeature([Problem])],
})
export class ProblemModule {}
