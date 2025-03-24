'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <main className="flex min-h-screen flex-col py-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>
        
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <p className="mb-4 text-gray-700">Welcome to Bubble Trends!</p>

          <p className="mb-4 text-gray-700">
            These terms and conditions outline the rules and regulations for the use of Bubble Trends's Website, located at
            https://www.thebubbletrends.com/.
          </p>

          <p className="mb-4 text-gray-700">
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Bubble Trends
            if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <p className="mb-6 text-gray-700">
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and
            all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the
            Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
            "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance
            and consideration of payment necessary to undertake the process of our assistance to the Client in the most
            appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the
            Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the
            above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as
            interchangeable and therefore as referring to same.
          </p>

          <h2 className="text-2xl font-semibold mb-3 text-red-600">Cookies</h2>
          <p className="mb-4 text-gray-700">
            We employ the use of cookies. By accessing Bubble Trends, you agreed to use cookies in agreement with the
            Bubble Trends's Privacy Policy.
          </p>
          <p className="mb-6 text-gray-700">
            Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by
            our website to enable the functionality of certain areas to make it easier for people visiting our website. Some
            of our affiliate/advertising partners may also use cookies.
          </p>

          {/* Continue with all other sections following the same pattern */}
          <h2 className="text-2xl font-semibold mb-3 text-red-600">License</h2>
          <p className="mb-4 text-gray-700">
            Unless otherwise stated, Bubble Trends and/or its licensors own the intellectual property rights for all
            material on Bubble Trends. All intellectual property rights are reserved. You may access this from Bubble Trends
            for your own personal use subjected to restrictions set in these terms and conditions.
          </p>

          <p className="mb-2 text-gray-700">You must not:</p>
          <ul className="list-disc pl-10 mb-4 text-gray-700">
            <li>Republish material from Bubble Trends</li>
            <li>Sell, rent or sub-license material from Bubble Trends</li>
            <li>Reproduce, duplicate or copy material from Bubble Trends</li>
            <li>Redistribute content from Bubble Trends</li>
          </ul>

          {/* Additional sections would continue here */}
          
          <h2 className="text-2xl font-semibold mb-3 text-red-600">Disclaimer</h2>
          <p className="mb-4 text-gray-700">
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions
            relating to our website and the use of this website. Nothing in this disclaimer will:
          </p>

          <ul className="list-disc pl-10 mb-4 text-gray-700">
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>

          <p className="mb-4 text-gray-700">
            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are
            subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including
            liabilities arising in contract, in tort and for breach of statutory duty.
          </p>

          <p className="mb-4 text-gray-700">
            As long as the website and the information and services on the website are provided free of charge, we will not
            be liable for any loss or damage of any nature.
          </p>
        </div>
      </div>
      
      <footer className="mt-auto bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-gray-700">
            For queries and suggestions, <br />
            contact: thebubbletrends@gmail.com
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/about" className="text-blue-600 hover:text-blue-800">About</Link>
            <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link>
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-blue-600 hover:text-blue-800">Terms and Conditions</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}