import React, { useState } from "react";
import { Search, Plus, Upload, X } from "lucide-react";
import removeMarkdown from "remove-markdown";

function Result() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleAnalyzePlant = async () => {
    if (!selectedImage) {
      alert("Please upload a plant image first");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("question", prompt);

      const API_URL = `${import.meta.env.VITE_BACKEND_URL}/analyze-plant`;

      const response = await fetch(API_URL, { method: "POST", body: formData });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert(error?.message || "Analysis failed. Please try again.");
      console.error("Analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Plant Disease Analyzer
        </h1>
        <p className="text-gray-600">
          Upload a plant image to detect diseases and get treatment advice
        </p>
      </div>

      {/* Upload + Input */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Image Upload */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200"
              >
                {selectedImage ? <Upload size={24} /> : <Plus size={24} />}
              </label>
            </div>

            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Plant preview"
                  className="w-16 h-16 object-cover rounded-lg border-2 border-green-300"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Question Input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Ask a question about this plant (optional)..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && selectedImage) handleAnalyzePlant();
              }}
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyzePlant}
            disabled={loading || !selectedImage}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Search size={18} className="mr-2" />
                Analyze
              </>
            )}
          </button>
        </div>

        {!selectedImage && (
          <p className="text-sm text-gray-500 mt-3 text-center">
            Please upload a plant image to start analysis
          </p>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing plant image...</p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-green-800">Analysis Results</h2>

          {/* Disease Info */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-700 mb-2">
              Disease Detected
            </h3>
            <p className="text-lg font-bold text-gray-800">{result.disease}</p>
            <p className="text-green-600">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>

          {/* Solution */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-700 mb-2">Treatment Advice</h3>
            <p className="text-gray-700 whitespace-pre-wrap">
              {removeMarkdown(result.solution)}
            </p>
          </div>

          {/* Question */}
          {prompt && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Your Question</h3>
              <p className="text-gray-600">{prompt}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Result;
