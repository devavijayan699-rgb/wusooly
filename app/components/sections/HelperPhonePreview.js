"use client";

import { useState } from "react";
import { Wifi, BatteryFull, CheckCircle2, PhoneCall, Bell, ShieldCheck } from "lucide-react";
import styles from "./HelperPhonePreview.module.css";

export default function HelperPhonePreview() {
  const [masterEnabled, setMasterEnabled] = useState(true);
  const [forwardCalls, setForwardCalls] = useState(true);
  const [includeContacts, setIncludeContacts] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  return (
    <div className={styles.deviceWrap}>
      <div className={styles.deviceFrame} aria-label="Wusooly Helper Android app preview">
        {/* Punch-hole camera */}
        <div className={styles.speakerBar} aria-hidden="true">
          <span className={styles.cameraDot} />
        </div>

        <div className={styles.screen}>
          {/* Status bar */}
          <div className={styles.statusBar} aria-hidden="true">
            <span className={styles.time}>9:41</span>
            <div className={styles.statusIcons}>
              <Wifi size={11} strokeWidth={2.4} />
              <BatteryFull size={13} strokeWidth={2.2} />
            </div>
          </div>

          {/* App header */}
          <div className={styles.appHeader}>
            <div className={styles.appBrand}>
              <img
                src="/brand/wusooly-logo-dark.png"
                alt="Wusooly"
                className={styles.brandLogo}
              />
              <span className={styles.helperTag}>Helper</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={masterEnabled}
              aria-label="Toggle Wusooly Helper service"
              className={`${styles.switch} ${masterEnabled ? styles.switchOn : ""}`}
              onClick={() => setMasterEnabled((v) => !v)}
            >
              <span className={styles.switchThumb} />
            </button>
          </div>

          {/* Connection status card */}
          <div className={styles.statusCard}>
            <div className={styles.statusPill}>
              <span
                className={`${styles.liveDot} ${masterEnabled ? styles.liveDotActive : styles.liveDotPaused}`}
              />
              <span>{masterEnabled ? "Live Bridge" : "Paused"}</span>
            </div>

            <div className={styles.statusTitle}>
              {masterEnabled ? "Your POS is connected" : "Connection paused"}
            </div>
            <p className={styles.statusSub}>
              {masterEnabled
                ? "Shop phone alerts stream directly to Main Counter."
                : "Enable service to resume forwarding to the POS."}
            </p>

            <div className={styles.statusRows}>
              <div className={styles.statusRow}>
                <span className={styles.rowLabel}>
                  <CheckCircle2 size={12} strokeWidth={2.2} />
                  Paired POS
                </span>
                <span className={styles.rowValue}>Counter #1</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.rowLabel}>
                  <PhoneCall size={12} strokeWidth={2.2} />
                  Caller ID access
                </span>
                <span className={styles.rowValueOk}>Allowed</span>
              </div>
              <div className={styles.statusRow}>
                <span className={styles.rowLabel}>
                  <Bell size={12} strokeWidth={2.2} />
                  Notification service
                </span>
                <span className={styles.rowValueOk}>Enabled</span>
              </div>
            </div>

            <div className={styles.managePill}>Manage connection</div>
          </div>

          {/* Interactive toggle groups */}
          <div className={styles.groupBlock}>
            <div className={styles.groupHeading}>CALLS</div>
            <div className={styles.settingCard}>
              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingTitle}>Forward incoming calls</span>
                  <span className={styles.settingDesc}>Show caller popup on POS screen</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={forwardCalls && masterEnabled}
                  aria-label="Toggle forward incoming calls"
                  className={`${styles.switch} ${styles.switchSm} ${
                    forwardCalls && masterEnabled ? styles.switchOn : ""
                  }`}
                  onClick={() => setForwardCalls((v) => !v)}
                >
                  <span className={styles.switchThumb} />
                </button>
              </div>

              <div className={styles.settingDivider} />

              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingTitle}>Include saved contacts</span>
                  <span className={styles.settingDesc}>Match stored shop contact names</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={includeContacts && masterEnabled}
                  aria-label="Toggle include saved contacts"
                  className={`${styles.switch} ${styles.switchSm} ${
                    includeContacts && masterEnabled ? styles.switchOn : ""
                  }`}
                  onClick={() => setIncludeContacts((v) => !v)}
                >
                  <span className={styles.switchThumb} />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.groupBlock}>
            <div className={styles.groupHeading}>WHATSAPP</div>
            <div className={styles.settingCard}>
              <div className={styles.settingRow}>
                <div className={styles.settingInfo}>
                  <span className={styles.settingTitle}>WhatsApp Business</span>
                  <span className={styles.settingDesc}>Relay incoming order alerts</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={whatsappEnabled && masterEnabled}
                  aria-label="Toggle WhatsApp Business alerts"
                  className={`${styles.switch} ${styles.switchSm} ${
                    whatsappEnabled && masterEnabled ? styles.switchOn : ""
                  }`}
                  onClick={() => setWhatsappEnabled((v) => !v)}
                >
                  <span className={styles.switchThumb} />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.screenFooter}>
            <ShieldCheck size={11} strokeWidth={2.2} />
            <span>Encrypted LAN bridge</span>
          </div>
        </div>
      </div>
    </div>
  );
}
