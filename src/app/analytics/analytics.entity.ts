import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'analytics' })
export class AnalyticsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "total_auths" })
    totalAuths: number;

    @Column({ name: "total_active_sessions" })
    totalActiveSessions: number;

    @Column({ name: "total_active_sessions_by_auth" })
    totalActiveSessionsByAuth: number;

    @Column({ name: "total_update_passwords" })
    totalUpdatePassword: number;

    @Column({ name: "total_recovery_tokens" })
    totalRecoveryToken: number;

    @Column({ name: "total_recovery_tokens_by_auth" })
    totalRecoveryTokenByAuth: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

}