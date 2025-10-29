import { NextRequest, NextResponse } from 'next/server';


import { hashSync } from 'bcryptjs';

import { getUserSession } from '@/shared/lib/get-user-session';
import prisma from '../../../../../prisma/prisma-client';
import { registerSchema } from '@/features/auth/types/auth';
import { userService } from '@/entities/user/services/user.service';


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const validatedData = registerSchema.parse(data);

        const result = await userService.registerUser(validatedData);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error [CREATE_USER]', error);

        if ((error as Error).message === 'USER_ALREADY_EXISTS') {
            return NextResponse.json(
                { error: 'Користувач вже існує' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Внутрішня помилка сервера' },
            { status: 500 }
        );
    }
}
// TODO: refactor to service pattern
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
