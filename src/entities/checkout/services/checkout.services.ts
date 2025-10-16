import { CheckoutSchema } from "@/features/checkout/model/checkout-schema";
import { checkoutRepository } from "../repositories/checkout.repositories"

export const checkoutServices = {
    async createOrder(token: string, data: CheckoutSchema) {
        const order = await checkoutRepository.createOrder(token, data);
        return order
    }

}
