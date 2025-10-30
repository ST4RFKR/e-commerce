import { emailService } from '@/shared/services/email/email.service';

import { RegisterFormData } from '@/features/auth/types/auth';
import { userRepository } from '../repositories/user.repository';
import { Profile } from '@/features/profile/model/profile-schema';

export const userService = {
    async registerUser(data: RegisterFormData) {
        // Перевіряємо чи існує користувач
        const existingUser = await userRepository.findByEmail(data.email);

        if (existingUser) {
            if (existingUser.verified) {
                throw new Error('USER_ALREADY_EXISTS');
            }

            // Відправляємо новий код верифікації
            const code = await userRepository.createOrUpdateVerificationCode(existingUser.id);
            await emailService.sendVerificationCode(existingUser.email, code);

            return {
                success: true,
                message: 'Новий код верифікації відправлено',
            };
        }

        // Створюємо нового користувача
        const newUser = await userRepository.createUser(data);
        const code = await userRepository.createOrUpdateVerificationCode(newUser.id);

        await emailService.sendVerificationCode(newUser.email, code);

        return {
            success: true,
            message: 'Користувача створено',
        };
    },
    async getUserProfile(userId: number) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        return user;
    },
    async verifyUserByCode(code: string) {
        const verificationCode = await userRepository.findVerificationCode(code);

        if (!verificationCode) {
            throw new Error('INVALID_CODE');
        }

        // Верифікуємо користувача та видаляємо код в транзакції
        await userRepository.verifyUser(verificationCode.userId);
        await userRepository.deleteVerificationCode(verificationCode.id);

        return { success: true };
    },
    async updateUserInfo(userId: number, data: Profile) {
        return userRepository.updateUserInfo(userId, data);
    },
};
