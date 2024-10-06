import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const artistTips = [
  "Tip: Consider using AI-generated images as a starting point for your designs, then add your unique artistic touch.",
  "Remember: Verify the licensing terms of the AI tool to ensure you can use the generated images commercially.",
  "Idea: Try generating multiple variations of your concept to explore different design possibilities.",
  "Pro tip: Use AI to quickly visualize color schemes and compositions before finalizing your design.",
  "Note: Some print-on-demand platforms have specific size and DPI requirements. Always check before finalizing your design.",
  "Suggestion: Experiment with different prompts to see how they affect the AI's interpretation of your idea.",
  "Remember: AI-generated art can be a great source of inspiration, even if you don't use it directly in your final design.",
  "Tip: Consider the placement of key elements in your design, keeping in mind how it will look on different products.",
  "Idea: Use AI to generate background textures or patterns that complement your main design elements.",
  "Pro tip: Keep your target audience in mind when crafting prompts for AI-generated illustrations.",
];

export default function CustomLoader() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % artistTips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      <p className="text-lg font-semibold text-gray-700">Crafting your image...</p>
      <div className="max-w-md text-center">
        <p className="text-sm text-gray-800">{artistTips[tipIndex]}</p>
      </div>
    </div>
  );
};