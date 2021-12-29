import api from "./httpCommon";
const PATH = "Orders";


  const create = async (body: any) => {
    const response = await api.http().post(PATH, body);
    console.log('response: ', response);
    if (response && response.data) {
      return response.data;
    } else {
      return [];
    }
  }

  const deleteSelected = async (orderIds: Array<number>) => {
    const response = await api.http().post(`${PATH}/delete`, orderIds);
    console.log('response: ', response);
    if (response && response.status === 200) {
      return response;
    } else {
      return [];
    }
  }

  const get = async () => {
    const orders = await api.http().get(PATH);
    if (orders && orders.data) {
      return orders.data;
    } else {
      return [];
    }
  }

  const query = async (customerName: (string | undefined), orderType: string) => {
    const order = await api.http().get(`${PATH}/${customerName}?orderType=${orderType}`);
    if (order && order.data) {
      return [order.data];
    } else {
      return [];
    }
  }

export default {
  create,
  deleteSelected,
  get,
  query
}
