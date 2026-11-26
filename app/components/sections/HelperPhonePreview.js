import { Signal, Wifi, BatteryFull, CheckCircle2, PhoneCall, Bell } from "lucide-react";
import styles from "./HelperPhonePreview.module.css";

function StaticSwitch({ small = false }) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.switch} ${small ? styles.switchSm : ""}`}
    >
      <span className={styles.switchThumb} />
    </span>
  );
}

export default function HelperPhonePreview() {
  return (
    <div className={styles.deviceStage} aria-label="Wusooly Helper Android app mockup">
      <div className={styles.floorShadow} aria-hidden="true" />

      <div className={styles.phoneRig} aria-hidden="true">
        <div className={styles.chassisOuter}>
          {/* Antenna split seams & Nothing Phone (4a) Pro hardware keys */}
          <span className={`${styles.antennaBand} ${styles.antennaTopLeft}`} />
          <span className={`${styles.antennaBand} ${styles.antennaTopRight}`} />
          <span className={`${styles.antennaBand} ${styles.antennaBottomLeft}`} />
          <span className={`${styles.antennaBand} ${styles.antennaBottomRight}`} />
          <span className={styles.essentialKey} />
          <span className={styles.volumeKey} />
          <span className={styles.powerKey} />

          <div className={styles.oledBezel}>
            {/* Micro speaker slit embedded along top bezel edge */}
            <div className={styles.speakerSlit} />

            <div className={styles.screen}>
              {/* Native Android Status Bar + Optical Punch-Hole Camera */}
              <div className={styles.statusBar}>
                <span className={styles.time}>10:42</span>
                <span className={styles.cameraLens}>
                  <span className={styles.cameraGlass}>
                    <span className={styles.cameraGlint} />
                  </span>
                </span>
                <div className={styles.statusIcons}>
                  <Signal size={10} strokeWidth={2.4} />
                  <Wifi size={10} strokeWidth={2.4} />
                  <span className={styles.batteryCluster}>
                    <span className={styles.batteryPct}>94%</span>
                    <BatteryFull size={12.5} strokeWidth={2.2} />
                  </span>
                </div>
              </div>

              {/* App Header */}
              <div className={styles.appHeader}>
                <div className={styles.appBrand}>
                  <img
                    src="/brand/wusooly-logo-dark.png"
                    alt=""
                    className={styles.brandLogo}
                  />
                  <span className={styles.helperTag}>Helper</span>
                </div>
                <StaticSwitch />
              </div>

              {/* Connection Status Card */}
              <div className={styles.statusCard}>
                <div className={styles.statusPill}>
                  <span className={styles.liveDot} />
                  <span>Live Bridge</span>
                </div>

                <div className={styles.statusTitle}>Your POS is connected</div>
                <p className={styles.statusSub}>
                  Shop phone alerts stream directly to Main Counter.
                </p>

                <div className={styles.statusRows}>
                  <div className={styles.statusRow}>
                    <span className={styles.rowLabel}>
                      <CheckCircle2 size={11.5} strokeWidth={2.2} />
                      Paired POS
                    </span>
                    <span className={styles.rowValue}>Counter #1</span>
                  </div>
                  <div className={styles.statusRow}>
                    <span className={styles.rowLabel}>
                      <PhoneCall size={11.5} strokeWidth={2.2} />
                      Caller ID access
                    </span>
                    <span className={styles.rowValueOk}>Allowed</span>
                  </div>
                  <div className={styles.statusRow}>
                    <span className={styles.rowLabel}>
                      <Bell size={11.5} strokeWidth={2.2} />
                      Notification service
                    </span>
                    <span className={styles.rowValueOk}>Enabled</span>
                  </div>
                </div>

                <div className={styles.managePill}>Manage connection</div>
              </div>

              {/* Static Feature Groups */}
              <div className={styles.groupBlock}>
                <div className={styles.groupHeading}>CALLS</div>
                <div className={styles.settingCard}>
                  <div className={styles.settingRow}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingTitle}>Forward incoming calls</span>
                      <span className={styles.settingDesc}>Show caller popup on POS screen</span>
                    </div>
                    <StaticSwitch small />
                  </div>

                  <div className={styles.settingDivider} />

                  <div className={styles.settingRow}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingTitle}>Include saved contacts</span>
                      <span className={styles.settingDesc}>Match stored shop contact names</span>
                    </div>
                    <StaticSwitch small />
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
                    <StaticSwitch small />
                  </div>
                </div>
              </div>

              {/* Android System Navigation Gesture Bar */}
              <div className={styles.gestureBarWrap}>
                <span className={styles.gestureBar} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
