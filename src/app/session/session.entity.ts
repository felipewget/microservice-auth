import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'sessions' })
export class SessionEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    authId: number

    @Column({ default: '' })
    application: string;

    @Column({ default: 'user', enum: ['user', 'api'] })
    type: string;

    @Column()
    ip: string;

    @Column({ type: "json" })
    browser: object;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @CreateDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

}