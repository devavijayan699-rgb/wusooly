"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./CardVisuals.module.css";

/* ── Pure Inline SVG Icons (Zero Extra Dependencies) ── */
function TrendingUpIcon({ className = "" }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PrinterIcon({ className = "" }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function PackageIcon({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function StoreIcon({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2" />
    </svg>
  );
}

function ZapIcon({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ShoppingBagIcon({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

/* ── Indian Number Formatter ── */
export function formatIndianNumber(val) {
  const clamped = Math.max(0, Math.round(val));
  return clamped.toLocaleString("en-IN");
}

/* ── Photo Glass Chip Component ── */
export function PhotoGlassChip({ chip }) {
  const [displayValue, setDisplayValue] = useState(chip.targetAmount || 0);
  const [activeSegmentIdx, setActiveSegmentIdx] = useState(0);

  // Counter animation
  useEffect(() => {
    if (chip.type !== "counter") return;
    let startTimestamp = null;
    const duration = 1200;
    const target = chip.targetAmount;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [chip]);

  // Segmented cycle timer (3s)
  useEffect(() => {
    if (chip.type !== "segmented-cycle") return;
    const timer = setInterval(() => {
      setActiveSegmentIdx((prev) => (prev + 1) % chip.options.length);
    }, chip.intervalMs || 3000);
    return () => clearInterval(timer);
  }, [chip]);

  if (chip.type === "status") {
    return (
      <div className={styles.glassChip}>
        <span className={styles.pulseDotWrapper} aria-hidden="true">
          <span className={styles.pulseDotPing} />
          <span className={styles.pulseDot} />
        </span>
        <span>{chip.text}</span>
      </div>
    );
  }

  if (chip.type === "plain") {
    return (
      <div className={styles.glassChip}>
        <span>{chip.text}</span>
      </div>
    );
  }

  if (chip.type === "segmented-cycle") {
    return (
      <div className={styles.segmentedCycle} role="group" aria-label="Order modes">
        {chip.options.map((option, idx) => {
          const isActive = idx === activeSegmentIdx;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setActiveSegmentIdx(idx)}
              className={`${styles.cycleButton} ${isActive ? styles.cycleButtonActive : ""}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.glassChip}>
      <span>{chip.prefix}</span>
      <strong style={{ fontWeight: 800, color: "#fff" }}>
        {chip.currencySymbol}
        {formatIndianNumber(displayValue)}
      </strong>
    </div>
  );
}

/* ── Interactive Card Visuals ── */
export function CardVisual({ visual }) {
  if (!visual) return null;

  switch (visual.type) {
    case "profit-chart":
      return <ProfitMarginsVisual bars={visual.bars} />;
    case "barcode-generator":
      return <BarcodeGeneratorVisual defaultCode={visual.defaultCode} buttonLabel={visual.buttonLabel} />;
    case "ledger-list":
      return <LedgerListVisual rows={visual.rows} />;
    case "reports-sparkline":
      return <ReportsSparklineVisual tabs={visual.tabs} defaultTab={visual.defaultTab} />;
    case "tables-floor-plan":
      return <TablesFloorPlanVisual initialTables={visual.tables} />;
    case "online-order-notification":
      return <OnlineOrderNotificationVisual orderText={visual.orderText} buttonLabel={visual.buttonLabel} />;
    case "bestsellers-bars":
      return <BestsellersBarsVisual items={visual.items} />;
    case "promo-gift-card":
      return (
        <PromoGiftCardVisual
          couponCode={visual.couponCode}
          couponSub={visual.couponSub}
          giftCardAmount={visual.giftCardAmount}
          giftCardLabel={visual.giftCardLabel}
        />
      );
    default:
      return null;
  }
}

/* ── 1. Profit Margins Bar Chart ── */
function ProfitMarginsVisual({ bars }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className={styles.chartStage} aria-label="Product profit margin chart">
      <div className={styles.chartHeader}>
        <span className={styles.chartHeaderTitle}>Margin by category</span>
        <span className={styles.chartHeaderBadge}>
          <TrendingUpIcon />
          Avg +21.6%
        </span>
      </div>

      <div className={styles.chartBarsArea}>
        <div className={styles.chartGridLines} aria-hidden="true">
          <div className={styles.chartGridLine} />
          <div className={styles.chartGridLine} />
          <div className={styles.chartGridLine} />
        </div>

        {bars.map((bar) => {
          const isHighlight = Boolean(bar.isHighlight);
          const isHovered = hoveredId === bar.id;
          return (
            <div
              key={bar.id}
              className={styles.barCol}
              onMouseEnter={() => setHoveredId(bar.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span
                className={`${styles.barTag} ${
                  isHighlight
                    ? styles.barTagHighlight
                    : isHovered
                    ? styles.barTagNormal
                    : styles.barTagNormal
                }`}
                style={isHovered && !isHighlight ? { opacity: 1 } : {}}
              >
                {bar.marginText}
              </span>

              <div className={styles.barTrack}>
                <div
                  className={`${styles.barFill} ${
                    isHighlight ? styles.barFillHighlight : styles.barFillNormal
                  }`}
                  style={{ height: `${bar.heightPercent}%` }}
                />
              </div>

              <span
                className={`${styles.barLabel} ${
                  isHighlight ? styles.barLabelHighlight : ""
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
}

/* ── 2. Barcode Generator ── */
function BarcodeGeneratorVisual({ defaultCode, buttonLabel }) {
  const [printed, setPrinted] = useState(false);
  const [skuSuffix, setSkuSuffix] = useState(0);

  const handlePrint = () => {
    setPrinted(true);
    setSkuSuffix((prev) => (prev + 1) % 9);
    setTimeout(() => setPrinted(false), 1600);
  };

  const barPattern = [
    2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1, 2, 1, 3, 1, 1, 2, 1, 2,
  ];

  let currentX = 4;
  const bars = [];
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
    <div className={styles.barcodeStage}>
      <div className={styles.thermalCard}>
        <div className={styles.thermalHeader}>
          <span className={styles.thermalTitle}>Organic Honey 500g</span>
          <span className={styles.thermalPrice}>MRP ₹240</span>
        </div>

        <div className={styles.thermalBody}>
          <svg
            width="142"
            height="36"
            viewBox="0 0 142 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={`Generated barcode ${displayedCode}`}
          >
            {bars.map((bar, idx) => (
              <rect
                key={idx}
                x={bar.x}
                y={1}
                width={bar.width}
                height={22}
                rx={0.75}
                fill="#0c291e"
              />
            ))}
            <text
              x="71"
              y="33"
              textAnchor="middle"
              fill="#55665d"
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="700"
              letterSpacing="2.0"
            >
              {displayedCode}
            </text>
          </svg>

          <button
            type="button"
            onClick={handlePrint}
            className={`${styles.printBtn} ${printed ? styles.printBtnPrinted : ""}`}
          >
            {printed ? (
              <>
                <CheckIcon />
                <span>Printed</span>
              </>
            ) : (
              <>
                <PrinterIcon />
                <span>{buttonLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 3. Ledger List Visual ── */
function LedgerListVisual({ rows }) {
  const getIcon = (id) => {
    if (id === "l1") {
      return (
        <span className={`${styles.ledgerIconWrap} ${styles.ledgerIconGreen}`}>
          <PackageIcon />
        </span>
      );
    }
    if (id === "l2") {
      return (
        <span className={`${styles.ledgerIconWrap} ${styles.ledgerIconAmber}`}>
          <StoreIcon />
        </span>
      );
    }
    return (
      <span className={`${styles.ledgerIconWrap} ${styles.ledgerIconGreen}`}>
        <ZapIcon />
      </span>
    );
  };

  return (
    <div className={styles.ledgerList} role="list">
      {rows.map((row) => (
        <div key={row.id} className={styles.ledgerRow} role="listitem">
          <div className={styles.ledgerLeft}>
            {getIcon(row.id)}
            <span className={styles.ledgerLabel}>{row.label}</span>
          </div>
          <span className={styles.ledgerAmount}>{row.amount}</span>
        </div>
      ))}
    </div>
  );
}

/* ── 4. Reports Sparkline Visual ── */
const REPORT_DATA = {
  Shift: { value: "₹18,450", delta: "+12.4%" },
  Sales: { value: "₹48,920", delta: "+18.6%" },
  "P&L": { value: "₹14,280", delta: "+24.1%" },
  Stock: { value: "1,240 SKUs", delta: "98% in stock" },
};

function ReportsSparklineVisual({ tabs, defaultTab = "Sales" }) {
  const [activeTabId, setActiveTabId] = useState(defaultTab);
  const activeMetric = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const summary = REPORT_DATA[activeTabId] || REPORT_DATA.Sales;

  return (
    <div className={styles.reportsVisual}>
      <div className={styles.reportsTabGroup} role="group" aria-label="Report types">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTabId(tab.id)}
              className={`${styles.reportsTabBtn} ${isActive ? styles.reportsTabBtnActive : ""}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={styles.sparklineCard}>
        <div className={styles.sparklineHeader}>
          <span className={styles.sparklineVal}>{summary.value}</span>
          <span className={styles.sparklineDelta}>{summary.delta}</span>
        </div>

        <svg viewBox="0 0 260 36" style={{ width: "100%", height: 36, overflow: "visible" }}>
          <defs>
            <linearGradient id={`grad-${activeMetric.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={activeMetric.areaPath} fill={`url(#grad-${activeMetric.id})`} />
          <path
            d={activeMetric.sparklinePoints}
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={activeMetric.endPoint.x}
            cy={activeMetric.endPoint.y}
            r="3.5"
            fill="#a3e635"
            stroke="#0c291e"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── 5. Tables & Reservations Floor Plan ── */
function TablesFloorPlanVisual({ initialTables }) {
  const [tables, setTables] = useState(initialTables);

  const handleCycle = (id) => {
    setTables((prev) =>
      prev.map((tile) => {
        if (tile.id !== id) return tile;
        if (tile.status === "free") return { ...tile, status: "occupied", subLabel: "Occupied" };
        if (tile.status === "occupied") return { ...tile, status: "reserved", subLabel: "8:00 PM" };
        return { ...tile, status: "free", subLabel: "Free" };
      })
    );
  };

  return (
    <div className={styles.floorPlanGrid} role="group" aria-label="Floor plan tables">
      {tables.map((tile) => {
        const cls =
          tile.status === "occupied"
            ? styles.tableOccupied
            : tile.status === "reserved"
            ? styles.tableReserved
            : styles.tableFree;

        return (
          <button
            key={tile.id}
            type="button"
            onClick={() => handleCycle(tile.id)}
            className={`${styles.tableTile} ${cls}`}
          >
            <span className={styles.tableName}>{tile.tableName}</span>
            <span className={styles.tableStatusLabel}>{tile.subLabel}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── 6. Online Order Notification ── */
function OnlineOrderNotificationVisual({ orderText, buttonLabel }) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => setAccepted(false), 2000);
  };

  return (
    <div className={styles.onlineOrderCard}>
      <div className={styles.onlineOrderInner}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 9,
              backgroundColor: "rgba(163, 230, 53, 0.2)",
              color: "#0c291e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ShoppingBagIcon />
          </span>
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span className={styles.onlineOrderTag}>Direct Web Order</span>
            <span className={styles.onlineOrderSub}>{orderText}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAccept}
          className={`${styles.acceptBtn} ${accepted ? styles.acceptBtnAccepted : ""}`}
        >
          {accepted ? (
            <>
              <CheckIcon />
              <span>Accepted</span>
            </>
          ) : (
            <span>{buttonLabel}</span>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── 7. Best-sellers & Margins Bars ── */
function BestsellersBarsVisual({ items }) {
  return (
    <div className={styles.bestsellersCard} aria-label="Best-sellers ranking">
      {items.map((item) => {
        const isTop = Boolean(item.isTop);
        return (
          <div key={item.id} className={styles.bestsellerRow}>
            <div className={styles.bestsellerMeta}>
              <span className={styles.bestsellerName}>{item.label}</span>
              <span className={isTop ? styles.bestsellerMarginTop : styles.bestsellerMarginNormal}>
                {item.marginLabel}
              </span>
            </div>
            <div className={styles.bestsellerTrack}>
              <div
                className={isTop ? styles.bestsellerFillTop : styles.bestsellerFillNormal}
                style={{ width: `${item.widthPercent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── 8. Promo Codes & Gift Cards ── */
function PromoGiftCardVisual({ couponCode, couponSub, giftCardAmount, giftCardLabel }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.promoStage}>
      <button
        type="button"
        onClick={handleCopy}
        className={styles.promoButton}
        aria-label={`Promo code ${couponCode} and ${giftCardAmount} gift card`}
      >
        <div className={styles.couponTicket}>
          <span className={styles.ticketNotch} aria-hidden="true" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles.couponSub}>{copied ? "APPLIED ✓" : couponSub}</span>
            <span className={styles.couponCode}>{couponCode}</span>
          </div>
        </div>

        <div className={styles.giftCard3D}>
          <span className={styles.giftCardLabel}>{giftCardLabel}</span>
          <span className={styles.giftCardAmount}>{giftCardAmount}</span>
        </div>
      </button>
    </div>
  );
}

