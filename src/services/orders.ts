import api from "./httpCommon";
const PATH = "Orders";

export default {
  get: async () => {
    const orders = await api.http().get(PATH);
    if (orders && orders.data) {
      return orders.data;
    } else {
      return [];
    }
  },
  query: async (customerName: string, query: string) => {
    const orders = await api.http().get(`${PATH}/${customerName}${query}`);
    if (orders && orders.data) {
      return orders.data;
    } else {
      return [];
    }
  }
};
