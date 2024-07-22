"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 4); // cycle through the top 4 articles
    }, 5000); // switch every 5 seconds

    return () => clearInterval(interval); // clean up the interval on component unmount
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  // Assuming the first 4 articles are the top articles
  const topArticles = news.slice(0, 4);
  const nextThreeArticles = news.slice(4, 7);

  return (
    <section>
      <div className="container mx-auto p-4 pt-24">
        {topArticles.length > 0 && (
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="w-full lg:w-[800px] h-[300px] lg:h-[600px]">
                <div className="grid grid-rows-2 gap-y-5 h-full">
                  <div className="flex-grow md:flex-shrink-0">
                    <Image
                      src={topArticles[currentSlide].urlToImage}
                      alt={topArticles[currentSlide].title}
                      width={800}
                      height={400}
                      className="object-cover rounded-lg w-full h-full"
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
                    <div>
                      <h2 className="font-extrabold text-xl lg:text-2xl mb-2 lg:mb-10">{truncateText(topArticles[currentSlide].title, 70)}</h2>
                      <a href={topArticles[currentSlide].url} target="_blank" rel="noopener noreferrer" className="text-white my-10 border p-2 lg:p-3 bg-blue-950 hover:bg-gray-300 hover:text-black">
                        Read More
                      </a>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-4">{truncateText(topArticles[currentSlide].description, 150)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {nextThreeArticles.length > 0 && (
                  <div className="border-2 bg-blue-950 text-white p-5 mt-1">
                    <h1 className="font-extrabold text-xl lg:text-3xl mb-4">Other Articles</h1>
                    {nextThreeArticles.map((article, index) => (
                      <div key={article.url || index} className="border-b border-gray-200 pb-4 mb-4">
                        <div className="flex flex-col md:flex-row md:items-center w-full md:w-[500px]">
                          <div className="md:flex-1">
                            <h2 className="font-extrabold text-sm lg:text-lg mb-2">{truncateText(article.title, 70)}</h2>
                            <p className="text-white mb-4 text-xs lg:text-sm">{truncateText(article.description, 150)}</p>
                          </div>
                        </div>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">
                          Read More
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
