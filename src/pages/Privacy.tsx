import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="font-heading font-bold text-lg tracking-tight text-foreground">
              VIXA
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200">
                Back to Home
              </Link>
            </div>
            <Link to="/#cta" className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12 border-b border-border pb-8">Last Updated: March 16, 2026</p>

        <div className="space-y-8 text-sm md:text-base leading-relaxed text-foreground/90">
          <section className="space-y-4">
            <p>Welcome to VIXA.</p>
            <p>VIXA is an AI-powered financial interaction platform designed to help users interact with financial services through conversational interfaces such as messaging platforms and web interfaces.</p>
            <p>This Privacy Policy explains how VIXA, its affiliates, and its technology partners collect, use, store, and protect information when you access or use our services.</p>
            <p>By accessing or using VIXA services, you agree to the practices described in this Privacy Policy.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">1. Company Information</h2>
            <p>VIXA is a financial technology platform that provides AI-assisted financial interactions including but not limited to payment execution, digital asset conversion, financial insights, and transaction support through conversational interfaces.</p>
            <p>For questions regarding this Privacy Policy, you may contact us:<br />
              <strong>Email:</strong> support@usevixa.ai<br />
              <strong>Website:</strong> https://usevixa.ai
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">2. Scope of This Policy</h2>
            <p>This Privacy Policy applies to information collected through:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The VIXA website</li>
              <li>Messaging platforms where VIXA operates (including WhatsApp or other messaging interfaces)</li>
              <li>Mobile or web applications operated by VIXA</li>
              <li>APIs or integrations used by VIXA to deliver services</li>
              <li>Customer support communications</li>
              <li>Financial transaction interactions within the VIXA ecosystem</li>
            </ul>
            <p>This policy applies to all users accessing or interacting with the VIXA platform.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">3. Information We Collect</h2>
            <p>We may collect various categories of information depending on how you interact with the platform.</p>

            <h3 className="text-lg font-semibold mt-6">3.1 Personal Identification Information</h3>
            <p>This may include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Date of birth</li>
              <li>Residential address</li>
              <li>Government-issued identification numbers (where required for compliance)</li>
              <li>National identity number or equivalent identification information where required</li>
            </ul>
            <p>This information may be collected during account setup, verification processes, or service use.</p>

            <h3 className="text-lg font-semibold mt-6">3.2 Identity Verification Information</h3>
            <p>To comply with financial regulations and prevent fraud, we may collect information required for identity verification, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Government-issued identification documents</li>
              <li>Facial verification data where applicable</li>
              <li>Date of birth</li>
              <li>Identity numbers</li>
              <li>Verification responses from trusted identity verification partners</li>
            </ul>
            <p>Identity verification may be required before accessing certain financial services.</p>

            <h3 className="text-lg font-semibold mt-6">3.3 Financial Information</h3>
            <p>When users perform financial transactions through VIXA, we may collect and process financial information including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Wallet addresses</li>
              <li>Transaction instructions</li>
              <li>Payment method information</li>
              <li>Bank account details</li>
              <li>Transaction history</li>
              <li>Currency conversion requests</li>
              <li>Transaction confirmation data</li>
              <li>Settlement status information</li>
            </ul>
            <p>This information is used solely to facilitate transactions and provide service functionality.</p>

            <h3 className="text-lg font-semibold mt-6">3.4 Messaging and Interaction Data</h3>
            <p>Because VIXA operates through conversational interfaces, we may collect and store:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Messages sent to the VIXA AI system</li>
              <li>Commands and instructions provided by users</li>
              <li>AI responses generated by the system</li>
              <li>Interaction timestamps</li>
              <li>Transaction request conversations</li>
            </ul>
            <p>These messages may be logged for operational purposes such as troubleshooting, fraud detection, and service improvement.</p>

            <h3 className="text-lg font-semibold mt-6">3.5 Device and Technical Information</h3>
            <p>We may automatically collect certain technical information including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Browser type</li>
              <li>Internet service provider</li>
              <li>Device identifiers</li>
              <li>Session logs</li>
              <li>Usage patterns</li>
              <li>Platform interaction analytics</li>
            </ul>
            <p>This information helps maintain system reliability and security.</p>

            <h3 className="text-lg font-semibold mt-6">3.6 Usage Data</h3>
            <p>We may collect data about how users interact with the platform, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Features used</li>
              <li>Transaction frequency</li>
              <li>Platform navigation patterns</li>
              <li>Error logs</li>
              <li>System performance metrics</li>
            </ul>
            <p>This data helps improve platform performance and reliability.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">4. How We Use Your Information</h2>
            
            <h3 className="text-lg font-semibold mt-4">4.1 Service Delivery</h3>
            <p>To operate the VIXA platform, including processing financial transactions, executing user instructions, providing AI-powered financial interactions, managing user accounts, and providing customer support.</p>

            <h3 className="text-lg font-semibold mt-4">4.2 Security and Fraud Prevention</h3>
            <p>We use collected information to detect suspicious activity, prevent fraud, protect users against unauthorized transactions, monitor system integrity, and maintain transaction security.</p>

            <h3 className="text-lg font-semibold mt-4">4.3 Compliance with Legal Obligations</h3>
            <p>VIXA may process and store data to comply with Anti-money laundering (AML) regulations, Know Your Customer (KYC) requirements, financial regulatory obligations, and law enforcement requests where legally required.</p>

            <h3 className="text-lg font-semibold mt-4">4.4 Platform Improvement</h3>
            <p>We may analyze aggregated or anonymized data to improve AI response accuracy, enhance transaction reliability, improve system performance, and identify and fix technical issues.</p>

            <h3 className="text-lg font-semibold mt-4">4.5 Communication</h3>
            <p>We may use your contact information to provide service notifications, send transaction confirmations, respond to support requests, and provide security alerts. We do not send unsolicited marketing messages without consent.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">5. Legal Basis for Processing</h2>
            <p>Where applicable, we process personal data based on one or more of the following legal bases:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>User consent</li>
              <li>Performance of a contract</li>
              <li>Compliance with legal obligations</li>
              <li>Legitimate business interests such as security and fraud prevention</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">6. Data Sharing</h2>
            <p>We do not sell personal information to third parties.</p>
            <p>However, information may be shared with trusted service providers necessary to operate the platform. These may include payment processors, banking partners, digital asset settlement partners, identity verification providers, infrastructure hosting providers, messaging platform providers, and security and fraud monitoring services.</p>
            <p>These providers are required to protect your data and only use it for authorized purposes.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">7. Third-Party Platforms</h2>
            <p>If you interact with VIXA through third-party messaging platforms such as WhatsApp or other communication channels, your interaction may also be subject to the privacy policies of those platforms. VIXA does not control how those platforms manage or store your data outside our services.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">8. Data Security</h2>
            <p>VIXA uses multiple security measures to protect user data, including encrypted communication protocols, access control systems, secure server infrastructure, transaction authorization mechanisms, continuous monitoring for suspicious activity, and internal access restrictions.</p>
            <p>Despite these safeguards, no digital system can guarantee complete security.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">9. Data Retention</h2>
            <p>We retain personal data only for as long as necessary to provide services to users, maintain transaction records, comply with financial regulations, resolve disputes, and enforce agreements.</p>
            <p>Once data is no longer required, it may be securely deleted or anonymized.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">10. User Rights</h2>
            <p>Users may have certain rights regarding their personal data, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The right to access stored data</li>
              <li>The right to request correction of inaccurate information</li>
              <li>The right to request deletion of personal data</li>
              <li>The right to restrict processing under certain circumstances</li>
            </ul>
            <p>To exercise these rights, users may contact: <strong>support@usevixa.ai</strong>. Requests will be processed in accordance with applicable laws.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">11. Cookies and Tracking Technologies</h2>
            <p>The VIXA website may use cookies or similar technologies to improve user experience, analyze website traffic, maintain session functionality, and monitor performance. Users may adjust browser settings to refuse cookies if desired.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">12. International Data Transfers</h2>
            <p>Because VIXA may operate globally, user data may be processed or stored in different jurisdictions where service providers operate. Where such transfers occur, VIXA takes reasonable steps to ensure appropriate data protection measures are in place.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">13. Children’s Privacy</h2>
            <p>VIXA services are intended for users 18 years of age or older. We do not knowingly collect personal information from individuals under the age of 18. If we become aware that such data has been collected, it will be removed promptly.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">14. Updates to This Privacy Policy</h2>
            <p>VIXA may update this Privacy Policy periodically to reflect changes in technology, regulations, or services. Updated policies will be posted on this page with a revised Last Updated date. Users are encouraged to review this page periodically.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">15. Contact Information</h2>
            <p>If you have questions about this Privacy Policy or how your data is handled, you may contact us:<br />
              <strong>Email:</strong> support@usevixa.ai<br />
              <strong>Website:</strong> https://usevixa.ai
            </p>
          </section>
        </div>
      </div>

      <footer className="py-6 px-4 border-t border-border">
        <div className="container mx-auto text-center flex flex-col items-center gap-2">
          <p className="text-muted-foreground text-xs">© 2026 VIXA. Intelligence for African money movement.</p>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;