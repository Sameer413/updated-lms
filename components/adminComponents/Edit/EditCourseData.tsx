import { styles } from '@/app/styles/styles';
import React, { FC } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdAddCircleOutline } from 'react-icons/md';

interface EditCourseDataProps {
    benefits: any;
    setBenefits: any;
    prerequisites: any;
    setPrerequisites: any;
    active: any;
    setActive: any
}

const EditCourseData: FC<EditCourseDataProps> = ({
    benefits, prerequisites, setBenefits, setPrerequisites, active, setActive,
}) => {

    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    }

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }]);
    }

    const handlePrerequisitesChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    }

    const handleAddPrerequisites = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    }

    const handleBenefitDelete = (i: number) => {

        if (benefits.length === 1) {
            toast.error("Enter one benefit");
        } else {
            const newBenefits = benefits.filter((_: any, index: any) => i !== index);
            setBenefits(newBenefits)

        }
    }

    const handlePrerequisiteDelete = (i: number) => {

        if (prerequisites.length === 1) {
            toast.error("Enter one prerequisite");
        } else {
            const newPrerequisites = prerequisites.filter((_: any, index: any) => i !== index);
            setPrerequisites(newPrerequisites);
        }
    }

    const handleOptions = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(active + 1);
            // handleSubmit();
        } else {
            toast.error("Please fill the fields for go to next!")
            console.log('empty');

        }
    }

    return (
        <div className="w-[80%] m-auto mt-10">
            <div>
                <label className={`${styles.label} text-xl`}>
                    What are the benefits for students in this course?
                </label>
                <br />
                {benefits.map((benefit: any, index: number) => (
                    <div key={index} className="relative">
                        <input
                            type='text'
                            name='Benefits'
                            placeholder='Enter benefits of the courses'
                            required
                            className={`${styles.input} my-2`}
                            value={benefit.title}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                        />
                        <button
                            className='absolute ml-2 mt-4'
                            onClick={() => handleBenefitDelete(index)}
                        >
                            <AiOutlineDelete size={25} />
                        </button>
                    </div>
                ))}
                <MdAddCircleOutline
                    size={30}
                    style={{ margin: "10px 0px", cursor: 'pointer', width: '30px' }}
                    onClick={handleAddBenefit}
                />
            </div>

            <div>
                <label className={`${styles.label} text-xl`}>
                    What are the prerequisites for students in this course?
                </label>
                <br />
                {prerequisites.map((prerequisite: any, index: number) => (
                    <div key={index} className="relative">
                        <input
                            type='text'
                            name='prerequisites'
                            placeholder='Enter prerequisite of the courses'
                            required
                            className={`${styles.input} my-2`}
                            value={prerequisite.title}
                            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
                        />
                        <button
                            className='absolute ml-2 mt-4'
                            onClick={() => handlePrerequisiteDelete(index)}
                        >
                            <AiOutlineDelete size={25} />
                        </button>
                    </div>
                ))}
                <MdAddCircleOutline
                    size={30}
                    style={{ margin: "10px 0px", cursor: 'pointer', width: '30px' }}
                    onClick={handleAddPrerequisites}
                />
            </div>

            <div className="flex items-center justify-between">
                <div
                    className="w-[180px] bg-[#37a39a] mt-8 h-[40px] flex items-center justify-center rounded text-xl cursor-pointer"
                    onClick={() => setActive(true)}
                >
                    Prev
                </div>
                <div
                    className="w-[180px] bg-[#37a39a] mt-8 h-[40px] flex items-center justify-center rounded text-xl cursor-pointer"
                    onClick={handleOptions}
                >
                    Save
                </div>
            </div>
        </div>
    )
}

export default EditCourseData