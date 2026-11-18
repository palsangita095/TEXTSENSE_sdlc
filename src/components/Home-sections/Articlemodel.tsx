import type { Article } from "@/type/type/article.type";

type ArticlemodelProps = {
  article: Article;
  onClose: () => void;
};

const Articlemodel = ({ article, onClose }: ArticlemodelProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-8">
          <span className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            {article.category}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close article"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-slate-900 mb-4">
            {article.title}
          </h2>

          <div className="flex items-center text-sm text-slate-500 mb-6">
            <i className="fa-regular fa-clock mr-2"></i>
            <span>{article.time}</span>
          </div>

          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 mb-6"></div>

          <div className="text-base leading-8 text-slate-600">
            {article.content}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-100 px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            Close article
          </button>
        </div>
      </div>
    </div>
  );
};

export default Articlemodel;
