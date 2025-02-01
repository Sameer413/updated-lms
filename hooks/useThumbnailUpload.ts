import { useCallback, useState } from "react";

const useThumbnailUpload = (setCourseInfo: (info: courseStateType) => void) => {
    const [dragging, setDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCourseInfo((prev) => ({ ...prev, thumbnail: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    }, [setCourseInfo]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setCourseInfo((prev) => ({ ...prev, thumbnail: reader.result }));
                }
            };
            reader.readAsDataURL(file);
        }
    }, [setCourseInfo]);

    return { dragging, handleDragOver, handleDragLeave, handleDrop, handleFileChange };
};

export default useThumbnailUpload;