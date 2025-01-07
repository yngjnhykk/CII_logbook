import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteRegisteredShipAPI,
  getShipInfoAPI,
  postReviseShipAPI,
} from "../api/api";
import { IoIosClose } from "react-icons/io";

function EditModal({ onClickEditButton, imoNumber }) {
  // console.log(imoNumber);

  const { data: shipData } = useQuery("shipData", () =>
    getShipInfoAPI(imoNumber)
  );

  const [registeredShipState, setRegisteredShipState] = useState({
    vesselName: "",
    shipType: "Bulk Carrier",
    imoNumber: "",
    summerLoadDwt: "",
    grossTonnage: "",
  });

  // shipData가 로드되면 registeredShipState를 업데이트
  useEffect(() => {
    if (shipData && shipData.length > 0) {
      const shipState = shipData[0];
      setRegisteredShipState({
        vesselName: shipState.ship_name,
        shipType: shipState.ship_type,
        imoNumber: shipState.imo_number,
        summerLoadDwt: shipState.summer_load_dwt,
        grossTonnage: shipState.gross_tonnage,
      });
    }
  }, [shipData]);

  // onChangeInput
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisteredShipState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();

  // onClick 수정 버튼
  const reviseMutation = useMutation(postReviseShipAPI, {
    onSuccess: (data) => {
      console.log("success", data);
      queryClient.invalidateQueries("shipDatas");
      queryClient.invalidateQueries("shipData");
      queryClient.invalidateQueries("shipInfo");
      onClickEditButton();
    },
  });

  // onClick 삭제 버튼
  const deleteMutation = useMutation(deleteRegisteredShipAPI, {
    onSuccess: (data) => {
      console.log("success", data);
      queryClient.invalidateQueries("shipDatas");
      queryClient.invalidateQueries("shipData");
      queryClient.invalidateQueries("shipInfo");
      queryClient.invalidateQueries("shipDaily");

      onClickEditButton();
    },
  });

  return (
    <div className="bg-white border-rounded w-[512px] h-[453px] p-5 absolute left-[340px] top-64 ">
      {/* 헤더 */}
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">선박 계정 수정</div>
        <div onClick={onClickEditButton} className="cursor-pointer">
          <IoIosClose style={{ width: 30, height: 30 }} />
        </div>
      </div>

      {/* inputs */}
      <div className="flex flex-col gap-6 mt-10">
        {/* Vessel Name */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 text-757575">Vessel Name</div>
          <div className="w-1/2">
            <input
              type="text"
              name="vesselName"
              value={registeredShipState.vesselName}
              onChange={handleChange}
              className="border-[1px] border-D2D2D2 rounded p-1 w-full"
            />
          </div>
        </div>
        {/* Ship Type */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 text-757575">Ship Type</div>
          <div className="w-1/2">
            <select
              className="w-[100%] border py-1 text-center rounded border-D2D2D2"
              name="shipType"
              value={registeredShipState.shipType}
              onChange={handleChange}
            >
              <option value="Bulk Carrier">Bulk Carrier</option>
              <option value="Gas Carrier">Gas Carrier</option>
              <option value="Tanker">Tanker</option>
              <option value="Container Ship">Container Ship</option>
              <option value="General Cargo Ship">General Cargo Ship</option>
              <option value="Refrigerated Cargo Carrier">
                Refrigerated Cargo Carrier
              </option>
              <option value="Combination Carrier">Combination Carrier</option>
              <option value="LNG Carrier">LNG Carrier</option>
              <option value="Ro-Ro Cargo Ship (Vehicle Carrier)">
                Ro-Ro Cargo Ship (Vehicle Carrier)
              </option>
              <option value="Ro-Ro Cargo Ship">Ro-Ro Cargo Ship</option>
              <option value="Ro-Ro Passenger Ship">Ro-Ro Passenger Ship</option>
              <option value="Cruise Passenger Ship">
                Cruise Passenger Ship
              </option>
            </select>
          </div>
        </div>
        {/* IMO Number */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 text-757575">IMO Number</div>
          <div className="w-1/2">
            <input
              type="text"
              name="imoNumber"
              value={registeredShipState.imoNumber}
              readOnly={true}
              onChange={handleChange}
              className="border-[1px] border-D2D2D2 rounded p-1 w-full"
            />
          </div>
        </div>
        {/* DWT at Summer Load Draught */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 text-757575">DWT at Summer Load Draught</div>
          <div className="w-1/2">
            <input
              type="text"
              name="summerLoadDwt"
              value={registeredShipState.summerLoadDwt}
              onChange={handleChange}
              className="border-[1px] border-D2D2D2 rounded p-1 w-full"
            />
          </div>
        </div>
        {/* Gross Tonnage */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 text-757575">Gross Tonnage</div>
          <div className="w-1/2">
            <input
              type="text"
              name="grossTonnage"
              value={registeredShipState.grossTonnage}
              onChange={handleChange}
              className="border-[1px] border-D2D2D2 rounded p-1 w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8 mx-auto w-full text-[16px] ">
        <button
          className="w-1/2 font-medium text-center bg-FF6262 p-2 text-white rounded"
          onClick={() => {
            if (
              window.confirm(
                "저장되어 있던 CII 모니터링 데이터도 함께 지웁니다. \n계속 진행하시겠습니까?"
              )
            ) {
              deleteMutation.mutate(imoNumber);
            }
          }}
        >
          삭제
        </button>
        <button
          className="w-1/2 font-medium text-center bg-68BCF9 p-2 text-white rounded"
          onClick={() => {
            reviseMutation.mutate(registeredShipState);
          }}
        >
          수정
        </button>
      </div>
    </div>
  );
}

export default EditModal;
