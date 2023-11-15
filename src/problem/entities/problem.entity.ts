import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Problem {
    @PrimaryColumn({name: 'transaction_id'})
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


    @ManyToOne(()=>Category, (category)=>category)
    @JoinColumn({name: 'category_id'})
    category: Category


    @OneToMany(()=>Problem, (problem)=>problem.parent)
    descendants: Problem[]

    @ManyToOne(()=>Problem, (parent)=>parent.descendants)
    @JoinColumn({name: 'parent_id'})
    parent: Problem


}
