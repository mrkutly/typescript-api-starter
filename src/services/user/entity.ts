import bcrypt from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { promisify } from 'util';
import { randomBytes } from 'crypto';
import { getConnection } from 'typeorm';

import * as TokenManager from '../../utils/TokenManager';

type ResetTokenResult = {
  affected: number;
  resetToken: string;
};

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  reset_token: string;

  @Column({ nullable: true })
  reset_token_expiry: string;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;

  @BeforeInsert()
  async hashPassword(password: string = this.password): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;
  }

  async authenticate(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  static parseFromWebToken(token: string): Promise<User | undefined> {
    const { userId } = TokenManager.parseToken(token);
    return User.findOne({ id: userId });
  }

  static async setResetTokenWhereEmail(email: string): Promise<ResetTokenResult> {
    const randomBytesPromise = promisify(randomBytes);
    const reset_token = (await randomBytesPromise(20)).toString("hex");

    const { affected } = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        reset_token,
        reset_token_expiry: String(Date.now() + 3600000) // 1 hour from now
      })
      .where({ email })
      .returning(["id"])
      .execute();

    return { affected: affected as number, resetToken: reset_token };
  }
}