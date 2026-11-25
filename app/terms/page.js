"use client";

import TransitionLink from "../components/layout/TransitionLink";
import LegalDocument, {
  LegalSection,
  LegalList,
  LegalCallout,
} from "../components/sections/LegalDocument";
import styles from "../components/sections/LegalDocument.module.css";
import { FileText } from "lucide-react";

const ACCEPTABLE_USE = [
  "Use the Service to do anything illegal, fraudulent, or harmful.",
  "Reverse-engineer, decompile, or attempt to extract our source code, except where the law expressly allows.",
  "Probe, scan, or test the vulnerability of the Service without our prior written permission, or breach any security or authentication mechanism.",
  "Resell, sublicense, or repackage the Service without an explicit written agreement with us.",
  "Use the Service to transmit malware, spam, or unsolicited bulk communications.",
  "Interfere with the integrity or performance of the Service or the data it contains.",
  "Use the Service to process payment card data in any way that violates PCI DSS or applicable payment-network rules.",
];

const BILLING_TERMS = [
  "Subscriptions renew automatically until you cancel.",
  "Fees are billed in advance and are non-refundable except where required by law.",
  "If a payment fails we will attempt to retry; if we cannot collect, we may suspend or terminate the subscription.",
  "Taxes (VAT, GST, sales tax) are your responsibility unless we explicitly state they are included.",
];

export default function TermsPage() {
  return (
    <LegalDocument
      badgeIcon={<FileText size={14} strokeWidth={2.4} aria-hidden="true" />}
      badgeText="Legal Terms of Service"
      title="Terms of Service"
      lead="These are the rules of the road for using Wusooly. We've kept them as plain as we can without losing precision."
      lastUpdated="May 9, 2026"
      otherPolicyPrompt="Looking for our privacy policy?"
      otherPolicyLabel="Privacy Policy"
      otherPolicyHref="/privacy"
      helpTitle="Questions regarding our Terms?"
      helpText="Reach out to our legal department for enterprise agreements, licensing questions, or compliance clarifications."
      helpEmail="legal@wusooly.com"
      helpSecondaryLabel="Contact Team"
    >
      <LegalSection number={1} title="Agreement to terms">
        <p className={styles.text}>
          By creating an account, signing in, or using Wusooly in any form &mdash; the web dashboard, the mobile apps, the point-of-sale software, or any related service we provide (collectively the &ldquo;Service&rdquo;) &mdash; you agree to these Terms of Service (&ldquo;Terms&rdquo;). If you are using Wusooly on behalf of a business, you represent that you have authority to bind that business to these Terms.
        </p>
        <p className={styles.text}>If you do not agree, do not use the Service.</p>
      </LegalSection>

      <LegalSection number={2} title="The service">
        <p className={styles.text}>
          Wusooly is a business management platform that includes point-of-sale, sales reporting, staff and tax management, inventory tools, and related features. We may add, modify, or remove features over time. We will give reasonable notice before retiring a feature you actively rely on.
        </p>
      </LegalSection>

      <LegalSection number={3} title="Eligibility and accounts">
        <p className={styles.text}>
          You must be at least 18 years old (or the age of legal majority in your jurisdiction) and able to form a binding contract. You must provide accurate registration information and keep it up to date.
        </p>
        <p className={styles.text}>
          You are responsible for everything that happens under your account, including the activity of staff members you add. Keep your credentials and PINs secret. Notify us immediately at{" "}
          <a href="mailto:security@wusooly.com" className={styles.inlineLink}>
            security@wusooly.com
          </a>{" "}
          if you suspect unauthorised access.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Acceptable use">
        <p className={styles.text}>You agree not to:</p>
        <LegalList items={ACCEPTABLE_USE} />
      </LegalSection>

      <LegalSection number={5} title="Subscriptions and billing">
        <p className={styles.text}>
          Some features of the Service are offered on a paid subscription. Pricing is published on our{" "}
          <TransitionLink href="/pricing" className={styles.inlineLink}>
            pricing page
          </TransitionLink>{" "}
          and may also be agreed in a separate order form. Unless stated otherwise:
        </p>
        <LegalList items={BILLING_TERMS} />
      </LegalSection>

      <LegalSection number={6} title="Your content and data">
        <p className={styles.text}>
          You retain ownership of the data you put into Wusooly &mdash; your products, sales, customers, staff records, and so on (&ldquo;Your Data&rdquo;). By using the Service, you grant us a limited licence to host, process, transmit, and display Your Data solely to provide and improve the Service.
        </p>
        <p className={styles.text}>
          You are responsible for the accuracy and legality of Your Data, and for obtaining the consents needed from your own customers, staff, and third parties.
        </p>
        <p className={styles.text}>
          We will return or delete Your Data on request as described in our{" "}
          <TransitionLink href="/privacy" className={styles.inlineLink}>
            Privacy Policy
          </TransitionLink>.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Intellectual property">
        <p className={styles.text}>
          Wusooly, our software, branding, and documentation are owned by us and protected by intellectual-property laws. We grant you a limited, non-exclusive, non-transferable, revocable licence to use the Service for the duration of your subscription and in accordance with these Terms. We reserve all rights not expressly granted.
        </p>
        <p className={styles.text}>
          If you give us feedback or suggestions, you grant us the right to use them without restriction or obligation.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Third-party services">
        <p className={styles.text}>
          The Service integrates with third parties (payment providers, identity providers, push-notification platforms, hardware vendors). Your use of those services is governed by their own terms, and we are not responsible for their performance or policies.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Service availability">
        <p className={styles.text}>
          We work hard to keep Wusooly running. We do not, however, guarantee that the Service will be uninterrupted, timely, secure, or error-free. We may schedule maintenance windows with advance notice and may push critical patches at any time.
        </p>
        <p className={styles.text}>
          The point-of-sale apps include offline support so you can keep taking sales during short outages. Long offline periods may affect features that require server connectivity.
        </p>
      </LegalSection>

      <LegalSection number={10} title="Disclaimers">
        <LegalCallout>
          The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the maximum extent permitted by law, we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
        </LegalCallout>
      </LegalSection>

      <LegalSection number={11} title="Limitation of liability">
        <p className={styles.text}>
          To the maximum extent permitted by law, neither party will be liable for indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill. Our total aggregate liability arising out of or relating to these Terms or the Service will not exceed the greater of (a) the fees you paid us in the twelve months before the event giving rise to the claim, or (b) one hundred US dollars (USD 100).
        </p>
        <p className={styles.text}>
          Some jurisdictions do not allow these limitations; in those jurisdictions our liability is limited to the smallest extent permitted by law.
        </p>
      </LegalSection>

      <LegalSection number={12} title="Indemnification">
        <p className={styles.text}>
          You agree to defend, indemnify, and hold us harmless from any claims, losses, and expenses (including reasonable legal fees) arising from (a) Your Data, (b) your use of the Service in violation of these Terms or applicable law, or (c) your violation of any third-party right.
        </p>
      </LegalSection>

      <LegalSection number={13} title="Suspension and termination">
        <p className={styles.text}>
          You can stop using the Service at any time. You can cancel a paid subscription from your account or by emailing us.
        </p>
        <p className={styles.text}>
          We may suspend or terminate your access if you breach these Terms, if your account creates legal or security risk, or if you fail to pay fees that are due. Where reasonable, we will give you notice and a chance to cure the issue first.
        </p>
        <p className={styles.text}>
          On termination, your right to use the Service ends. Sections that by their nature should survive termination will survive (intellectual property, disclaimers, limitations of liability, indemnification, dispute resolution).
        </p>
      </LegalSection>

      <LegalSection number={14} title="Changes to these terms">
        <p className={styles.text}>
          We may update these Terms from time to time. When we make material changes we will update the &ldquo;Last updated&rdquo; date and, where the change is significant, give reasonable notice in-app or by email before it takes effect. Continued use of the Service after the effective date constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection number={15} title="Governing law and disputes">
        <p className={styles.text}>
          These Terms are governed by the laws of the jurisdiction in which Wusooly is incorporated, without regard to its conflict-of-laws principles. Any dispute that cannot be resolved informally will be brought exclusively in the competent courts of that jurisdiction, except where mandatory consumer-protection laws give you the right to sue in your local courts.
        </p>
        <p className={styles.text}>
          Before filing a formal claim, please contact us at{" "}
          <a href="mailto:legal@wusooly.com" className={styles.inlineLink}>
            legal@wusooly.com
          </a>{" "}
          so we have a chance to resolve it together.
        </p>
      </LegalSection>

      <LegalSection number={16} title="General">
        <p className={styles.text}>
          These Terms, together with our{" "}
          <TransitionLink href="/privacy" className={styles.inlineLink}>
            Privacy Policy
          </TransitionLink>, are the entire agreement between you and us regarding the Service. If a court finds any part unenforceable, the rest continues in effect. Our failure to enforce a right is not a waiver of that right. You may not assign these Terms without our consent; we may assign them as part of a merger, acquisition, or sale of substantially all our assets.
        </p>
      </LegalSection>

      <LegalSection number={17} title="Contact">
        <p className={styles.text}>
          Questions about these Terms? Reach us at{" "}
          <a href="mailto:legal@wusooly.com" className={styles.inlineLink}>
            legal@wusooly.com
          </a>{" "}
          or via our{" "}
          <TransitionLink href="/contact" className={styles.inlineLink}>
            contact page
          </TransitionLink>.
        </p>
        <p className={styles.text}>
          See also our{" "}
          <TransitionLink href="/privacy" className={styles.inlineLink}>
            Privacy Policy
          </TransitionLink>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
