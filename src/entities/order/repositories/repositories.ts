import prisma from '../../../../prisma/prisma-client';


export const orderRepository = {

    async getOrders(id: number) {
        const orders = await prisma.order.findMany({
            where: {
                userId: Number(id),
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
        });

        return orders
    }
}
