"use client";
import { styles } from "@/app/styles/styles";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "@/components/layout/Loader";

type analyticDataType = {
  month: string;
  count: number;
};

const OrderAnalytics = ({ isDashboard }: { isDashboard?: boolean }) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData: Array<{ name: string; count: number }> = [];
  // console.log(data.orders.last12Months[11].count);

  data?.orders.last12Months.forEach((item: analyticDataType) => {
    // Convert "25 Apr 2024" to a standardized date format
    const formattedDate = new Date(item.month);
    analyticsData.push({
      name: formattedDate.toISOString(), // Ensures a proper Date format
      count: item.count,
    });
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
      <div className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}>
        <h1
          className={`${styles.title} ${
            isDashboard && "!text-[20px]"
          } px-5 !text-start`}
        >
          Orders Analytics
        </h1>
        {!isDashboard && (
          <p className={`${styles.label} px-5`}>
            Last 12 months analytics data{" "}
          </p>
        )}
      </div>
      <div
        className={`w-full ${
          !isDashboard ? "h-[90%]" : "h-full"
        } flex items-center justify-center`}
      >
        <ResponsiveContainer
          width={isDashboard ? "100%" : "90%"}
          height={isDashboard ? "100%" : "50%"}
        >
          <LineChart
            width={500}
            height={300}
            data={analyticsData}
            margin={{
              top: 5,
              right: 30,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis
              dataKey={"name"}
              domain={[0, "dataMax"]}
              interval={0}
              textAnchor="middle"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }}
            />
            <YAxis />
            <Tooltip />
            {!isDashboard && <Legend />}
            <Line type={"monotone"} dataKey={"count"} stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderAnalytics;
