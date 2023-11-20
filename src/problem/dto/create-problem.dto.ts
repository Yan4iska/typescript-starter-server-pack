import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Category } from "src/category/entities/category.entity"
import { User } from "src/user/entities/user.entity"
import { Problem } from "../entities/problem.entity"

export class CreateProblemDto {
    @IsNotEmpty()
    @IsString()
    title: string
    @IsNotEmpty()
    @IsString()
    content: string
    @IsNotEmpty()
    category: Category
    @IsOptional()
    user: User
    parent: Problem

}
