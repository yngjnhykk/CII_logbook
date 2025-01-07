import React, { useEffect, useState } from "react";
import Controller from "./Controller";
import { useQuery } from "react-query";
import { getShipDataAPI, getShipDatasAPI, getShipInfoAPI } from "../../api/api";
import { useNavigate } from "react-router";

function Simulator() {
  const [imoNumber, setImoNumber] = useState("");
  const [imoNumbers, setImoNumbers] = useState([]);

  const navigate = useNavigate();

  // shipDatas
  const { data: shipDatas } = useQuery("shipDatas", getShipDatasAPI, {
    onSuccess: (data) => {
      setImoNumbers(data);
      setImoNumber(data[0].imo_number);
    },
  });
  // console.log(shipDatas);

  const { data: shipData } = useQuery(
    ["shipData", imoNumber],
    () => getShipDataAPI(imoNumber),
    {
      enabled: !!imoNumber,
      onSuccess: (data) => {
        // setInputState(data);
        console.log(data);
      },
    }
  );

  const { data: shipInfo } = useQuery(
    ["shipInfo", imoNumber],
    () => getShipInfoAPI(imoNumber),
    {
      enabled: !!imoNumber,
      onSuccess: (data) => {
        // setInputState(data);
        console.log(data);
      },
    }
  );

  const [inputState, setInputState] = useState({
    shipAccount: "",
    shipType: "Bulk Carrier",
    dwt: "",
    grossTonnage: "",
    totalDistanceTravelled: "",
    dieselGasOilConsumption: "",
    lightFuelOilConsumption: "",
    heavyFuelOilConsumption: "",
    lpgPropaneConsumption: "",
    lpgButaneConsumption: "",
    lngConsumption: "",
    methanolConsumption: "",
    ethanolConsumption: "",
    dataCollectingYear: "2024",
  });

  useEffect(() => {
    if (shipInfo && shipInfo.length > 0) {
      const data = shipInfo[0];
      const parsedRating = data.rating ? JSON.parse(data.rating) : {};

      setInputState({
        ...inputState,
        shipAccount: data.ship_name,
        shipType: data.ship_type,
        dwt: data.summer_load_dwt,
        grossTonnage: data.gross_tonnage,
        totalDistanceTravelled: "",
        dieselGasOilConsumption: "",
        lightFuelOilConsumption: "",
        heavyFuelOilConsumption: "",
        lpgPropaneConsumption: "",
        lpgButaneConsumption: "",
        lngConsumption: "",
        methanolConsumption: "",
        ethanolConsumption: "",
        ratingA: parsedRating.A || "",
        ratingB: parsedRating.B || "",
        ratingC: parsedRating.C || "",
        ratingD: parsedRating.D || "",
        ratingE: parsedRating.E || "",
      });
    }
    if (shipData && shipData.length > 0) {
      const data = shipData[0];
      // JSON 파싱을 시도하고, 실패하면 빈 객체를 반환
      const parsedFuels = data.fuels ? JSON.parse(data.fuels) : {};
      const parsedRating = data.rating ? JSON.parse(data.rating) : {};

      setInputState({
        ...inputState,
        shipAccount: data.ship_name,
        shipType: data.ship_type,
        dwt: data.summer_load_dwt,
        grossTonnage: data.gross_tonnage,
        totalDistanceTravelled: data.total_distance_travelled,
        dieselGasOilConsumption:
          parsedFuels["diesel_gas_oil_consumption"] || "",
        lightFuelOilConsumption:
          parsedFuels["light_fuel_oil_consumption"] || "",
        heavyFuelOilConsumption:
          parsedFuels["heavy_fuel_oil_consumption"] || "",
        lpgPropaneConsumption: parsedFuels["lpg_propane_consumption"] || "",
        lpgButaneConsumption: parsedFuels["lpg_butane_consumption"] || "",
        lngConsumption: parsedFuels["lng_consumption"] || "",
        methanolConsumption: parsedFuels["methanol_consumption"] || "",
        ethanolConsumption: parsedFuels["ethanol_consumption"] || "",
        dataCollectingYear: data.record_date.split("-")[0], // 'YYYY-MM-DD' format
        // 레이팅 정보 추가
        ratingA: parsedRating.A || "",
        ratingB: parsedRating.B || "",
        ratingC: parsedRating.C || "",
        ratingD: parsedRating.D || "",
        ratingE: parsedRating.E || "",
      });
    }
  }, [shipData, shipInfo]); // Include shipData in the dependency array to trigger the effect when shipData updates

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between ">
        <div className="text-[32px] font-semibold">CII Simulator</div>
        <button
          className="p-2 rounded border-[1px] bg-slate-400 text-white"
          onClick={() => navigate("/")}
        >
          선박 관리 페이지로 이동
        </button>
      </div>

      <div className="text-[20px] font-medium mt-8">
        선박운항탄소집약도 시뮬레이터
      </div>
      <div className="text-[16px] font-medium mt-4 text-757575 ">
        Operational carbon intensity indicator simulator
      </div>
      <div className="text-[14px] font-light mt-4 ">
        본 프로그램은 대한민국 국적선사의 CII제도 이행을 돕기위해 MEPC 78차에서
        채택된 결의서(Resolution MEPC 352(78) 등)를 기반으로 제작되었으며, 본
        프로그램의 결과치는 규제 준수 여부를 보장하지 않음을 알립니다.
      </div>

      <Controller
        inputState={inputState}
        handleInputChange={handleInputChange}
        imoNumbers={imoNumbers}
        setImoNumber={setImoNumber}
      />
    </div>
  );
}

export default Simulator;
