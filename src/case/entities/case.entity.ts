import { Problem } from "src/problem/entities/problem.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class Case {
    @PrimaryGeneratedColumn({name: 'case_id'})
    id: number

    @Column()
    title: string
    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(()=>User, (user)=> user.cases)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToMany(()=>Problem, (problem)=>problem.case,
    {
        onDelete: 'CASCADE',
    })
    problems: Problem[]

}
