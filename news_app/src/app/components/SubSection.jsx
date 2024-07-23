"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SubSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [shuffledArticles, setShuffledArticles] = useState([]);

  const getNews = async () => {
    try {
      const res = await fetch('https://newsapi.org/v2/everything?q=gadgets&apiKey=a941b98b93c5455b8a0af6966583ba29');
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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await getNews();
      setNews(newsData);
      setLoading(false);
      setShuffledArticles(shuffleArray(newsData.slice(0, 15))); // Shuffle top 15 articles
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % shuffledArticles.length);
    }, 10000); // switch every 5 seconds

    return () => clearInterval(interval); // clean up the interval on component unmount
  }, [shuffledArticles]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <section>
        <div><h1 className="pl-24 font-extrabold text-3xl text-blue-950">Gizmo Gallery</h1></div>
      <div className="container mx-auto p-4 pt-24 pb-20">
        {shuffledArticles.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between gap-x-5 h-[400px]">
            {shuffledArticles.slice(currentSlide, currentSlide + 4).map((article, index) => (
              <div key={article.url} className="flex flex-row md:flex-col w-[300px] h-[500px]">
                <Link href={article.url}>
                <div className="w-full h-[300px] flex justify-center items-center text-center">
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="object-cover rounded-lg w-full h-full"
                    />
                </div>
                <div className="p-4">
                  <h2 className="font-extrabold text-2xl mb-2">{truncateText(article.title, 70)}</h2>
                  
                </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
