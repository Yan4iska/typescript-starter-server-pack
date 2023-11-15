import { Problem } from "src/problem/entities/problem.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn({name: 'category_id'})
    id: number
    
    @Column()
    title: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=>User, (user)=> user.categories)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(()=>Problem, (problem)=>problem.category)
    problems: Problem[]
}
