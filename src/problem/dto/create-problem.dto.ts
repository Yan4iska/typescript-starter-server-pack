import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Category } from "src/category/entities/category.entity"
import { User } from "src/user/entities/user.entity"
import { Problem } from "../entities/problem.entity"
import { Case } from "src/case/entities/case.entity"

export class CreateProblemDto {
    @IsNotEmpty()
    @IsString()
    title: string
    @IsNotEmpty()
    @IsString()
    content: string
    @IsNotEmpty()
    category: Category
    @IsNotEmpty()
    case: Case
    @IsOptional()
    user: User
    parent: Problem

}
