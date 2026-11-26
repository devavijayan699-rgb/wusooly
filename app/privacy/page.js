"use client";

import TransitionLink from "../components/layout/TransitionLink";
import LegalDocument, {
  LegalSection,
  LegalList,
  LegalCallout,
} from "../components/sections/LegalDocument";
import styles from "../components/sections/LegalDocument.module.css";
import { Shield } from "lucide-react";

const ACCOUNT_SECTIONS = [
  {
    title: "Account information",
    body: "When you sign in through ZIQX (our identity provider) we receive your name, email, and a stable user identifier. We do not see or store your ZIQX password.",
  },
  {
    title: "Business information",
    body: "Information you enter about your organisation, branches, staff, tax configuration, and sales activity. This is the data that powers your dashboard and your point-of-sale terminals.",
  },
  {
    title: "Device information",
    body: "When you use our mobile apps we collect a Firebase Cloud Messaging push token (so we can deliver notifications), basic device model and OS version, an app install identifier, and crash diagnostics if the app misbehaves.",
  },
  {
    title: "Usage information",
    body: "Anonymous, aggregated usage signals such as which screens you opened, which features you tapped, and approximate session duration. We use this to understand which features earn their keep and which need work.",
  },
  {
    title: "Companion transaction location",
    body: "With your device permission, Wusooly Companion captures precise location when you complete a bill, refund, or void. The record includes latitude, longitude, accuracy, and the time of capture. It is stored with the transaction and synchronized with your branch to record where the transaction took place. Location permission is required to complete these actions. Companion does not track your location in the background.",
  },
  {
    title: "Camera access for pairing",
    body: "Companion uses the camera, with your permission, to scan activation and desktop pairing QR codes. The scanned code is used to activate or connect the device.",
  },
];

const HOW_WE_USE = [
  "To authenticate you and keep your session secure.",
  "To run your business — display sales, manage staff, calculate tax, sync between your terminals and the dashboard.",
  "To keep the transaction location with Companion bills, refunds, and voids in your branch records.",
  "To deliver push notifications about events you opted into (orders, alerts, reminders).",
  "To diagnose crashes and bugs, so the next release is more stable than the last.",
  "To understand product usage in aggregate so we can prioritise the right work.",
  "To communicate with you about your account, billing, and material changes to the service.",
];

const YOUR_RIGHTS = [
  "The right to access a copy of your data.",
  "The right to correct data that is inaccurate.",
  "The right to delete your data.",
  "The right to export your data in a portable format.",
  "The right to object to or restrict certain processing.",
  "The right to withdraw consent where consent was the basis.",
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      badgeIcon={<Shield size={14} strokeWidth={2.4} aria-hidden="true" />}
      badgeText="Legal & Transparency"
      title="Privacy Policy"
      lead="We collect only what we need to run Wusooly, and we tell you exactly what we do with it. No surprises."
      lastUpdated="November 16, 2026"
      otherPolicyPrompt="Looking for our terms?"
      otherPolicyLabel="Terms of Service"
      otherPolicyHref="/terms"
      helpTitle="Have a question about privacy?"
      helpText="Our data protection team is always available to assist with data access requests, export inquiries, or compliance questions."
      helpEmail="privacy@wusooly.com"
      helpSecondaryLabel="Contact Support"
    >
      <LegalSection number={1} title="Who we are">
        <p className={styles.text}>
          &ldquo;Wusooly&rdquo; (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) provides a point-of-sale platform that includes a web dashboard for merchants and mobile applications for staff and managers. This policy describes how we handle personal information across all of those surfaces.
        </p>
        <p className={styles.text}>
          If you operate a business on Wusooly, you are the data controller for the customer information you collect through our products, and we act as your data processor for that information.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Information we collect">
        {ACCOUNT_SECTIONS.map(({ title, body }) => (
          <div key={title}>
            <h3 className={styles.subTitle}>{title}</h3>
            <p className={styles.text}>{body}</p>
          </div>
        ))}
      </LegalSection>

      <LegalSection number={3} title="Information we do not collect">
        <LegalCallout>
          We do not collect your contacts, photo library, or microphone recordings. We do not sell personal information. We do not use third-party advertising networks.
        </LegalCallout>
      </LegalSection>

      <LegalSection number={4} title="How we use your information">
        <LegalList items={HOW_WE_USE} />
      </LegalSection>

      <LegalSection number={5} title="Service providers we rely on">
        <p className={styles.text}>
          We use the following third parties to deliver Wusooly. Each is contractually bound to handle data only on our instructions and cannot use it for their own purposes.
        </p>
        <LegalList
          items={[
            <><strong>Google Firebase</strong> &mdash; push notifications (Cloud Messaging), crash reporting (Crashlytics), product analytics (Analytics), and remote configuration. Firebase processes the data described under &ldquo;Device information&rdquo; and &ldquo;Usage information&rdquo; above.</>,
            <><strong>ZIQX Identity</strong> &mdash; sign-in. ZIQX verifies your identity and returns a token to Wusooly; we never see your ZIQX credentials.</>,
            <><strong>Cloud hosting</strong> &mdash; to run our backend services and store your business data.</>,
          ]}
        />
      </LegalSection>

      <LegalSection number={6} title="Where data is stored">
        <p className={styles.text}>
          Your data is stored on managed cloud infrastructure with encryption in transit (HTTPS/TLS) and at rest. Authentication tokens on your device are stored in the platform&apos;s secure keychain (iOS Keychain / Android Keystore).
        </p>
      </LegalSection>

      <LegalSection number={7} title="How long we keep it">
        <p className={styles.text}>
          We retain your business data for as long as your account is active. If you delete your account, we delete or anonymise your personal information within 30 days, except where we are required to retain it to comply with law, resolve disputes, or enforce our agreements (for example, transaction records may be kept for the period required by tax law).
        </p>
        <p className={styles.text}>
          Crash and analytics data is retained according to Firebase defaults (typically up to 14 months for analytics, 90 days for individual crash events).
        </p>
      </LegalSection>

      <LegalSection number={8} title="Your rights">
        <p className={styles.text}>
          Depending on where you live you have rights over the personal data we hold about you, which may include:
        </p>
        <LegalList items={YOUR_RIGHTS} />
        <p className={styles.text}>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:privacy@wusooly.com" className={styles.inlineLink}>
            privacy@wusooly.com
          </a>.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Children">
        <p className={styles.text}>
          Wusooly is built for businesses and is not directed at children under 13. We do not knowingly collect information from children. If you believe a child has provided us with personal data, email us and we will remove it.
        </p>
      </LegalSection>

      <LegalSection number={10} title="Notifications and analytics opt-out">
        <p className={styles.text}>
          You can disable push notifications at any time from your device settings. You can ask us to disable analytics and crash reporting for your account by emailing{" "}
          <a href="mailto:privacy@wusooly.com" className={styles.inlineLink}>
            privacy@wusooly.com
          </a>; this will not affect your ability to use the product.
        </p>
      </LegalSection>

      <LegalSection number={11} title="Security">
        <p className={styles.text}>
          We use TLS for every API call, role-based access on the backend, audit logs for sensitive admin actions, and the platform&apos;s secure storage for tokens. No system is perfectly secure &mdash; if you discover a vulnerability, please report it to{" "}
          <a href="mailto:security@wusooly.com" className={styles.inlineLink}>
            security@wusooly.com
          </a>.
        </p>
      </LegalSection>

      <LegalSection number={12} title="Changes to this policy">
        <p className={styles.text}>
          When we make material changes we will update the &ldquo;Last updated&rdquo; date at the top of this page and, where the change is significant, notify you in-app or by email before it takes effect. Continued use of Wusooly after a change means you accept the revised policy.
        </p>
      </LegalSection>

      <LegalSection number={13} title="Contact">
        <p className={styles.text}>
          Questions about privacy, data, or this policy? Reach us at{" "}
          <a href="mailto:privacy@wusooly.com" className={styles.inlineLink}>
            privacy@wusooly.com
          </a>. For everything else, see our{" "}
          <TransitionLink href="/contact" className={styles.inlineLink}>
            contact page
          </TransitionLink>.
        </p>
        <p className={styles.text}>
          See also our{" "}
          <TransitionLink href="/terms" className={styles.inlineLink}>
            Terms of Service
          </TransitionLink>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
