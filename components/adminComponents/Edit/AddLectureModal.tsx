"use client";
import { styles } from "@/app/styles/styles";
import { Input } from "@/components/ui/Input";
import { useUploadFile } from "@/hooks/useUpload";
import { useAddCourseDataMutation } from "@/redux/features/courseData/courseDataApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

interface Props {
  setShow: (show: boolean) => void;
  courseId: string;
}

const AddLectureModal: React.FC<Props> = ({ setShow, courseId }) => {
  const [insertCourseData, { isError, isLoading }] = useAddCourseDataMutation();

  const [file, setFile] = useState<File>();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoPath, setVideoPath] = useState<string>("");
  const [data, setData] = useState({
    title: "",
    description: "",
    sectionTitle: "",
    path: "",
    url: "",
    videoUrl: "",
    videoLength: "",
    courseId: courseId,
  });

  const { uploadFile, uploading, fileUrl } = useUploadFile();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = e.target.files?.[0] || null;

    if (fileData) {
      // ✅ Create a temporary URL for the video file

      if (fileData.size > 50 * 1024 * 1024) {
        return alert("File size is greater than 50mb");
      }

      const videoURL = URL.createObjectURL(fileData);

      // ✅ Create a video element to get the duration
      const video = document.createElement("video");
      video.src = videoURL;
      video.preload = "metadata"; // Ensures metadata loads

      video.onloadedmetadata = () => {
        const duration = video.duration; // ✅ Duration in seconds
        console.log("Video duration:", duration);

        // ✅ Update state with file and duration
        setFile(fileData);
        setData((prevData) => ({
          ...prevData,
          videoLength: (duration / 60).toFixed(2), // Convert to minutes
        }));

        // ✅ Clean up the temporary URL
        URL.revokeObjectURL(videoURL);
      };
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      console.error("No file selected!");
      return;
    }

    try {
      const { success, error, path, url } = await uploadFile({
        file: file,
        bucket: "videos",
        fileName: `${data.title}_${data.sectionTitle}.mp4`,
      });

      if (error) {
        console.error("Upload failed:", error);
        return;
      }

      if (success && path && url) {
        toast.success("Uploaded file");

        // ✅ Update `data` correctly
        setData((prevData) => ({
          ...prevData,
          videoUrl: url.toString(),
          path: path.toString(),
        }));
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  // ✅ Insert data only when `data.videoUrl` and `data.path` are available
  useEffect(() => {
    if (data.videoUrl && data.path) {
      console.log("Updated Data Before Insert:", data); // ✅ Correctly updated

      insertCourseData({
        courseId: courseId,
        description: data.description,
        path: data.path,
        sectionTitle: data.sectionTitle,
        title: data.title,
        videoLength: data.videoLength,
        videoUrl: data.videoUrl,
      }).then(() => {
        setShow(false);
      });
    }
  }, [data]);

  return (
    <div className="bg-slate-900 p-6 border border-[#ffffff1d] shadow-xl absolute w-[600px] right-1/4 top-20 bg-opacity-100 rounded-xl">
      {/* Close Button */}
      <div className="flex justify-end">
        <IoMdClose
          onClick={() => setShow(false)}
          className="text-white cursor-pointer text-2xl hover:text-gray-400 transition"
        />
      </div>

      <div className="mt-2">
        <label className={styles.label}>Lecture Title</label>
        <Input
          value={data.title}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, title: e.target.value })
          }
          id="title"
          className={`${styles.input} border-gray-700`}
          type="text"
        />
      </div>

      {/* Section Description Input */}
      <div className="mt-4">
        <label className={styles.label}>Lecture Description</label>
        <Input
          value={data.description}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, description: e.target.value })
          }
          id="description"
          className={`${styles.input} border-gray-700`}
          type="text"
        />
      </div>

      {/* Lecture Title Input */}
      <div className="mt-4">
        <label className={styles.label}>Enter Section Title</label>
        <Input
          value={data.sectionTitle}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, sectionTitle: e.target.value })
          }
          id="sectionTitle"
          className={`${styles.input} border-gray-700`}
          type="text"
        />
      </div>

      {/* File Upload Input */}
      <div className="mt-4">
        <label htmlFor="file" className={styles.label}>
          <span className="text-gray-300">Choose a file</span>
        </label>
        <Input
          type="file"
          accept="video/*"
          id="video"
          className="file:text-white file:border-none file:rounded file:cursor-pointer mt-2 border-gray-700"
          onChange={handleFileChange}
        />
      </div>

      {/* Add Section Button */}
      <button
        className="w-full h-[44px] bg-[#37a39a] text-white font-medium rounded-lg mt-6 hover:bg-[#2b857f] transition"
        onClick={handleSubmit}
        disabled={uploading}
      >
        {isLoading ? "loading" : "Add Lecture"}
      </button>
    </div>
  );
};

export default AddLectureModal;
