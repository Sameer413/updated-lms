"use client";
import { styles } from "@/app/styles/styles";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
  BarChart,
  Bar,
  Label,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type analyticDataType = {
  month: string;
  count: number;
};

const CourseAnalytics = () => {
  const { data } = useGetCoursesAnalyticsQuery({});

  const analyticsData: Array<{ name: string; uv: number }> = [];

  data?.course.last12Months.forEach((item: analyticDataType) => {
    analyticsData.push({ name: item.month, uv: item.count });
  });

  const minValue = 0;

  return (
    <div className="h-screen">
      <div className="mt-[50px]">
        <h1 className={`${styles.title} px-5 !text-start`}>
          Courses Analytics
        </h1>
        <p className={`${styles.label} px-5`}>Last 12 Months analytics data </p>
      </div>

      <div className="w-full h-[90%] flex items-center justify-center">
        <ResponsiveContainer width="90%" height="50%">
          <BarChart width={150} height={300} data={analyticsData}>
            <XAxis dataKey="name">
              <Label offset={0} position="insideBottom" />
            </XAxis>
            <YAxis domain={[minValue, "auto"]} />
            <Bar dataKey="uv" fill="#3faf82">
              <LabelList dataKey="uv" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseAnalytics;
