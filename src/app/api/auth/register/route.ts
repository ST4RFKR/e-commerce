import { NextRequest, NextResponse } from 'next/server';


import { hashSync } from 'bcryptjs';

import { getUserSession } from '@/shared/lib/get-user-session';
import prisma from '../../../../../prisma/prisma-client';
import { sendEmail } from '@/shared/components/email-templates/email-send/email-send';
import { VerificationUserTemplate } from '@/shared/components/email-templates/verification-user/verification-user';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const user = await prisma.user.findFirst({
            where: { email: body.email },
        });

        if (user) {
            if (user.verified) {
                return NextResponse.json({ error: 'Користувач вже існує' }, { status: 400 });
            }

            const code = Math.floor(100000 + Math.random() * 900000).toString();

            await prisma.verificationCode.upsert({
                where: { userId: user.id },
                update: { code },
                create: {
                    code,
                    userId: user.id,
                },
            });

            await sendEmail(
                user.email,
                'Bouquet / 📝 Підтвердження реєстрації',
                VerificationUserTemplate({ code }),
            );

            return NextResponse.json({ success: true, message: 'Новий код верифікації відправлено' });
        }

        // Создаем нового пользователя
        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });

        await sendEmail(
            createdUser.email,
            'Bouquet / 📝 Підтвердження реєстрації',
            VerificationUserTemplate({ code }),
        );

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Error [CREATE_USER]', err);
        return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const body = await request.json();
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('Пользователь не найден');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.log('Error [UPDATE_USER]', err);
        throw err;
    }
}
