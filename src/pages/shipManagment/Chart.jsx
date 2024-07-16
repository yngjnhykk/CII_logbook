import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Chart({ parsedShipData, chartData }) {
  const [chartState, setChartState] = useState([]);
  console.log(parsedShipData);

  useEffect(() => {
    if (chartData) {
      setChartState(chartData);
    }
    if (parsedShipData && parsedShipData.length > 0) {
      setChartState(parsedShipData[0].chart_data);
    }
  }, [chartData, parsedShipData]);

  console.log(chartState);
  return (
    <div className="mt-20">
      <div className="text-[16px] mb-10">5. 선박운항탄소집약도 그래프</div>
      <div className="ml-[-50px]">
        <ResponsiveContainer width="103%" height={250}>
          <LineChart
            data={chartState}
            margin={{ top: 20, right: 50, left: 50, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              label={{ value: "year", position: "insideBottom", offset: 0 }}
            />

            <YAxis
              domain={["dataMin - 0.5", "dataMax + 0.5"]}
              label={{
                value: "Attained CII",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: "20px" }}
            />
            <Line type="monotone" dataKey="A" stroke="#008000" name="A" />
            <Line type="monotone" dataKey="B" stroke="#90EE90" name="B" />
            <Line type="monotone" dataKey="C" stroke="#FFFF00" name="C" />
            <Line type="monotone" dataKey="D" stroke="#FFA500" name="D" />
            <Line type="monotone" dataKey="E" stroke="#FF0000" name="E" />
            <Line
              type="monotone"
              dataKey="attainedCII"
              stroke="#2196F3"
              strokeWidth={6}
              name="Attained CII"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;
