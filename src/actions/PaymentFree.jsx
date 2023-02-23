import * as api from '../api'

export const PaymentFree = async (paymentData) => {
    try {
        const res= await api.paymentFree(paymentData);
        return res;
    } catch (error) {
        console.log(error)
    }
}