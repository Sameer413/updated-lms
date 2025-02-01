import { Document } from "mongoose"

interface courseType extends Document {
    _id: string;
    userId: string;
    name: string;
    description?: string;
    categories: string; // It has some mistype making it complex
    price: number;
    estimatedPrice?: number;
    thumbnail: {
        path: string;
        url: string;
    };
    tags: string; // Hashtags
    level: string;
    demoUrl: string;
    benefits: { title: string }[];
    prerequisites: { title: string }[];
    reviews: IReview[];
    courseData: mongoose.Types.ObjectId[]; // Reference to `CourseData`
    ratings?: number;
    purchased?: number;
}

