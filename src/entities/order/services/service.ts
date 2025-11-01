import { orderRepository } from "../repositories/repositories";

export const orderServices = {
    async getOrders(id: number) {
        return orderRepository.getOrders(id);
    }
}
