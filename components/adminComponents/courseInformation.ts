// "use client";
// import Image from "next/image";
// import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { styles } from "@/app/styles/styles";
// import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
// import { courseStateType } from "./CreateCourse";

// type CourseInformationProps = {
//   courseInfo: courseStateType;
//   setCourseInfo: Dispatch<SetStateAction<courseStateType>>;
//   active?: number;
//   setActive: (active: number) => void;
// };

// const CourseInformation: React.FC<CourseInformationProps> = ({
//   setActive,
//   courseInfo,
//   setCourseInfo,
// }) => {
//   const [dragging, setDragging] = useState(false);
//   const [categories, setCategories] = useState([]);

//   const { data } = useGetLayoutQuery({}, { refetchOnMountOrArgChange: true });

//   useEffect(() => {
//     if (data) {
//       setCategories(data?.layout?.categories);
//     }
//   }, [data]);

//   const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     setDragging(false);

//     const file = e.dataTransfer.files?.[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = () => {
//         setCourseInfo({ ...courseInfo, thumbnail: reader.result });
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setCourseInfo({ ...courseInfo, thumbnail: reader.result });
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="w-[80%] m-auto">
//       <div className="">
//         <label className={`${styles.label}`}>Course Name</label>
//         <input
//           type="text"
//           name=""
//           className={styles.input}
//           value={courseInfo.name}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setCourseInfo({ ...courseInfo, name: e.target.value })
//           }
//           id="name"
//           placeholder="MERN stack LMS Platform with Next 13"
//         />
//       </div>
//       <br />
//       <div className="">
//         <label className={`${styles.label}`}>Course Description</label>
//         <textarea
//           name=""
//           className={`${styles.input} h-min py-2`}
//           cols={30}
//           rows={8}
//           value={courseInfo.description}
//           onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//             setCourseInfo({ ...courseInfo, description: e.target.value })
//           }
//           id=""
//           placeholder="Write something amazing..."
//         ></textarea>
//       </div>
//       <br />
//       <div className="w-full flex justify-between">
//         <div className="w-[45%]">
//           <label className={`${styles.label}`}>Course Price</label>
//           <input
//             type="number"
//             name=""
//             className={styles.input}
//             required
//             value={courseInfo.price}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setCourseInfo({ ...courseInfo, price: Number(e.target.value) })
//             }
//             id="price"
//             placeholder="29"
//           />
//         </div>
//         <div className="w-[45%]">
//           <label className={`${styles.label}`}>
//             Estimated Price (optional)
//           </label>
//           <input
//             type="number"
//             name=""
//             className={styles.input}
//             required
//             value={courseInfo.estimatedPrice}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setCourseInfo({
//                 ...courseInfo,
//                 estimatedPrice: Number(e.target.value),
//               })
//             }
//             id="price"
//             placeholder="59"
//           />
//         </div>
//       </div>
//       <br />
//       <div className="w-full flex justify-between">
//         <div className="w-[45%]">
//           <label className={`${styles.label}`}>Course Tags</label>
//           <input
//             type="text"
//             name=""
//             className={styles.input}
//             required
//             value={courseInfo.tags}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setCourseInfo({ ...courseInfo, tags: e.target.value })
//             }
//             id="tag"
//             placeholder="MERN,Next 13,Socket io,tailwind css,LMS"
//           />
//         </div>
//         <div className="w-[45%]">
//           <label htmlFor="">Course Categories</label>
//           <select
//             name=""
//             id=""
//             className={`${styles.input}`}
//             value={courseInfo.categories}
//             onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
//               setCourseInfo({ ...courseInfo, categories: e.target.value })
//             }
//           >
//             <option>Select Category</option>
//             {/* {categories?.map((item: any) => (
//               <option className="bg-blue-950" value={item._id} key={item._id}>
//                 {item.title}
//               </option>
//             ))} */}
//             {/* <option className="bg-blue-500" value="">
//               MERN
//             </option> */}
//           </select>
//         </div>
//       </div>
//       <br />

//       <div className="w-full flex justify-between">
//         <div className="w-full">
//           <label className={`${styles.label}`}>Course Level</label>
//           <input
//             type="text"
//             name=""
//             required
//             value={courseInfo.level}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setCourseInfo({ ...courseInfo, level: e.target.value })
//             }
//             id="level"
//             placeholder="Beginner/Intermediate/Expert"
//             className={`${styles.input}`}
//           />
//         </div>
//       </div>
//       <br />

//       <div className="w-full">
//         <input
//           type="file"
//           accept="image/*"
//           id="file"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//         <label
//           htmlFor="file"
//           className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
//             dragging ? "bg-blue-500" : "bg-transparent"
//           }`}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           {courseInfo.thumbnail ? (
//             <Image
//               src={courseInfo.thumbnail.toString()}
//               alt=""
//               className="max-h-full w-full object-cover"
//               width={100}
//               height={100}
//             />
//           ) : (
//             <span className="text-black dark:text-white">
//               Drag and drop your thumbnail here or click to browse
//             </span>
//           )}
//         </label>
//       </div>
//       <br />
//       <br />
//       <div className="w-full flex items-center justify-end">
//         <input
//           type="text"
//           value={"Next"}
//           className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
//           onClick={() => {
//             setActive(1);
//           }}
//         />
//       </div>
//       <br />
//       <br />
//     </div>
//   );
// };

// export default CourseInformation;
