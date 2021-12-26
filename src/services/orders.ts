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
};
