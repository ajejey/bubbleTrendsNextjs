'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RotateCw, Trash2 } from "lucide-react";
import { callHuggingFaceAPI, checkJobStatus, initiateHuggingFaceAPI } from "@/utils/action";
import CustomLoader from "./customLoader";
import { sendGTMEvent } from "@next/third-parties/google";

const HuggingFaceQuery = () => {
  const [jobId, setJobId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [modelSelected, setModelSelected] = useState("FLUX.1-schnell");
  const [guidanceScale, setGuidanceScale] = useState(3.5);
  const [numInferenceSteps, setNumInferenceSteps] = useState(25);
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [seed, setSeed] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [history, setHistory] = useState([]);
  const [imageBlob, setImageBlob] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const initDB = async () => {
      if (typeof window !== 'undefined') {
        const { openDB } = await import('idb');
        const database = await openDB('AIImageGeneratorDB', 1, {
          upgrade(db) {
            db.createObjectStore('prompts', { keyPath: 'id', autoIncrement: true });
          },
        });
        if (isMounted) {
          setDb(database);
          loadHistory(database);
        }
      }
    };

    initDB();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadHistory = async (database) => {
    if (!database) return;
    const tx = database.transaction('prompts', 'readonly');
    const store = tx.objectStore('prompts');
    const items = await store.getAll();
    setHistory(items.reverse());
  };

  const saveToHistory = async (data) => {
    if (!db) return;
    const tx = db.transaction('prompts', 'readwrite');
    const store = tx.objectStore('prompts');
    await store.add(data);
    await tx.done;
    loadHistory(db);
  };

  const fetchImage = async (data) => {
    setLoading(true);
    setError(null);
    setImage(null);
    setDownloadUrl(null);

    try {     
      const result = await callHuggingFaceAPI(modelSelected, data);
      let imageUrl
      if (result.success && result.image) {
        imageUrl = `data:image/png;base64,${result.image}`
        setImage(imageUrl)
        setDownloadUrl(imageUrl)
      } else {
        throw new Error(result.error || 'Failed to generate image')
      }

      // Save to history
      await saveToHistory({
        prompt,
        negativePrompt,
        modelSelected,
        guidanceScale,
        numInferenceSteps,
        width,
        height,
        seed,
        timestamp: new Date().toLocaleString(),
        imageBlob: imageUrl
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = () => {
  //   const data = {
  //     inputs: prompt,
  //     parameters: {
  //       guidance_scale: guidanceScale,
  //       negative_prompt: negativePrompt ? [negativePrompt] : undefined,
  //       num_inference_steps: numInferenceSteps,
  //       // target_size: { width, height },
  //       seed: seed ? parseInt(seed) : undefined,
  //     },
  //   };
  //   fetchImage(data);
  // };
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setImage(null);
    const data = {
      inputs: prompt,
      parameters: {
        guidance_scale: guidanceScale,
        negative_prompt: negativePrompt ? [negativePrompt] : undefined,
        num_inference_steps: numInferenceSteps,
        // target_size: { width, height },
        seed: seed ? parseInt(seed) : undefined,
      },
    };
    try {
      const result = await initiateHuggingFaceAPI(modelSelected, data);
      setJobId(result.jobId);
  } catch (err) {
      setError('Failed to initiate image generation');
      setLoading(false);
  }
  };

  const loadHistoryItem = (item) => {
    setPrompt(item.prompt);
    setNegativePrompt(item.negativePrompt);
    setModelSelected(item.modelSelected);
    setGuidanceScale(item.guidanceScale);
    setNumInferenceSteps(item.numInferenceSteps);
    setWidth(item.width);
    setHeight(item.height);
    setSeed(item.seed);
    setImage(item.imageBlob);
    setDownloadUrl(item.imageBlob);
  };

  const deleteHistoryItem = async (item) => {
    if (!db) return;
    const tx = db.transaction('prompts', 'readwrite');
    const store = tx.objectStore('prompts');
    await store.delete(item.id);
    await tx.done;
    loadHistory(db);
  };

  useEffect(() => {
    if (!jobId) return;

    const pollJobStatus = async () => {
        const result = await checkJobStatus(jobId);
        if (result.status === 'completed') {
            setImage(`data:image/png;base64,${result.image}`);
            setLoading(false);
            setJobId(null);
            // Save to history
            await saveToHistory({
              prompt,
              negativePrompt,
              modelSelected,
              guidanceScale,
              numInferenceSteps,
              width,
              height,
              seed,
              timestamp: new Date().toLocaleString(),
              imageBlob: `data:image/png;base64,${result.image}`
            });

            sendGTMEvent({event: 'ai_image_generated', value: history.length + 1});
        } else if (result.status === 'error') {
            setError(result.message);
            setLoading(false);
            setJobId(null);
        } else if (result.status === 'not_found') {
            setError('Job not found');
            setLoading(false);
            setJobId(null);
        }
    };

    const intervalId = setInterval(pollJobStatus, 4000); // Poll every second

    return () => clearInterval(intervalId);
}, [jobId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">AI Image Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Image Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <select
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={modelSelected}
                onChange={(e) => setModelSelected(e.target.value)}
              >
                <option value="FLUX.1-schnell">FLUX.1-schnell</option>
                <option value="FLUX.1-dev">FLUX.1-dev</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
              <textarea
                placeholder="Enter your prompt here"
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Negative Prompt</label>
              <input
                type="text"
                value={negativePrompt}
                placeholder="Enter negative prompt"
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setNegativePrompt(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guidance Scale: {guidanceScale}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={guidanceScale}
                onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inference Steps: {numInferenceSteps}
              </label>
              <input
                type="range"
                min="10"
                max="150"
                step="1"
                value={numInferenceSteps}
                onChange={(e) => setNumInferenceSteps(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  min="64"
                  max="1024"
                  step="64"
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  min="64"
                  max="1024"
                  step="64"
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div> */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seed (optional)</label>
              <input
                type="number"
                placeholder="Enter seed value"
                onChange={(e) => setSeed(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div> */}
            <button
              onClick={handleSubmit}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                }`}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Generated Image</h2>
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            {/* {loading && <p className="text-gray-600">Please wait, generating image...</p>} */}
            {loading && <CustomLoader prompt={prompt} />}
            {error && <p className="text-red-500">Error: {error}</p>}
            {image && (
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={image}
                  width={512}
                  height={512}
                  alt="Generated by AI"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />

                <a
                  href={downloadUrl}
                  download={`${prompt}.png`}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Download Image
                </a>
              </div>
            )}
            {!loading && !error && !image && (
              <p className="text-gray-500">Your generated image will appear here</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Generation History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-2 w-16">Load</th>
                <th className="px-4 py-2 w-1/2">Prompt</th>
                <th className="px-4 py-2">Model</th>
                <th className="px-4 py-2">Timestamp</th>
                <th className="px-2 py-2 w-16">Delete</th>
              </tr>
            </thead>
            <tbody>
              {history.length && history.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">
                    <button
                      onClick={() => loadHistoryItem(item)}
                      className=" hover:bg-blue-200 text-blue-500 font-bold py-1 px-2 rounded text-sm"
                    >
                      <RotateCw size={18} />
                    </button>
                  </td>
                  <td className="px-4 py-2">{item.prompt.substring(0, 150)}...</td>
                  <td className="px-4 py-2">{item.modelSelected}</td>
                  <td className="px-4 py-2">{new Date(item.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteHistoryItem(item)}
                      className=" hover:bg-red-200 text-red-500 font-bold py-1 px-2 rounded text-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
};

export default HuggingFaceQuery;