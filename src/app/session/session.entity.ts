import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity({ name: 'sessions' })
export class SessionEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    token: string

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

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

}