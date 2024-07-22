"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AllNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getNews = async () => {
    try {
      const res = await fetch('https://newsapi.org/v2/everything?q=tech&apiKey=a941b98b93c5455b8a0af6966583ba29');
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      return data.articles.filter(article => article.url && article.urlToImage);
    } catch (error) {
      setError(error.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews();
      setNews(newsData);
      setLoading(false);
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <section>
      <div className="container mx-auto p-4 pt-24">
        {news.length === 0 ? (
          <p className="text-center mt-10">No articles available.</p>
        ) : (
          news.map((article, index) => (
            <div key={article.url || index} className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:flex-1">
                  <h2 className="font-extrabold text-2xl mb-2">{article.title}</h2>
                  <p className="text-gray-700 mb-4">{article.description}</p>
                </div>
                {article.urlToImage && (
                  <div className="md:flex-shrink-0">
                    <Image
                      src={article.urlToImage}
                      alt={article.title}
                      width={400}
                      height={300}
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Read More
              </a>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
