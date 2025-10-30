import { RegisterFormData } from '@/features/auth/types/auth';
import prisma from '../../../../prisma/prisma-client';
import { hashSync } from 'bcryptjs';
import { Profile } from '@/features/profile/model/profile-schema';


export const userRepository = {
    async findByEmail(email: string) {
        return prisma.user.findFirst({
            where: { email },

        });
    },
    async findById(id: number) {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                address: true,
                password: false,
            },
        });
    },

    async createUser(data: Omit<RegisterFormData, 'passwordConfirm'>) {
        return prisma.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: hashSync(data.password, 10),
            },
        });
    },
    async verifyUser(userId: number) {
        return prisma.user.update({
            where: { id: userId },
            data: { verified: new Date() },
        });
    },
    async findVerificationCode(code: string) {
        return prisma.verificationCode.findFirst({
            where: { code },
        });
    },
    async deleteVerificationCode(id: number) {
        return prisma.verificationCode.delete({
            where: { id },
        });
    },


    async createOrUpdateVerificationCode(userId: number) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.upsert({
            where: { userId },
            update: { code },
            create: { code, userId },
        });

        return code;
    },
    async updateUserInfo(id: number, data: Profile) {
        return prisma.user.update({
            where: { id },
            data,
        });
    },


};
