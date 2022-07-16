import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'recover_password_tokens' })
export class RecoverPasswordEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'auth_id' })
    authId: number;

    @Column()
    token: string;

    @Column({ default: '' })
    application: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

}


