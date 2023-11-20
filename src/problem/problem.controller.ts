import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Req, Query } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  // url/problems/pagination?page=1&limit=3
  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(@Req() req, @Query('page') page: number = 1, @Query('limit') limit: number = 3){
    return this.problemService.findAllWithPagination(+req.user.id, +page, +limit)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createProblemDto: CreateProblemDto, @Req() req) {
    return this.problemService.create(createProblemDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.problemService.findAll(+req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.problemService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemService.update(+id, updateProblemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.problemService.remove(+id);
  }

  
}
