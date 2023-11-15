import { Category } from "src/category/entities/category.entity"
import { Problem } from "src/problem/entities/problem.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    @OneToMany(() => Category, (category) => category.user, 
        {
            onDelete: 'CASCADE',
        })
    categories: Category[]

    @OneToMany(()=>Problem, (problem)=> problem.user)
    problems: Problem[]
}
