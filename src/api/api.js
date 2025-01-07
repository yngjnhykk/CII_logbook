import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    "api-key": import.meta.env.VITE_API_KEY,
  },
});
// const apiClient = axios.create({
//   baseURL: "http://118.129.145.82:1880",
//   headers: {
//     "api-key": "2ec3541673714737b2515b23c63e6055",
//   },
// });

// cii 계산
export const postInputDataAPI = async (inputData) => {
  const response = await apiClient.post(`/calculateCii`, {
    ...inputData,
  });
  return response.data;
};

// 전체 선박 조회
export const getShipDatasAPI = async () => {
  const response = await apiClient.get(`/shipDatas`);
  return response.data;
};

// 선박 조회(ship_info)
export const getShipInfoAPI = async (imo_number) => {
  console.log(imo_number);
  const response = await apiClient.get(`/shipInfo?imo_number=${imo_number}`);
  return response.data;
};

// 선박 조회(ship_daily)
export const getShipDailyAPI = async (imo_number) => {
  console.log(imo_number);
  const response = await apiClient.get(`/shipDaily?imo_number=${imo_number}`);
  return response.data;
};

// 선박 조회(ship_info + daily_info)
export const getShipDataAPI = async (imo_number) => {
  const response = await apiClient.get(`/shipData?imo_number=${imo_number}`);
  return response.data;
};

// 선박 등록
export const postRegisterShipAPI = async (newShipData) => {
  const response = await apiClient.post(`/registerShip`, { ...newShipData });
  return response.data;
};

// 선박 수정
export const postReviseShipAPI = async (newShipData) => {
  const response = await apiClient.post(`/reviseShip`, { newShipData });
  return response.data;
};

// 선박 삭제
export const deleteRegisteredShipAPI = async (imo_number) => {
  console.log(imo_number);
  const response = await apiClient.delete(
    `/shipAccount?imo_number=${imo_number}`,
    { imo_number }
  );
  return response.data;
};
