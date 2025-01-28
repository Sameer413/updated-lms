'use client'
import { useDeleteCourseDataMutation } from '@/redux/features/course/courseApi'
import React, { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'

interface LectureSectionCardProps {
    deleteCourseData: any;
    id: string;
    courseDataId?: string
}

const LectureSectionCard: FC<LectureSectionCardProps> = ({
    deleteCourseData, id, courseDataId
}) => {

    const [open, setOpen] = useState(false);

    return (
        <div
            className="border w-[80%] p-4 rounded-md mb-4 "

        >
            <div
                className="w-full mb-2 text-xl font-Poppins font-medium flex justify-between items-center"
                onClick={() => setOpen(!open)}
            >
                <div className="text-xl cursor-pointer w-full mr-2">
                    Introduction
                </div>
                <button
                    className=""
                    onClick={() => deleteCourseData({ id, courseDataId })}
                >
                    <MdDeleteOutline size={25} />
                </button>
            </div>

            {open && (
                <div className="border-t ">
                    <div className="flex justify-between items-center mt-3 px-2">

                        <div className="text-lg">
                            Introduction React Fundamental
                        </div>
                        <button className="">
                            <MdDeleteOutline size={25} />
                        </button>

                    </div>
                    {/* <div className="">
                        v1
                    </div>
                    <div className="">
                        v1
                    </div> */}

                    <div className="mt-5 gap-2 w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer">
                        Add Lecture <FaPlus />
                    </div>

                </div>
            )}
        </div>
    )
}

export default LectureSectionCard