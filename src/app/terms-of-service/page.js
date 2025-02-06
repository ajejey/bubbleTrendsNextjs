'use client';

import React from 'react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using our website, you agree to these terms and conditions.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
        <ul className="list-disc pl-5">
          <li>You must be at least 18 years old to use our services</li>
          <li>You agree to use the service for lawful purposes only</li>
          <li>You are responsible for maintaining the confidentiality of your account</li>
        </ul>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. User Content</h2>
        <p>You retain ownership of content you create, but grant us a license to use it within our platform.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
        <p>All original content, design, and software are our property and protected by copyright laws.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
        <p>We are not liable for any direct, indirect, or consequential damages arising from your use of our service.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">6. Advertising</h2>
        <p>Our website may display advertisements, including those from Google AdSense. These are subject to their own terms.</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
        <p>We reserve the right to modify these terms. Continued use of the service constitutes acceptance of changes.</p>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
        <p>For any questions about these Terms of Service, please contact us at <a href="mailto:thebubbletrends@gmail.com" className="text-blue-600 hover:underline">thebubbletrends@gmail.com</a></p>
      </section>
      
      <footer className="mt-8 text-sm text-gray-600">
        <p> {new Date().getFullYear()} Bubble Trends. All rights reserved.</p>
      </footer>
    </div>
  );
}
