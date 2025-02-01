import { useUploadFile } from "./hooks/useUpload";
import { useState } from "react";

const UploadVideo = () => {
  const { uploadFile, uploading, error, fileUrl, progress } = useUploadFile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first");

    await uploadFile({
      file: selectedFile,
      fileName: `videos/${selectedFile.name.replace(/\s+/g, "_")}`,
      mimeType: selectedFile.type,
    });
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? `Uploading... ${progress}%` : "Upload Video"}
      </button>
      {uploading && (
        <progress value={progress} max="100">
          {" "}
        </progress>
      )}
      {error && <p style={{ color: "red" }}> {error} </p>}
      {fileUrl && (
        <p>
          Uploaded:{" "}
          <a href={fileUrl} target="_blank">
            {" "}
            {fileUrl}{" "}
          </a>
        </p>
      )}
    </div>
  );
};

export default UploadVideo;
