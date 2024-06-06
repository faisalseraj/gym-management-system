import mongoose, { Document, Model } from 'mongoose';

import { AccessAndRefreshTokens } from './token.interface';

export type UserType = 'owner' | 'admin' | 'client' | 'superadmin';
export interface QueryResult {
    results: Document[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  }
export enum UserEnum {
  'owner',
  'client',
  'admin',
  'superadmin',
}

export const USER_TYPE = ['owner', 'client', 'admin', 'superadmin'];

export interface User {
  firstName: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  userType: UserType;
  password?: string;
  lastLogin?: string;
  currentLogin?: string;
  isVerified: boolean;
  isSuspended?: boolean;
  isArchived?: boolean;
  isTemporaryBlocked?: boolean;
  image?: string;
  temporaryBlockedTill?: string;
  dob?: string;
  bloodGroup?: string;
  gymName?: string;
  ownerId?: UserDoc['_id'];
  isPaidCurrentMonth?: boolean

  createdAt: string
}

export interface UserDoc extends User, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface UserModel extends Model<UserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  isPhoneNumberTaken(phoneNumber: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<User>;

export type NewRegisteredUser = Partial<User>;

export type NewCreatedUser = Partial<User>;

export interface UserWithTokens {
  user: UserDoc;
  tokens: AccessAndRefreshTokens;
}

export interface UserCount {
  [key: string]: number;
}

export interface BusinessPercentageCount {
  field: string;
  value: number;
}

export interface UserActivePercentages {
  active: string;
  frozen: string;
}
