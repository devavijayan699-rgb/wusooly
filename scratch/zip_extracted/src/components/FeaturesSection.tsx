import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  BadgeType,
  FEATURES_SECTION_DATA,
  FeatureCardData,
  FeatureTabContent,
  getNextTabId,
} from '../data/featuresData';
import { ImageWithFallback } from './ImageWithFallback';
import { CardVisual, PhotoGlassChip } from './CardVisuals';

const BadgePill: React.FC<{ badge: BadgeType }> = ({ badge }) => {
  if (badge === 'CLOUD') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-[0.07em] uppercase bg-[#FEF3DC] text-[#6E4409] w-fit">
        CLOUD
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-[0.07em] uppercase bg-[#E3F3E8] text-[#0F3D24] w-fit">
      LIFETIME
    </span>
  );
};

interface FeatureBentoCardProps {
  card: FeatureCardData;
  index: number;
  reducedMotion: boolean;
}

const FeatureBentoCard: React.FC<FeatureBentoCardProps> = ({
  card,
  index,
  reducedMotion,
}) => {
  const isWide = card.size === 'wide';

  // Responsive grid span rules:
  // Desktop (lg: 3 columns, 3 rows, same row height across both tabs):
  // - tall: 1 col, 2 rows (lg:col-span-1 lg:row-span-2)
  // - wide: 2 cols, 1 row (sm:col-span-2 lg:col-span-2 lg:row-span-1)
  // - standard: 1 col, 1 row
  // Under 1024px (sm): 2 columns (wide card spans 2; tall photo card becomes a normal tall card)
  // Under 640px: 1 column, photo cards min-height 420px
  const spanClasses =
    card.size === 'tall'
      ? 'col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-2 min-h-[420px] sm:min-h-[340px] lg:min-h-0'
      : card.size === 'wide'
      ? card.theme === 'photo'
        ? 'col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[420px] sm:min-h-[310px] lg:min-h-0'
        : 'col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[280px] lg:min-h-0'
      : card.theme === 'photo'
      ? 'col-span-1 min-h-[420px] sm:min-h-[320px] lg:min-h-0'
      : 'col-span-1 min-h-[285px] lg:min-h-0';

  const hoverMotionProps = reducedMotion
    ? {}
    : {
        whileHover: { y: -4 },
      };

  const entryMotionProps = reducedMotion
    ? {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: {
          duration: 0.5,
          delay: index * 0.06,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      };

  if (card.theme === 'photo' && card.image) {
    return (
      <motion.article
        {...entryMotionProps}
        {...hoverMotionProps}
        className={`group relative overflow-hidden rounded-[28px] p-[28px] bg-[#0F3D24] text-white shadow-[0_6px_28px_-6px_rgba(15,61,36,0.12)] hover:shadow-[0_16px_38px_-8px_rgba(15,61,36,0.22)] flex flex-col justify-between select-none ${
          reducedMotion ? '' : 'transition-shadow duration-300'
        } ${spanClasses}`}
      >
        {/* Full-bleed background photo with slow zoom on hover */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className={`w-full h-full ${
              reducedMotion
                ? ''
                : 'transition-transform duration-700 ease-out group-hover:scale-[1.05]'
            }`}
          >
            <ImageWithFallback
              src={card.image.src}
              alt={card.image.alt}
              className={`w-full h-full object-cover ${
                card.image.objectPositionClass ?? ''
              }`}
            />
          </div>
          {/* Dark green gradient overlay: top 0.7 -> transparent -> bottom 0.88 */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(15, 61, 36, 0.70) 0%, rgba(15, 61, 36, 0.12) 44%, rgba(15, 61, 36, 0.88) 100%)',
            }}
          />
        </div>

        {/* Top-left badge & title */}
        <div className="relative z-10 flex flex-col items-start gap-2.5">
          <BadgePill badge={card.badge} />
          <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-white max-w-[75%]">
            {card.title}
          </h3>
        </div>

        {/* Bottom-left optional floating glass chip + description */}
        <div className="relative z-10 flex flex-col items-start gap-3 mt-8 max-w-full">
          {card.glassChip && (
            <PhotoGlassChip chip={card.glassChip} reducedMotion={reducedMotion} />
          )}
          <p className="text-[13.5px] leading-[1.5] text-white/92 font-normal max-w-[420px]">
            {card.description}
          </p>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      {...entryMotionProps}
      {...hoverMotionProps}
      className={`group relative overflow-hidden rounded-[28px] p-[28px] bg-white text-[#111111] border border-[#0F3D24]/[0.07] shadow-[0_4px_24px_-4px_rgba(15,61,36,0.05)] hover:shadow-[0_14px_34px_-6px_rgba(15,61,36,0.10)] flex flex-col justify-between ${
        reducedMotion ? '' : 'transition-shadow duration-300'
      } ${spanClasses}`}
    >
      {isWide ? (
        <div className="flex flex-col sm:flex-row sm:items-stretch justify-between gap-6 h-full">
          {/* Left column: Top-left badge & title, middle callout pill, bottom-left description */}
          <div className="flex flex-col justify-between items-start flex-1 min-w-0">
            <div className="flex flex-col items-start gap-2.5 w-full">
              <BadgePill badge={card.badge} />
              <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#111111] max-w-[85%]">
                {card.title}
              </h3>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-[12px] bg-[#F5F8F6] border border-[#0F3D24]/[0.06] text-[12px] text-[#0F3D24] font-medium my-auto">
              <span className="w-2 h-2 rounded-full bg-[#F2A93B]" aria-hidden="true" />
              <span>
                Top margin: <strong className="font-bold">Spices (+34%)</strong>
              </span>
            </div>

            <p className="text-[13.5px] leading-[1.5] text-[#666666] max-w-[360px] mt-4 sm:mt-0">
              {card.description}
            </p>
          </div>

          {/* Right column: Clean 6-bar chart visual */}
          {card.visual && (
            <div className="flex items-center justify-end shrink-0">
              <CardVisual visual={card.visual} reducedMotion={reducedMotion} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full gap-3">
          <div className="flex flex-col items-start gap-2">
            <BadgePill badge={card.badge} />
            <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#111111] max-w-[85%]">
              {card.title}
            </h3>
          </div>
          {card.visual && (
            <div className="w-full my-auto">
              <CardVisual visual={card.visual} reducedMotion={reducedMotion} />
            </div>
          )}
          <p className="text-[13.5px] leading-[1.5] text-[#666666] max-w-[420px]">
            {card.description}
          </p>
        </div>
      )}
    </motion.article>
  );
};

export const FeaturesSection: React.FC = () => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [activeTabId, setActiveTabId] = useState<'shops' | 'cafes'>(
    FEATURES_SECTION_DATA.defaultTabId
  );

  const tabButtonRefs = useRef<Record<'shops' | 'cafes', HTMLButtonElement | null>>({
    shops: null,
    cafes: null,
  });

  const activeTab: FeatureTabContent =
    FEATURES_SECTION_DATA.tabs.find((t) => t.id === activeTabId) ||
    FEATURES_SECTION_DATA.tabs[0];

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentId: 'shops' | 'cafes'
  ) => {
    const nextId = getNextTabId(FEATURES_SECTION_DATA.tabs, currentId, e.key);
    if (nextId) {
      e.preventDefault();
      setActiveTabId(nextId);
      tabButtonRefs.current[nextId]?.focus();
    }
  };

  return (
    <section
      aria-labelledby="wusooly-features-heading"
      className="w-full min-h-screen bg-[#F4F7F5] text-[#111111] py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-[1160px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9 sm:mb-11">
          <div>
            <h2
              id="wusooly-features-heading"
              className="text-[36px] sm:text-[44px] lg:text-[50px] font-bold tracking-[-0.035em] leading-[1.08] text-[#111111]"
            >
              <span className="block">{FEATURES_SECTION_DATA.headingLine1}</span>
              <span className="block">{FEATURES_SECTION_DATA.headingLine2}</span>
            </h2>
            <div className="mt-3 min-h-[26px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTab.subline}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                  }
                  className="text-[15.5px] sm:text-[16.5px] font-medium text-[#666666] tracking-[-0.01em]"
                >
                  {activeTab.subline}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Segmented Pill Tab Switch */}
          <div
            role="tablist"
            aria-label="Business category features"
            className="w-full sm:w-auto inline-flex items-center p-1.5 rounded-full bg-white shadow-[0_2px_14px_-2px_rgba(15,61,36,0.06)] border border-[#0F3D24]/[0.06]"
          >
            {FEATURES_SECTION_DATA.tabs.map((tab) => {
              const isSelected = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabButtonRefs.current[tab.id] = el;
                  }}
                  id={`tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={`tabpanel-${tab.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTabId(tab.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
                  className={`relative flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-full text-[13.5px] font-semibold tracking-[-0.01em] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D7A3E] ${
                    prefersReducedMotion ? '' : 'transition-colors duration-200'
                  } ${
                    isSelected
                      ? 'text-white'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="wusooly-active-tab-pill"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                      className="absolute inset-0 rounded-full bg-[#1D7A3E] shadow-[0_2px_10px_rgba(29,122,62,0.28)]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            id={`tabpanel-${activeTab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab.id}`}
            tabIndex={0}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
            }
            className="focus:outline-none"
          >
            {/* 3-Column, 3-Row Bento Grid on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[304px] gap-[20px]">
              {activeTab.cards.map((card, index) => (
                <FeatureBentoCard
                  key={card.id}
                  card={card}
                  index={index}
                  reducedMotion={prefersReducedMotion}
                />
              ))}
            </div>

            {/* Chips Row below the grid */}
            {activeTab.chipGroups.length > 0 && (
              <div className="mt-9 sm:mt-11 pt-2 flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                {activeTab.chipGroups.map((group) => (
                  <div
                    key={group.id}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <span className="text-[13px] font-semibold text-[#666666] mr-1.5">
                      {group.caption}
                    </span>
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap ${
                          group.tone === 'green'
                            ? 'bg-[#E3F3E8] text-[#0F3D24]'
                            : 'bg-[#FEF3DC] text-[#6E4409]'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
