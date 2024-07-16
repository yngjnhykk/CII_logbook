import axios from "axios";

// cii 계산
export const postInputDataAPI = async (inputData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_KEY}/calculateCii`,
    {
      ...inputData,
    }
  );
  return response.data;
};

// 전체 선박 조회
export const getShipDatasAPI = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_KEY}/shipDatas`);
  return response.data;
};

// 선박 조회(ship_info)
export const getShipInfoAPI = async (imo_number) => {
  console.log(imo_number);
  const response = await axios.get(
    `${import.meta.env.VITE_API_KEY}/shipInfo?imo_number=${imo_number}`
  );
  return response.data;
};

// 선박 조회(ship_daily)
export const getShipDailyAPI = async (imo_number) => {
  console.log(imo_number);
  const response = await axios.get(
    `${import.meta.env.VITE_API_KEY}/shipDaily?imo_number=${imo_number}`
  );
  return response.data;
};

// 선박 조회(ship_info + daily_info)
export const getShipDataAPI = async (imo_number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_KEY}/shipData?imo_number=${imo_number}`
  );
  return response.data;
};

// 선박 등록
export const postRegisterShipAPI = async (newShipData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_KEY}/registerShip`,
    { ...newShipData }
  );
  return response.data;
};

// 선박 수정
export const postReviseShipAPI = async (newShipData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_KEY}/reviseShip`,
    { newShipData }
  );
  return response.data;
};

// 선박 삭제
export const deleteRegisteredShipAPI = async (imo_number) => {
  console.log(imo_number);
  const response = await axios.delete(
    `${import.meta.env.VITE_API_KEY}/shipAccount?imo_number=${imo_number}`,
    { imo_number }
  );
  return response.data;
};
