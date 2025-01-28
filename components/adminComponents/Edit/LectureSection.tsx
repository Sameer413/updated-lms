'use client'
import React, { FC, useEffect, useState } from 'react'
import LectureSectionCard from './LectureSectionCard'
import { styles } from '@/app/styles/styles'
import { IoMdClose } from 'react-icons/io'
import { useAddCourseDataMutation, useDeleteCourseDataMutation } from '@/redux/features/course/courseApi'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import Loader from '../../layouts/Loader'

type LectureSectionProps = {
    id: string;
}

const LectureSection: FC<LectureSectionProps> = ({ id }) => {

    const [deleteCourseData, { }] = useDeleteCourseDataMutation();
    const [addCourseData, { isLoading, isSuccess, error }] = useAddCourseDataMutation();

    const [show, setShow] = useState(false);

    const [section, setSection] = useState({
        title: "",
        description: "",
        lectureTitle: "",
        vedio: "",
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    const result: any = reader.result?.toString();

                    console.log('FileReader result:', result);
                    setSection(prevState => ({ ...prevState, vedio: result }));
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = () => {

        addCourseData({ id, data: section })

    }

    useEffect(() => {
        if (isSuccess) {
            redirect(`/admin/courses/edit-course/${id}`)
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }

    }, [isSuccess, error]);

    return (
        isLoading ? (
            <Loader />
        ) : (
            <div className='mx-auto w-full'>
                {show && (
                    <div className="bg-[#111C43] p-5  border-[#ffffff1d] border shadow-lg absolute w-[600px] right-1/4 bg-opacity-100 rounded-lg">
                        <div className="">
                            <IoMdClose onClick={() => setShow(false)} />
                        </div>
                        <div className="">
                            <label className={styles.label}>
                                Enter Section Title
                            </label>
                            <input
                                value={section.title}
                                required
                                onChange={(e: any) => setSection({ ...section, title: e.target.value })}
                                id='title'
                                className={styles.input}
                                type="text"
                            />
                        </div>
                        <div className="mt-4">
                            <label className={styles.label}>
                                Enter Section Description
                            </label>
                            <input
                                value={section.description}
                                required
                                onChange={(e: any) => setSection({ ...section, description: e.target.value })}
                                id='description'
                                className={styles.input}
                                type="text"
                            />
                        </div>
                        <div className="mt-4">
                            <label className={styles.label}>
                                Enter Lecture Title
                            </label>
                            <input
                                value={section.lectureTitle}
                                required
                                onChange={(e: any) => setSection({ ...section, lectureTitle: e.target.value })}
                                id='lectureTitle'
                                className={styles.input}
                                type="text"
                            />
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="file"
                                className={styles.label}
                            >
                                <span>
                                    Choose a file
                                </span>
                            </label>

                            <input
                                type="file"
                                accept='video/*'
                                id='video'
                                className='ml-3'
                                onChange={handleFileChange}
                            />
                        </div>

                        <button
                            className="w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                            onClick={handleSubmit}
                        >
                            Add Section
                        </button>
                    </div>
                )
                }

                <div className="mb-10 w-[90%] flex justify-end">
                    <button
                        className="w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                        onClick={() => setShow(true)}
                    >
                        Create Section
                    </button>
                </div>

                <div className="flex flex-col items-center">

                    <LectureSectionCard
                        deleteCourseData={deleteCourseData}
                        id={id}
                    />
                </div>


            </div >
        )
    )
}

export default LectureSection