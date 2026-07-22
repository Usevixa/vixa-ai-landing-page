// Privacy Policy. TEMPLATE CONTENT — must be reviewed by counsel before
// launch (§12). Written for VIXA: a WhatsApp-native crypto/remittance service.
import LegalLayout from './LegalLayout';
import { LEGAL_UPDATED, SUPPORT_EMAIL } from '../lib/site';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated={LEGAL_UPDATED}>
      <p>
        This Privacy Policy explains how VIXA (&ldquo;VIXA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
        collects, uses, and protects your information when you use our money-transfer service
        through WhatsApp. By using VIXA, you agree to the practices described here.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Account &amp; identity data</strong> — your name, phone number, and the
          identity-verification details required to comply with applicable regulations.
        </li>
        <li>
          <strong>Transaction data</strong> — amounts, currencies, destinations, recipient
          details, and the payment or payout methods used to complete a transfer.
        </li>
        <li>
          <strong>Message data</strong> — the instructions you send us on WhatsApp (text or
          voice notes) needed to understand and carry out your request.
        </li>
        <li>
          <strong>Device &amp; usage data</strong> — technical information such as approximate
          location, network, and interaction logs used to keep the service secure.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To process, confirm, and settle your transactions.</li>
        <li>To verify your identity and meet legal, regulatory, and anti-fraud obligations.</li>
        <li>To detect, prevent, and investigate suspicious or unauthorized activity.</li>
        <li>To provide support and communicate with you about your transfers.</li>
        <li>To improve the reliability, security, and quality of the service.</li>
      </ul>

      <h2>How we protect your money and data</h2>
      <p>
        Every transaction requires your explicit PIN confirmation — nothing moves without your
        approval. We apply identity verification, continuous risk monitoring, and maintain an
        auditable record of each transaction. We use technical and organizational safeguards
        designed to protect your information against unauthorized access, loss, or misuse.
      </p>

      <h2>Sharing your information</h2>
      <p>
        We do not sell your personal information. We share it only as needed to operate the
        service — for example with payment partners, mobile-money and banking providers, and
        identity-verification or compliance vendors — or where required by law, regulation, or
        valid legal process.
      </p>

      <h2>WhatsApp</h2>
      <p>
        VIXA operates over WhatsApp, which is provided by Meta. Your use of WhatsApp is also
        governed by Meta&rsquo;s own privacy policy and terms. We only process the message
        content you send us to fulfil your requests.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain your information for as long as your account is active and for any additional
        period required to meet legal, tax, accounting, or regulatory obligations, after which it
        is deleted or anonymized.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, or delete your
        personal information, or to object to or restrict certain processing. To make a request,
        contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be reflected by
        updating the date at the top of this page.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy or your data? Reach us on WhatsApp support or email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
