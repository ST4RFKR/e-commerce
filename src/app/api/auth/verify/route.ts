import { userService } from '@/entities/user/services/user.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get('code');

        if (!code) {
            return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
        }

        await userService.verifyUserByCode(code);

        return NextResponse.redirect(new URL('/?verified', req.url));
    } catch (error) {
        console.error(error);
        console.log('[VERIFY_GET] Server error', error);
    }
}
