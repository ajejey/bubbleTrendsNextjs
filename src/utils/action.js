'use server';
import MoreTrend from "@/models/moreTrend";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "@/utils/db";
import { v4 as uuidv4 } from 'uuid';

const jobs = new Map();

export async function saveData(dataArray) {
    'use server';
    await connectToMongoDB();
    console.log("Saving data in bulk...", dataArray);

    try {
        const documents = dataArray.map(data => ({
            updated: new Date(),
            trend: data.trend,
            language: data.language,
            results: data.results
        }));

        await MoreTrend.insertMany(documents);
        console.log(`Successfully saved ${documents.length} documents`);
        // revalidatePath('/trends');
    } catch (error) {
        console.error("Error saving data in bulk:", error);
        return { message: error.message };
    }
}


export async function getMoreTrendsData(selectedDate) {
    'use server';
    await connectToMongoDB();
    console.log("Fetching more trends data.........");
    const currentDate = selectedDate ? new Date(selectedDate) : new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    try {
        const data = await MoreTrend.find({
            updated: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });
        revalidatePath('/trends');
        // console.log("data found : ", data.toString());
        return JSON.stringify(data) || [];
    } catch (error) {
        console.log(error);
        return { message: error };
    }
}


export async function initiateHuggingFaceAPI(modelSelected, data) {
    'use server';
    const jobId = uuidv4();
    jobs.set(jobId, { status: 'pending' });

    // Start the API call process without waiting for it to complete
    callHuggingFaceAPI(modelSelected, data, jobId);

    return { jobId };
}


export async function callHuggingFaceAPI(modelSelected, data, jobId) {
    'use server';
    console.log("Calling HuggingFace API.........");
    try {
        const response = await fetch(
            `https://api-inference.huggingface.co/models/black-forest-labs/${modelSelected}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
                cache: "no-cache",
            }
        );

        if (!response.ok) {
            console.log("response of huggingface : ", response);
            throw new Error("Failed to fetch image.", response);
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');

        // Revalidate the path to ensure fresh data
        // revalidatePath('/');

        // return { success: true, image: base64 };
        jobs.set(jobId, { status: 'completed', image: base64 });
    } catch (error) {
        console.log(error);
        jobs.set(jobId, { status: 'error', message: error.message });
    }
}


export async function checkJobStatus(jobId) {
    'use server';
    const job = jobs.get(jobId);
    if (!job) {
        return { status: 'not_found' };
    }
    return job;
}

