import * as api from '../api'

export const Payment = async (id, paymentData) => {
    try {
        const res= await api.payment(id, paymentData);
        return res;
    } catch (error) {
        console.log(error)
    }
}