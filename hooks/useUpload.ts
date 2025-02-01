import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';

const supabaseUrl = 'https://nzblsjrpwntfpaqvsgfh.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY!
const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY || '')
// const supabase = createClient(supabaseUrl, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56YmxzanJwd250ZnBhcXZzZ2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NjA4MjUsImV4cCI6MjA1MjUzNjgyNX0.qOXLr1Veru3HZjI7kU7feXfIwqmw8iYkqF-LISkLpJU")

export const storage = supabase.storage;


type UploadFileOptions = {
    bucket?: string;
    file: File | Blob;
    fileName: string;
    mimeType?: string;
};

export const useUploadFile = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);

    const uploadFile = async ({
        bucket = "videos",
        file,
        fileName,
    }: UploadFileOptions): Promise<{ success: boolean; url?: string; error?: string; path?: string }> => {
        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const fileSize = file.size;
            // const CHUNK_SIZE = 512 * 1024; // 512 KB chunks
            let uploadedBytes = 0;

            const reader = file.stream().getReader();

            const uploadResponse = await supabase.storage.from(bucket).upload(fileName, file, {
                // contentType: mimeType,
            });

            if (uploadResponse.error) {
                setError(uploadResponse.error.message);
                return { success: false, error: uploadResponse.error.message };
            }

            const { data: urlData } = await supabase.storage.from(bucket).getPublicUrl(uploadResponse.data.path);
            setFileUrl(urlData.publicUrl);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                uploadedBytes += value.length;
                setProgress(Math.round((uploadedBytes / fileSize) * 100));
            }

            return { success: true, url: urlData.publicUrl, path: uploadResponse.data.path };
        } catch (err: unknown) {
            const errorMessage = (err as Error).message || "An unknown error occurred";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setUploading(false);
        }
    };

    return { uploadFile, uploading, error, fileUrl, progress };
};