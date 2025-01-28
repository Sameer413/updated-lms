'use client'
import { styles } from '@/app/styles/styles';
import { useAddCategoriesMutation, useGetLayoutQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Loader from '@/components/layout/Loader';

const EditCategory = () => {

    const { data, isLoading, refetch } = useGetLayoutQuery({}, { refetchOnMountOrArgChange: true })
    const [addCategories, { isSuccess, error }] = useAddCategoriesMutation();

    const [categories, setCategories] = useState<any>([]);

    useEffect(() => {
        if (data) {
            setCategories(data?.layout?.categories);
        }else{
            setCategories([]);
        }

        if (isSuccess) {
            refetch();
            toast.success("Categories updated successfully");
        }

        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData?.data?.message);
            }
        }
    }, [data, isSuccess, error]);

    const areCategoriesUnchanged = (
        originalCategories: any[],
        newCategories: any[]
    ) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    }

    const handleCategoriesAdd = (id: any, value: string) => {
        setCategories((prevCategory: any) =>
            prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
        );
    }

    const newCategoriesHandler = () => {
        if (categories[categories.length - 1].title === "") {
            return <>Toast MSG</>
        } else {
            setCategories((prevCategory: any) => [...prevCategory, { title: "" }])
        }
    }

    const isAnyCategoryTitleEmpty = (categories: any[]) => {
        return categories.some((q) => q.title === "");
    }

    const editCategoriesHandler = async () => {
        if (!areCategoriesUnchanged(data.layout.categories, categories) && !isAnyCategoryTitleEmpty(categories)) {
            await addCategories({ categories })
        }
    }

    return (
        isLoading ? (
            <Loader />
        ) : (
            <div className='px-8 mt-[120px] flex flex-col items-center'>
                <h1 className={`${styles.title}`}>
                    All Categories
                </h1>

                <div className="w-1/2 flex items-center flex-col justify-center">
                    {categories?.map((item: any, index: number) => {
                        return (
                            <div key={index} className="p-3">
                                <div className="flex items-center justify-center">
                                    <input
                                        type="text"
                                        className={`${styles.input} border-none`}
                                        value={item.title}
                                        onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
                                        placeholder='Enter category title...'
                                    />
                                    <AiOutlineDelete
                                        className="text-lg cursor-pointer"
                                        onClick={() => {
                                            setCategories((prevCategory: any) => prevCategory.filter((i: any) => i._id !== item._id));
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <br />
                <br />
                <div className="">
                    <IoMdAddCircleOutline
                        className='text-2xl cursor-pointer'
                        onClick={newCategoriesHandler}
                    />
                </div>

                <div className={`${styles.button} !w-[180px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${areCategoriesUnchanged(data?.layout?.categories, categories) ||
                    isAnyCategoryTitleEmpty(categories)
                    ? "!cursor-not-allowed"
                    : "!cursor-pointer !bg-[#42d383]"
                    } !rounded absolute bottom-12 right-12`}

                    onClick={
                        areCategoriesUnchanged(data?.layout?.categories, categories) ||
                            isAnyCategoryTitleEmpty(categories)
                            ? () => null
                            : editCategoriesHandler
                    }
                >
                    Save
                </div>
            </div>
        )
    )
}

export default EditCategory