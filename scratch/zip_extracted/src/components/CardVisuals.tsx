import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Check,
  Package,
  Printer,
  ShoppingBag,
  Store,
  TrendingUp,
  Zap,
} from 'lucide-react';
import {
  CardVisualConfig,
  FloorTableTile,
  GlassChipConfig,
  formatIndianNumber,
} from '../data/featuresData';

interface GlassChipProps {
  chip: GlassChipConfig;
  reducedMotion: boolean;
}

export const PhotoGlassChip: React.FC<GlassChipProps> = ({ chip, reducedMotion }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [displayValue, setDisplayValue] = useState<number>(
    chip.type === 'counter' ? (reducedMotion ? chip.targetAmount : 0) : 0
  );
  const [activeSegmentIdx, setActiveSegmentIdx] = useState<number>(0);

  // Count-up effect for counter glass chip
  useEffect(() => {
    if (chip.type !== 'counter') return;
    if (reducedMotion) {
      setDisplayValue(chip.targetAmount);
      return;
    }
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const duration = 1100;
    const target = chip.targetAmount;

    let animationFrameId: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [chip, isInView, reducedMotion]);

  // Auto-cycle effect every 3 seconds for segmented-cycle glass chip
  useEffect(() => {
    if (chip.type !== 'segmented-cycle' || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveSegmentIdx((prev) => (prev + 1) % chip.options.length);
    }, chip.intervalMs);
    return () => window.clearInterval(timer);
  }, [chip, reducedMotion]);

  if (chip.type === 'status') {
    return (
      <div
        ref={ref}
        className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-[16px] bg-white/15 backdrop-blur-md border border-white/30 text-[13px] font-semibold text-white shadow-sm w-fit max-w-full"
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          {!reducedMotion && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2A93B] opacity-80" />
          )}
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F2A93B]" />
        </span>
        <span className="tracking-[-0.01em] truncate">{chip.text}</span>
      </div>
    );
  }

  if (chip.type === 'plain') {
    return (
      <div
        ref={ref}
        className="inline-flex items-center px-3.5 py-2 rounded-[16px] bg-white/15 backdrop-blur-md border border-white/30 text-[13px] font-semibold text-white shadow-sm w-fit max-w-full"
      >
        <span className="tracking-[-0.01em] truncate">{chip.text}</span>
      </div>
    );
  }

  if (chip.type === 'segmented-cycle') {
    return (
      <div
        ref={ref}
        role="group"
        aria-label="Order modes"
        className="inline-flex items-center gap-1 p-1 rounded-[16px] bg-white/15 backdrop-blur-md border border-white/30 text-[13px] font-semibold text-white shadow-sm w-fit"
      >
        {chip.options.map((option, idx) => {
          const isActive = idx === activeSegmentIdx;
          return (
            <React.Fragment key={option}>
              {idx > 0 && (
                <span
                  aria-hidden="true"
                  className="text-white/45 text-[12px] select-none px-0.5"
                >
                  ·
                </span>
              )}
              <button
                type="button"
                onClick={() => setActiveSegmentIdx(idx)}
                aria-pressed={isActive}
                className={`relative px-2.5 py-1 rounded-[12px] text-[13px] font-semibold tracking-[-0.01em] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white ${
                  reducedMotion ? '' : 'transition-colors duration-200'
                } ${isActive ? 'text-white' : 'text-white/75 hover:text-white'}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="cafe-order-mode-pill"
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 380, damping: 30 }
                    }
                    className="absolute inset-0 rounded-[12px] bg-[#1D7A3E] border border-white/25 shadow-xs"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{option}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[16px] bg-white/15 backdrop-blur-md border border-white/30 text-[13px] font-semibold text-white shadow-sm w-fit tabular-nums"
    >
      <span>{chip.prefix}</span>
      <span className="text-white font-bold">
        {chip.currencySymbol}
        {formatIndianNumber(displayValue)}
      </span>
    </div>
  );
};

interface CardVisualProps {
  visual: CardVisualConfig;
  reducedMotion: boolean;
}

export const CardVisual: React.FC<CardVisualProps> = ({
  visual,
  reducedMotion,
}) => {
  switch (visual.type) {
    case 'profit-chart':
      return <ProfitMarginsVisual bars={visual.bars} reducedMotion={reducedMotion} />;
    case 'barcode-generator':
      return (
        <BarcodeGeneratorVisual
          defaultCode={visual.defaultCode}
          buttonLabel={visual.buttonLabel}
          reducedMotion={reducedMotion}
        />
      );
    case 'ledger-list':
      return <LedgerListVisual rows={visual.rows} />;
    case 'reports-sparkline':
      return (
        <ReportsSparklineVisual
          tabs={visual.tabs}
          defaultTab={visual.defaultTab}
          reducedMotion={reducedMotion}
        />
      );
    case 'tables-floor-plan':
      return (
        <TablesFloorPlanVisual
          initialTables={visual.tables}
          reducedMotion={reducedMotion}
        />
      );
    case 'online-order-notification':
      return (
        <OnlineOrderNotificationVisual
          orderText={visual.orderText}
          buttonLabel={visual.buttonLabel}
          reducedMotion={reducedMotion}
        />
      );
    case 'bestsellers-bars':
      return (
        <BestsellersBarsVisual
          items={visual.items}
          reducedMotion={reducedMotion}
        />
      );
    case 'promo-gift-card':
      return (
        <PromoGiftCardVisual
          couponCode={visual.couponCode}
          couponSub={visual.couponSub}
          giftCardAmount={visual.giftCardAmount}
          giftCardLabel={visual.giftCardLabel}
          reducedMotion={reducedMotion}
        />
      );
    default:
      return null;
  }
};

const ProfitMarginsVisual: React.FC<{
  bars: Extract<CardVisualConfig, { type: 'profit-chart' }>['bars'];
  reducedMotion: boolean;
}> = ({ bars, reducedMotion }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.35 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      ref={chartRef}
      className="w-full sm:w-[340px] md:w-[390px] rounded-[20px] bg-[#F5F8F6] border border-[#0F3D24]/[0.07] p-4 flex flex-col justify-between select-none"
      aria-label="Product profit margin bar chart"
    >
      {/* Top mini header inside the chart stage */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-[#55695E] tracking-[-0.01em]">
          Margin by category
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E3F3E8] text-[#0F3D24] text-[10.5px] font-bold tabular-nums">
          <TrendingUp className="w-3 h-3 text-[#1D7A3E]" aria-hidden="true" />
          Avg +21.6%
        </span>
      </div>

      {/* Bars + subtle dashed grid lines */}
      <div className="relative flex items-end justify-between gap-2.5 h-[132px] pt-5 px-1">
        {/* Background horizontal dashed reference lines */}
        <div
          aria-hidden="true"
          className="absolute inset-x-1 top-6 bottom-6 flex flex-col justify-between pointer-events-none"
        >
          <div className="w-full border-b border-dashed border-[#0F3D24]/[0.08]" />
          <div className="w-full border-b border-dashed border-[#0F3D24]/[0.08]" />
          <div className="w-full border-b border-dashed border-[#0F3D24]/[0.08]" />
        </div>

        {bars.map((bar, idx) => {
          const isHighlight = Boolean(bar.isHighlight);
          const isHovered = hoveredId === bar.id;
          return (
            <div
              key={bar.id}
              onMouseEnter={() => setHoveredId(bar.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative z-10 flex-1 h-full flex flex-col items-center justify-end group/bar cursor-pointer"
            >
              <span
                className={`text-[10.5px] font-bold tabular-nums mb-1.5 px-1.5 py-0.5 rounded-full leading-none transition-all duration-150 ${
                  isHighlight
                    ? 'bg-[#FEF3DC] text-[#9A5B06] border border-[#F2A93B]/40 opacity-100 shadow-2xs'
                    : isHovered
                    ? 'bg-[#E3F3E8] text-[#0F3D24] opacity-100'
                    : 'text-[#55695E] opacity-0 group-hover/bar:opacity-100'
                }`}
              >
                {bar.marginText}
              </span>
              <div className="w-full h-[86px] flex items-end">
                <motion.div
                  initial={reducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
                  animate={
                    reducedMotion || isInView ? { scaleY: 1 } : { scaleY: 0 }
                  }
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.65,
                          delay: 0.1 + idx * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  style={{
                    height: `${bar.heightPercent}%`,
                    transformOrigin: 'bottom',
                  }}
                  className={`w-full rounded-t-[8px] transition-colors duration-150 ${
                    isHighlight
                      ? 'bg-[#F2A93B] group-hover/bar:bg-[#e59b2c] shadow-[0_4px_12px_rgba(242,169,59,0.3)]'
                      : 'bg-[#1D7A3E] group-hover/bar:bg-[#166030]'
                  }`}
                />
              </div>
              <span
                className={`mt-1.5 text-[10px] font-semibold tracking-[-0.01em] truncate max-w-full ${
                  isHighlight ? 'text-[#111111] font-bold' : 'text-[#666666]'
                }`}
              >
                {bar.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BarcodeGeneratorVisual: React.FC<{
  defaultCode: string;
  buttonLabel: string;
  reducedMotion: boolean;
}> = ({ defaultCode, buttonLabel, reducedMotion }) => {
  const [printed, setPrinted] = useState(false);
  const [skuSuffix, setSkuSuffix] = useState(0);

  const handlePrint = () => {
    setPrinted(true);
    setSkuSuffix((prev) => (prev + 1) % 9);
    window.setTimeout(() => {
      setPrinted(false);
    }, 1600);
  };

  const barPattern = [
    2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1, 2, 1, 3, 1, 1, 2, 1, 2,
  ];

  let currentX = 4;
  const bars: Array<{ x: number; width: number }> = [];
  barPattern.forEach((widthUnit, index) => {
    const w = widthUnit * 2.05;
    if (index % 2 === 0) {
      bars.push({ x: currentX, width: w });
    }
    currentX += w + (index % 3 === 0 ? 2.0 : 1.4);
  });

  const displayedCode =
    skuSuffix === 0
      ? defaultCode
      : `${defaultCode.slice(0, -1)}${(Number(defaultCode.slice(-1)) + skuSuffix) % 10}`;

  return (
    <div className="w-full my-1">
      {/* Recessed stage holding a tactile thermal sticker card */}
      <div className="rounded-[18px] p-2.5 bg-[#F4F7F5] border border-[#0F3D24]/[0.07]">
        <div className="rounded-[13px] bg-white border border-[#0F3D24]/[0.08] shadow-[0_2px_10px_rgba(15,61,36,0.05)] px-3.5 py-2.5 flex flex-col gap-2">
          {/* Sticker top metadata line */}
          <div className="flex items-center justify-between border-b border-dashed border-[#0F3D24]/12 pb-1.5">
            <span className="text-[10.5px] font-bold tracking-[0.02em] uppercase text-[#55695E]">
              Organic Honey 500g
            </span>
            <span className="text-[11px] font-extrabold text-[#0F3D24] tabular-nums">
              MRP ₹240
            </span>
          </div>

          {/* Barcode + Print CTA */}
          <div className="flex items-center justify-between gap-2.5 pt-0.5">
            <svg
              width="142"
              height="38"
              viewBox="0 0 142 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label={`Generated barcode ${displayedCode}`}
              className="text-[#111111] shrink-0"
            >
              {bars.map((bar, idx) => (
                <rect
                  key={idx}
                  x={bar.x}
                  y={1}
                  width={bar.width}
                  height={24}
                  rx={0.75}
                  fill="currentColor"
                />
              ))}
              <text
                x="71"
                y="35"
                textAnchor="middle"
                fill="#444444"
                fontSize="8.5"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                fontWeight="700"
                letterSpacing="2.0"
              >
                {displayedCode}
              </text>
            </svg>

            <button
              type="button"
              onClick={handlePrint}
              className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold tracking-[-0.01em] text-white bg-[#1D7A3E] hover:bg-[#166131] active:scale-[0.98] shadow-[0_2px_8px_rgba(29,122,62,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D7A3E] cursor-pointer whitespace-nowrap shrink-0 ${
                reducedMotion ? '' : 'transition-all duration-150'
              }`}
            >
              {printed ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                  <span>Printed</span>
                </>
              ) : (
                <>
                  <Printer className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
                  <span>{buttonLabel}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LedgerListVisual: React.FC<{
  rows: Extract<CardVisualConfig, { type: 'ledger-list' }>['rows'];
}> = ({ rows }) => {
  const getRowIcon = (id: string) => {
    if (id === 'l1') {
      return (
        <span className="w-6 h-6 rounded-[8px] bg-[#E3F3E8] text-[#1D7A3E] flex items-center justify-center shrink-0">
          <Package className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
        </span>
      );
    }
    if (id === 'l2') {
      return (
        <span className="w-6 h-6 rounded-[8px] bg-[#FEF3DC] text-[#B87314] flex items-center justify-center shrink-0">
          <Store className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
        </span>
      );
    }
    return (
      <span className="w-6 h-6 rounded-[8px] bg-[#E3F3E8] text-[#1D7A3E] flex items-center justify-center shrink-0">
        <Zap className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
      </span>
    );
  };

  return (
    <div
      className="w-full my-1 flex flex-col gap-1.5"
      role="list"
      aria-label="Sample expense ledger"
    >
      {rows.map((row) => (
        <div
          key={row.id}
          role="listitem"
          className="flex items-center justify-between px-2.5 py-1.5 rounded-[12px] text-[12.5px] bg-[#F5F8F6] border border-[#0F3D24]/[0.07] text-[#111111]"
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            {getRowIcon(row.id)}
            <span className="font-semibold truncate">{row.label}</span>
          </div>
          <span className="font-bold tabular-nums whitespace-nowrap shrink-0 text-[#0F3D24]">
            {row.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

const REPORT_SUMMARY_BY_TAB: Record<
  'Shift' | 'Sales' | 'P&L' | 'Stock',
  { value: string; delta: string }
> = {
  Shift: { value: '₹18,450', delta: '+12.4%' },
  Sales: { value: '₹48,920', delta: '+18.6%' },
  'P&L': { value: '₹14,280', delta: '+24.1%' },
  Stock: { value: '1,240 SKUs', delta: '98% in stock' },
};

const ReportsSparklineVisual: React.FC<{
  tabs: Extract<CardVisualConfig, { type: 'reports-sparkline' }>['tabs'];
  defaultTab: 'Shift' | 'Sales' | 'P&L' | 'Stock';
  reducedMotion: boolean;
}> = ({ tabs, defaultTab, reducedMotion }) => {
  const [activeTabId, setActiveTabId] = useState<'Shift' | 'Sales' | 'P&L' | 'Stock'>(
    defaultTab
  );

  const activeMetric = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const summary = REPORT_SUMMARY_BY_TAB[activeTabId];

  return (
    <div className="w-full my-1 flex flex-col gap-2">
      <div
        role="group"
        aria-label="Report type preview"
        className="flex items-center gap-1.5 flex-wrap"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTabId(tab.id)}
              aria-pressed={isActive}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold leading-none cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D7A3E] ${
                reducedMotion ? '' : 'transition-colors duration-150'
              } ${
                isActive
                  ? 'bg-[#1D7A3E] text-white shadow-xs'
                  : 'bg-[#F4F7F5] text-[#666666] hover:text-[#111111] hover:bg-[#E7EFEA]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Full-width sparkline card with live metric header */}
      <div className="w-full rounded-[14px] px-3 py-2 bg-[#F5F8F6] border border-[#0F3D24]/[0.07] flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-extrabold text-[#111111] tabular-nums tracking-[-0.02em]">
            {summary.value}
          </span>
          <span className="text-[10.5px] font-bold text-[#1D7A3E] bg-[#E3F3E8] px-2 py-0.5 rounded-full tabular-nums">
            {summary.delta}
          </span>
        </div>
        <svg
          viewBox="0 0 260 36"
          className="w-full h-[36px] overflow-visible"
          role="img"
          aria-label={`${activeMetric.label} report trend sparkline`}
        >
          <defs>
            <linearGradient id={`spark-grad-${activeMetric.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1D7A3E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1D7A3E" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d={activeMetric.areaPath}
            fill={`url(#spark-grad-${activeMetric.id})`}
          />
          <motion.path
            key={activeMetric.id}
            d={activeMetric.sparklinePoints}
            fill="none"
            stroke="#1D7A3E"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
            }
          />
          <circle
            cx={activeMetric.endPoint.x}
            cy={activeMetric.endPoint.y}
            r="3.5"
            fill="#F2A93B"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
};

/**
 * Cafes & Restaurants Card 3 Visual:
 * Mini floor plan of 6 rounded table tiles in a 3x2 grid:
 * free (light green), occupied (solid green, white text), one reserved (yellow) labeled "8:00 PM".
 */
const TablesFloorPlanVisual: React.FC<{
  initialTables: FloorTableTile[];
  reducedMotion: boolean;
}> = ({ initialTables, reducedMotion }) => {
  const [tables, setTables] = useState<FloorTableTile[]>(initialTables);

  const handleCycleTable = (id: string) => {
    setTables((prev) =>
      prev.map((tile) => {
        if (tile.id !== id) return tile;
        if (tile.status === 'free') {
          return { ...tile, status: 'occupied', subLabel: 'Occupied' };
        }
        if (tile.status === 'occupied') {
          return { ...tile, status: 'reserved', subLabel: '8:00 PM' };
        }
        return { ...tile, status: 'free', subLabel: 'Free' };
      })
    );
  };

  return (
    <div
      role="group"
      aria-label="Restaurant floor plan tables"
      className="grid grid-cols-3 gap-2 w-full my-1"
    >
      {tables.map((tile) => {
        const styleClasses =
          tile.status === 'occupied'
            ? 'bg-[#1D7A3E] text-white border-[#1D7A3E] shadow-[0_2px_8px_rgba(29,122,62,0.2)]'
            : tile.status === 'reserved'
            ? 'bg-[#F2A93B] text-[#3D2400] border-[#E59A28] shadow-[0_2px_8px_rgba(242,169,59,0.22)]'
            : 'bg-[#E3F3E8] text-[#0F3D24] border-[#C9E7D3]';

        return (
          <button
            key={tile.id}
            type="button"
            onClick={() => handleCycleTable(tile.id)}
            aria-label={`Table ${tile.tableName}, status ${tile.subLabel}`}
            className={`rounded-[12px] border px-2.5 py-2 flex flex-col items-start justify-between cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D7A3E] ${
              reducedMotion ? '' : 'transition-all duration-150 hover:scale-[1.02]'
            } ${styleClasses}`}
          >
            <span className="text-[11px] font-bold tracking-[-0.01em] leading-none">
              {tile.tableName}
            </span>
            <span
              className={`text-[10px] font-semibold mt-1.5 leading-none tabular-nums whitespace-nowrap ${
                tile.status === 'occupied'
                  ? 'text-white/90'
                  : tile.status === 'reserved'
                  ? 'text-[#3D2400]'
                  : 'text-[#0F3D24]/80'
              }`}
            >
              {tile.subLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
};

/**
 * Cafes & Restaurants Card 5 Visual:
 * Compact notification card "New order · ₹384 · 7 items" with a green "Accept" button that gently pulses.
 */
const OnlineOrderNotificationVisual: React.FC<{
  orderText: string;
  buttonLabel: string;
  reducedMotion: boolean;
}> = ({ orderText, buttonLabel, reducedMotion }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    window.setTimeout(() => {
      setAccepted(false);
    }, 2000);
  };

  return (
    <div className="w-full my-1">
      <div className="w-full rounded-[16px] bg-[#F5F8F6] border border-[#0F3D24]/[0.08] p-2.5">
        <div className="rounded-[12px] bg-white border border-[#0F3D24]/[0.07] shadow-[0_2px_10px_rgba(15,61,36,0.05)] px-3 py-2.5 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-7 h-7 rounded-[9px] bg-[#E3F3E8] text-[#1D7A3E] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#1D7A3E]">
                Direct Web Order
              </span>
              <span className="text-[12px] font-bold text-[#111111] tabular-nums truncate mt-0.5">
                {orderText}
              </span>
            </div>
          </div>

          <div className="relative shrink-0">
            <motion.button
              type="button"
              onClick={handleAccept}
              animate={
                reducedMotion || accepted
                  ? { scale: 1, boxShadow: '0 0 0 0px rgba(29, 122, 62, 0)' }
                  : {
                      scale: [1, 1.04, 1],
                      boxShadow: [
                        '0 0 0 0px rgba(29, 122, 62, 0.35)',
                        '0 0 0 6px rgba(29, 122, 62, 0)',
                        '0 0 0 0px rgba(29, 122, 62, 0)',
                      ],
                    }
              }
              transition={
                reducedMotion || accepted
                  ? { duration: 0.15 }
                  : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              }
              className="relative z-10 inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold text-white bg-[#1D7A3E] hover:bg-[#166131] active:scale-[0.98] cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D7A3E]"
            >
              {accepted ? (
                <>
                  <Check className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
                  <span>Accepted</span>
                </>
              ) : (
                <span>{buttonLabel}</span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Cafes & Restaurants Card 6 Visual:
 * 3 ranked horizontal bars (Cold Coffee, Chicken Burger, Masala Chai) in green with the top one in yellow,
 * bars animating in from zero when scrolled into view.
 */
const BestsellersBarsVisual: React.FC<{
  items: Extract<CardVisualConfig, { type: 'bestsellers-bars' }>['items'];
  reducedMotion: boolean;
}> = ({ items, reducedMotion }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div
      ref={ref}
      className="w-full my-1 rounded-[15px] bg-[#F5F8F6] border border-[#0F3D24]/[0.07] px-3 py-2.5 flex flex-col gap-2"
      aria-label="Ranked best-sellers horizontal bar chart"
    >
      {items.map((item, idx) => {
        const isTop = Boolean(item.isTop);
        return (
          <div key={item.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11.5px] leading-none">
              <span className="font-semibold text-[#111111]">{item.label}</span>
              <span
                className={`font-bold tabular-nums ${
                  isTop ? 'text-[#B87314]' : 'text-[#1D7A3E]'
                }`}
              >
                {item.marginLabel}
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white border border-[#0F3D24]/[0.05] overflow-hidden">
              <motion.div
                initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                animate={reducedMotion || isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.65,
                        delay: 0.1 + idx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                style={{
                  width: `${item.widthPercent}%`,
                  transformOrigin: 'left',
                }}
                className={`h-full rounded-full ${
                  isTop ? 'bg-[#F2A93B]' : 'bg-[#1D7A3E]'
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Cafes & Restaurants Card 7 Visual:
 * Ticket-style coupon with dashed edge reading "WELCOME15", overlapped by a small green gift card "₹500".
 */
const PromoGiftCardVisual: React.FC<{
  couponCode: string;
  couponSub: string;
  giftCardAmount: string;
  giftCardLabel: string;
  reducedMotion: boolean;
}> = ({ couponCode, couponSub, giftCardAmount, giftCardLabel, reducedMotion }) => {
  const [copied, setCopied] = useState(false);

  const handleToggleCopy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full my-1 rounded-[16px] bg-[#F5F8F6] border border-[#0F3D24]/[0.07] py-2 px-3 flex items-center justify-center select-none">
      <button
        type="button"
        onClick={handleToggleCopy}
        aria-label={`Promo code ${couponCode} and ${giftCardAmount} gift card`}
        className="relative flex items-center justify-center w-full max-w-[250px] h-[68px] cursor-pointer group/promo text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D7A3E] rounded-[14px]"
      >
        {/* Ticket-style coupon with dashed border on the left */}
        <div
          className={`relative z-10 flex items-center justify-between bg-[#FEF3DC] border-2 border-dashed border-[#E2A53F] rounded-[14px] px-3.5 py-2 w-[172px] shadow-xs ${
            reducedMotion ? '' : 'transition-transform duration-200 group-hover/promo:-translate-x-0.5'
          }`}
        >
          {/* Left ticket punch notch */}
          <span
            aria-hidden="true"
            className="w-2.5 h-2.5 rounded-full bg-[#F5F8F6] absolute -left-1.5 top-1/2 -translate-y-1/2 border-r border-[#E2A53F]"
          />
          <div className="flex flex-col pl-1">
            <span className="text-[9.5px] font-bold tracking-[0.08em] uppercase text-[#8A560A]">
              {copied ? 'APPLIED' : couponSub}
            </span>
            <span className="text-[14px] font-extrabold tracking-[0.04em] text-[#3D2400] tabular-nums mt-0.5">
              {couponCode}
            </span>
          </div>
        </div>

        {/* Overlapping small green gift card "₹500" on the right */}
        <div
          className={`relative z-20 -ml-5 mt-2.5 rounded-[13px] bg-gradient-to-br from-[#1D7A3E] to-[#0F3D24] text-white px-3.5 py-2 w-[102px] shadow-[0_8px_18px_-4px_rgba(15,61,36,0.35)] border border-white/20 flex flex-col justify-between ${
            reducedMotion
              ? ''
              : 'transition-transform duration-200 -rotate-3 group-hover/promo:rotate-0 group-hover/promo:translate-x-0.5'
          }`}
        >
          <span className="text-[8.5px] font-bold tracking-[0.08em] uppercase text-white/75">
            {giftCardLabel}
          </span>
          <span className="text-[16px] font-extrabold tracking-[-0.02em] text-white tabular-nums mt-0.5">
            {giftCardAmount}
          </span>
        </div>
      </button>
    </div>
  );
};

