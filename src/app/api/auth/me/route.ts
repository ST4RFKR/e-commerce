import { NextResponse } from 'next/server';

import { getUserSession } from '@/shared/lib/get-user-session';
import { userService } from '@/entities/user/services/user.service';


export async function GET() {
    try {
        const session = await getUserSession();

        if (!session) {
            return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
        }

        const user = await userService.getUserProfile(Number(session.id));

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
    }
}
