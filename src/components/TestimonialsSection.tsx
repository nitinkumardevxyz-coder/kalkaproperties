import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from 'lucide-react';
import { CLIENT_TESTIMONIALS, Language } from '../data/kalkaData';
import {
  getNextSlideIndex,
  getPrevSlideIndex,
  getSlideSlice,
  getTotalSlides,
} from '../utils/testimonialLogic';

interface TestimonialsSectionProps {
  lang: Language;
  autoSlideIntervalMs?: number;
}

const ITEMS_PER_SLIDE = 2;

export function TestimonialsSection({
  lang,
  autoSlideIntervalMs = 4200,
}: TestimonialsSectionProps) {
  const prefersReduced = useReducedMotion();
  const totalSlides = getTotalSlides(CLIENT_TESTIMONIALS.length, ITEMS_PER_SLIDE);

  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => !prefersReduced);
  const [isHoveredOrFocused, setIsHoveredOrFocused] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setIsPlaying(false);
    }
  }, [prefersReduced]);

  useEffect(() => {
    if (!isPlaying || isHoveredOrFocused || totalSlides <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlideIndex((prev) => getNextSlideIndex(prev, totalSlides));
    }, autoSlideIntervalMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, isHoveredOrFocused, totalSlides, autoSlideIntervalMs]);

  const handlePrev = () => {
    setSlideIndex((prev) => getPrevSlideIndex(prev, totalSlides));
  };

  const handleNext = () => {
    setSlideIndex((prev) => getNextSlideIndex(prev, totalSlides));
  };

  const slides = Array.from({ length: totalSlides }, (_, idx) =>
    getSlideSlice(CLIENT_TESTIMONIALS, idx, ITEMS_PER_SLIDE)
  );

  return (
    <section
      data-testid="testimonials-section"
      aria-label={lang === 'en' ? 'Client Testimonials' : 'ग्राहक अनुभव'}
      className="relative border-t border-white/10 bg-transparent py-14 lg:py-16"
      onMouseEnter={() => setIsHoveredOrFocused(true)}
      onMouseLeave={() => setIsHoveredOrFocused(false)}
      onFocusCapture={() => setIsHoveredOrFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsHoveredOrFocused(false);
        }
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Section Header + Carousel Controls */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wide text-amber-400">
              {lang === 'en' ? 'Verified Client Trust' : 'संतुष्ट ग्राहकों के अनुभव'}
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {lang === 'en'
                ? 'Feedback Across Madangir & South Delhi Deals'
                : 'मदनगीर और दक्षिण दिल्ली के ग्राहकों का विश्वास'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              data-testid="testimonial-active-slide"
              className="font-mono-num mr-1 text-xs font-semibold text-slate-300"
            >
              0{slideIndex + 1} / 0{totalSlides}
            </span>

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-pressed={isPlaying}
              aria-label={
                isPlaying
                  ? lang === 'en'
                    ? 'Pause auto-slide'
                    : 'ऑटो स्लाइड रोकें'
                  : lang === 'en'
                    ? 'Resume auto-slide'
                    : 'ऑटो स्लाइड चलाएं'
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#141923] text-slate-200 hover:border-amber-400/50 hover:text-white cursor-pointer"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>

            <button
              type="button"
              onClick={handlePrev}
              aria-label={lang === 'en' ? 'Previous testimonials' : 'पिछला अनुभव'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#141923] text-slate-200 hover:border-amber-400/50 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={lang === 'en' ? 'Next testimonials' : 'अगला अनुभव'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#141923] text-slate-200 hover:border-amber-400/50 hover:text-white cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Smooth Auto-Sliding Viewport */}
        <div className="mt-8 overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${slideIndex * 100}%` }}
            transition={{
              duration: prefersReduced ? 0 : 0.62,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ willChange: 'transform' }}
          >
            {slides.map((group, idx) => (
              <div
                key={`slide-${idx}`}
                aria-hidden={idx !== slideIndex}
                className="grid w-full shrink-0 grid-cols-1 gap-6 md:grid-cols-2"
              >
                {group.map((item) => (
                  <article
                    key={item.id}
                    className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#141923]/92 p-6 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <div
                          className="flex items-center gap-1 text-amber-400"
                          aria-label={`${item.rating} out of 5 stars`}
                        >
                          {Array.from({ length: item.rating }).map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-amber-300">
                          {lang === 'en' ? item.serviceTagEn : item.serviceTagHi}
                        </span>
                      </div>

                      <div className="mt-4 flex items-start gap-2.5">
                        <Quote
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#EF4444]"
                          aria-hidden="true"
                        />
                        <p className="text-sm leading-relaxed text-slate-200">
                          {lang === 'en' ? item.quoteEn : item.quoteHi}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-baseline justify-between gap-3 border-t border-white/10 pt-4">
                      <span className="font-display text-sm font-bold text-white">
                        {item.clientName}
                      </span>
                      <span className="text-right text-xs text-slate-400">
                        {lang === 'en' ? item.localityEn : item.localityHi}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Slide Progress Indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, idx) => {
            const active = idx === slideIndex;
            return (
              <button
                key={`dot-${idx}`}
                type="button"
                onClick={() => setSlideIndex(idx)}
                aria-label={`Go to testimonial slide ${idx + 1}`}
                aria-current={active ? 'true' : undefined}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  active
                    ? 'w-8 bg-[#DC2626]'
                    : 'w-2 bg-white/25 hover:bg-white/45'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
