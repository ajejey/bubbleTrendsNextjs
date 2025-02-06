'use client';

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-5">
          <li>To provide and improve our services</li>
          <li>To communicate with you</li>
          <li>To process transactions</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. Cookies and Tracking</h2>
        <p>We use cookies to enhance user experience and analyze site traffic. You can control cookies through your browser settings.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
        <p>We may use third-party services like Google AdSense that may use cookies to serve advertisements.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. Contact us for any privacy-related requests.</p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
        <p>For any privacy concerns, please contact us at <a href="mailto:thebubbletrends@gmail.com" className="text-blue-600 hover:underline">thebubbletrends@gmail.com</a></p>
      </section>
      
      <footer className="mt-8 text-sm text-gray-600">
        <p> {new Date().getFullYear()} Bubble Trends. All rights reserved.</p>
      </footer>
    </div>
  );
}
