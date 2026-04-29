import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { useSeo } from '../lib/useSeo';

function renderContent(content: string) {
  const paragraphs = content.trim().split('\n\n');
  return paragraphs.map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="text-xl sm:text-2xl font-bold text-navy-900 mt-10 mb-4 leading-snug">
          {block.slice(3)}
        </h2>
      );
    }
    if (block.startsWith('**') && block.endsWith('**')) {
      return (
        <p key={i} className="font-semibold text-navy-900 mt-6 mb-1">
          {block.slice(2, -2)}
        </p>
      );
    }
    // handle inline bold within paragraphs
    const parts = block.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-gray-600 leading-relaxed mb-0">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-semibold text-navy-900">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  useSeo(
    post ? `${post.title} | LeadStrategus` : 'Blog | LeadStrategus',
    post ? post.description : 'Insights on AI agents, intent signals, and B2B revenue systems.'
  );

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)
    .concat(
      blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category).slice(0, 3 - Math.min(3, blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).length))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/30 to-white">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-navy-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </Link>
      </div>

      {/* Article header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-semibold text-electric-500 bg-electric-50 px-2.5 py-1 rounded-md">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            {post.excerpt}
          </p>
        </motion.div>

        {/* Cover image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-12 shadow-md"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/7] object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="prose-custom space-y-5 text-base"
        >
          {renderContent(post.content)}
        </motion.div>

        {/* Bottom back link */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-navy-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-navy-900 mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                >
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-250 h-full"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-electric-500 bg-electric-50 px-2 py-0.5 rounded-md">
                          {p.category}
                        </span>
                        <span className="text-xs text-gray-400">{p.readTime}</span>
                      </div>
                      <h3 className="text-sm font-bold text-navy-900 mb-2 group-hover:text-electric-600 transition-colors leading-snug flex-1">
                        {p.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-electric-500">
                        Read more
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
