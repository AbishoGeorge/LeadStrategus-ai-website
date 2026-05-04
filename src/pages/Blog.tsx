import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { useSeo } from '../lib/useSeo';

const POSTS_PER_PAGE = 12;

export default function Blog() {
  useSeo(
    'B2B AI & GTM Insights Blog | LeadStrategus',
    'Insights on AI agents, intent signals, and B2B revenue systems to grow your pipeline.'
  );

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const featured = blogPosts[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blogPosts.slice(1);
    return blogPosts.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pagePosts = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);
  const isSearching = query.trim().length > 0;

  function handleSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  function goTo(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800 pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
              <Tag className="w-3 h-3" />
              B2B AI & Revenue Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Blog
            </h1>
            <p className="mt-4 text-lg text-white/60 leading-relaxed max-w-xl">
              Thinking on Contextual Intelligence, intent signals, and B2B revenue systems.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-8 max-w-md"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-11 pr-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 backdrop-blur-sm transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Post ── */}
      {!isSearching && (
        <section className="relative -mt-8 pb-4 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                to={`/blog/${featured.slug}`}
                className="group block rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative overflow-hidden aspect-video lg:aspect-auto lg:min-h-[360px]">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm text-electric-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center px-8 py-10 sm:px-10 sm:py-12 lg:px-12">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-xs font-semibold text-electric-500 bg-electric-50 px-3 py-1 rounded-full">
                        {featured.category}
                      </span>
                      <span className="text-xs text-gray-400">{featured.date}</span>
                      <span className="text-xs text-gray-400">{featured.readTime}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 leading-snug mb-4 group-hover:text-electric-600 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-8 text-base">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-electric-500">
                      Read article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Grid ── */}
      <section className="py-16 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSearching && (
            <p className="text-sm text-gray-400 mb-6">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
          )}

          {pagePosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {pagePosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 h-full"
                  >
                    <div className="relative overflow-hidden" style={{ paddingTop: '58%' }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-600"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-electric-500 bg-electric-50 px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400">{post.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-navy-900 mb-2 group-hover:text-electric-600 transition-colors leading-snug flex-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <span className="text-xs text-gray-400">{post.date}</span>
                        <div className="flex items-center gap-1 text-xs font-semibold text-electric-500">
                          Read more
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-xl font-semibold text-gray-300 mb-2">No articles found</p>
              <p className="text-sm text-gray-400">Try searching with a different keyword.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <section className="py-12 bg-gray-50/60 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => goTo(safePage - 1)}
                disabled={safePage === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm disabled:opacity-35 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>

              <span className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-500 select-none shadow-sm">
                Page {safePage} of {totalPages}
              </span>

              <button
                onClick={() => goTo(safePage + 1)}
                disabled={safePage === totalPages}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm disabled:opacity-35 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
