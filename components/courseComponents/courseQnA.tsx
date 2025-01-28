import { styles } from "@/app/styles/styles";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const CourseQnA = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="pt-3 pr-2">
          <FaUserCircle className="text-5xl" />
        </div>
        <div className="w-full">
          <textarea
            name=""
            className={`${styles.input} h-min py-2`}
            cols={30}
            rows={5}
            id=""
            placeholder="Write something amazing..."
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 px-4 py-2 rounded-full text-lg font-medium">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CourseQnA;
