"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }

      setShortUrl(data.shortUrl);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="border-2 max-w-lg w-full p-6 border-gray-300 bg-white rounded-xl shadow-md">
        <form className="flex flex-col gap-4 rounded-lg border-2 p-6 shadow-sm" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-gray-800">Enter long URL</h1>
          <Input
            type="url"
            required
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 transition"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <h1 className="text-xl font-bold text-gray-800 mt-2">Your short URL</h1>
          <div className="shadow border-2 border-gray-200 p-3 rounded-md min-h-[48px] flex items-center bg-gray-50">
            <h2 id="answer" className="text-blue-600 font-mono text-sm break-all">
              {shortUrl ? (
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  {shortUrl}
                </a>
              ) : (
                <span className="text-gray-400 font-normal">Your link will appear here...</span>
              )}
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
}