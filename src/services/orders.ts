import api from "./httpCommon";
const PATH = "Orders";

const create = async (body: any) => {
  const response = await api.http().post(PATH, body);
  console.log("response: ", response);
  if (response && response.data) {
    return response.data;
  } else {
    return [];
  }
};

const deleteSelected = async (orderIds: Array<number>) => {
  const response = await api.http().post(`${PATH}/delete`, orderIds);
  console.log("response: ", response);
  if (response && response.status === 200) {
    return response;
  } else {
    return [];
  }
};

const get = async () => {
  const orders = await api.http().get(PATH);
  if (orders && orders.data) {
    return orders.data;
  } else {
    return [];
  }
};

const query = async (customerName: string | undefined, orderType: string) => {
  // TODO update endpoint to return a list of orders vs a single order
  const order = await api
    .http()
    .get(`${PATH}/${customerName}?orderType=${orderType}`);
  if (order && order.data) {
    return [order.data];
  } else {
    return [];
  }
};

const orderService = {
  create,
  deleteSelected,
  get,
  query
};

export default orderService;
