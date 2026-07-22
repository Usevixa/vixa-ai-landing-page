// Terms of Service. TEMPLATE CONTENT — must be reviewed by counsel before
// launch (§12). Written for VIXA: a WhatsApp-native crypto/remittance service.
import LegalLayout from './LegalLayout';
import { LEGAL_UPDATED, SUPPORT_EMAIL } from '../lib/site';

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated={LEGAL_UPDATED}>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of VIXA, a service that lets
        you send, receive, buy, sell, swap, and move money and crypto through WhatsApp. By using
        VIXA, you agree to these Terms.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be of legal age in your country and able to enter into a binding contract to use
        VIXA. You must complete any identity verification we require, and you agree to provide
        accurate, current, and complete information.
      </p>

      <h2>Using the service</h2>
      <ul>
        <li>You send instructions to VIXA on WhatsApp using text or voice notes.</li>
        <li>VIXA processes the amount, destination, and applicable rates for your request.</li>
        <li>
          No transaction is executed until you confirm it with your PIN. You are responsible for
          keeping your PIN confidential.
        </li>
        <li>
          You are responsible for the accuracy of the details you provide, including recipient and
          destination information.
        </li>
      </ul>

      <h2>Fees and exchange rates</h2>
      <p>
        Applicable fees and exchange rates are shown to you before you confirm a transaction. Rates
        may fluctuate with market conditions. Once you confirm with your PIN, the transaction is
        processed on the terms displayed at confirmation.
      </p>

      <h2>Prohibited use</h2>
      <p>You agree not to use VIXA to:</p>
      <ul>
        <li>Engage in money laundering, fraud, or the financing of illegal activity.</li>
        <li>Violate any applicable law, regulation, or sanctions program.</li>
        <li>Impersonate another person or provide false identity or transaction information.</li>
        <li>Attempt to disrupt, abuse, or gain unauthorized access to the service.</li>
      </ul>
      <p>
        We may suspend or terminate access, and flag or hold transactions, where we detect
        suspicious activity or a breach of these Terms.
      </p>

      <h2>Transactions and reversals</h2>
      <p>
        Transfers are typically fast and, once confirmed and settled, may be irreversible. Please
        verify all details before confirming with your PIN. If you believe a transaction was made
        in error or without your authorization, contact support immediately.
      </p>

      <h2>Availability</h2>
      <p>
        We work to keep VIXA available and reliable, but we do not guarantee uninterrupted service.
        Coverage, supported countries, and payout methods may change over time.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, VIXA is provided &ldquo;as is&rdquo; and we are not
        liable for indirect, incidental, or consequential damages arising from your use of the
        service. Nothing in these Terms limits liability that cannot be limited under applicable
        law.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be reflected by updating
        the date at the top of this page. Continued use of VIXA after changes take effect
        constitutes acceptance of the updated Terms.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about these Terms? Reach us on WhatsApp support or email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalLayout>
  );
}
