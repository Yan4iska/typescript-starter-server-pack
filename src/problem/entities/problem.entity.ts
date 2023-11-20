import { Case } from "src/case/entities/case.entity";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Problem {
    @PrimaryGeneratedColumn({name: 'problem_id'})
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column({ default: false })
    status: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=>User, (user)=>user.problems)
    @JoinColumn({name: 'user_id'})
    user: User


    @ManyToOne(()=>Category, (category)=>category.problems)
    @JoinColumn({name: 'category_id'})
    category: Category


    @OneToMany(()=>Problem, (problem)=>problem.parent)
    descendants: Problem[]

    @ManyToOne(()=>Problem, (parent)=>parent.descendants, {nullable: true})
    @JoinColumn({name: 'parent_id'})
    parent: Problem | null;


    @ManyToOne(()=>Case, (tcase)=>tcase.problems)
    @JoinColumn({name: 'case_id'})
    case: Case


}
