'use client'
import React, { FC, useEffect, useState } from 'react'
import EditInfoDetail from './EditInfoDetail';
import { useGetCourseDetailQuery } from '@/redux/features/course/courseApi';
import EditCourseData from './EditCourseData';

interface EditCourseInfoProps {
    id: string;
}

const EditCourseInfo: FC<EditCourseInfoProps> = ({ id }) => {
    const [active, setActive] = useState(true);
    const { data, isLoading, error } = useGetCourseDetailQuery({ id: id }, { refetchOnMountOrArgChange: true })

    const [courseInfo, setCourseInfo] = useState({});

    const [benefits, setBenefits] = useState([]);
    const [prerequisites, setPrerequisites] = useState([]);

    useEffect(() => {
        if (data) {
            setCourseInfo(data.course);
            setBenefits(data.course.benefits);
            setPrerequisites(data.course.prerequisites);
        }
    }, [data])

    return (
        <div>
            {active ? (
                <EditInfoDetail
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    setActive={setActive}
                />

            ) : (
                <EditCourseData
                    active={active}
                    setActive={setActive}
                    benefits={benefits}
                    setBenefits={setBenefits}
                    prerequisites={prerequisites}
                    setPrerequisites={setPrerequisites}
                />
            )}
        </div>
    )
}

export default EditCourseInfo