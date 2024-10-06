'use server';
import MoreTrend from "@/models/moreTrend";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "@/utils/db";

export async function saveData(data) {
    'use server';
    await connectToMongoDB();
    const { trend, language, results } = data;
    console.log("Saving data.........", data);

    try {
        const newData = new MoreTrend({
            updated: new Date(),
            trend,
            language,
            results
        });
        await newData.save();
        //    revalidatePath('/trends');


    } catch (error) {
        console.log(error);
        return { message: error };
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


export async function callHuggingFaceAPI(modelSelected, data) {
    'use server';
    console.log("Calling HuggingFace API.........");
    try {
        const response = await fetch(
            `https://api-inference.huggingface.co/models/black-forest-labs/${modelSelected}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
                cache: "no-cache",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch image.");
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');

        // Revalidate the path to ensure fresh data
        revalidatePath('/');

        return { success: true, image: base64 };
    } catch (error) {
        console.log(error);
        return { message: error };
    }
}
