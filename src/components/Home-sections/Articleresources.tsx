"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Articlemodel from "./Articlemodel";
import { articles } from "./articleData";

const Articleresources = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openArticle = (index: number) => setSelectedIndex(index);
  const closeArticle = () => setSelectedIndex(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeArticle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  const selectedArticle =
    selectedIndex !== null ? articles[selectedIndex] : null;

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-5 lg:px-8">
          {/* Section Heading */}
          <div className="flex flex-wrap items-end justify-between -mx-3 mb-10">
            {/* Left Heading */}
            <div className="w-full md:w-8/12 px-3 mb-6 md:mb-0">
              <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-600 mb-5">
                Articles &amp; Resources
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900">
                Learn how great teams
                <span className="block">work with feedback</span>
              </h2>
            </div>

            {/* Browse Button */}
            <div className="w-full md:w-4/12 px-3 md:text-right">
              <a
                href="#resources"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition duration-300"
              >
                Browse all resources
                <i className="fa-solid fa-arrow-up-right-from-square text-xs ml-3"></i>
              </a>
            </div>
          </div>

          {/* Resource Cards */}
          <div id="resources" className="flex flex-wrap -mx-3">
            {articles.map((article, index) => (
              <div
                key={article.title}
                className="w-full md:w-1/2 lg:w-1/3 px-3 mb-8"
              >
                <article className="h-full flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-200/50 transition duration-300">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      width={390}
                      height={160}
                      className="w-full h-44 sm:h-48 object-cover hover:scale-105 transition duration-500"
                    />

                    <span className="absolute top-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-700">
                      {article.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <h3 className="text-lg font-bold leading-snug text-slate-900 mb-3">
                      {article.title}
                    </h3>

                    <p className="text-sm leading-6 text-slate-500 mb-6">
                      {article.excerpt}
                    </p>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <span className="text-xs text-slate-500">
                        {article.time}
                      </span>

                      <button
                        type="button"
                        onClick={() => openArticle(index)}
                        className="inline-flex items-center text-sm font-semibold text-indigo-700 hover:text-indigo-500 transition"
                      >
                        Read
                        <i className="fa-solid fa-arrow-right text-xs ml-2"></i>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedArticle && (
        <Articlemodel article={selectedArticle} onClose={closeArticle} />
      )}
    </>
  );
};

export default Articleresources;
