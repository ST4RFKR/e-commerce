import { NextResponse } from 'next/server';
import { getUserSession } from '@/shared/lib/get-user-session';
import { orderServices } from '@/entities/order/services/service';


export async function GET() {
    try {
        const session = await getUserSession();

        if (!session) {
            return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
        }

        const orders = await orderServices.getOrders(Number(session.id));

        return NextResponse.json(orders);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: '[ORDER_GET] Server error' }, { status: 500 });
    }
}
