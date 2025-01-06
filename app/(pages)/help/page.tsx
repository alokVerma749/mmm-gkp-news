import React from 'react';

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Help</h1>
      <p className="text-gray-700 mb-2">
        Need assistance? We are here to help!
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>For general queries, email us at <a href="mailto:support@mmmgkp.news" className="text-blue-600">support@mmmgkp.news</a>.</li>
        <li>Check our FAQs for quick answers.</li>
        <li>Follow us on our social media channels for updates.</li>
      </ul>
    </div>
  );
};

export default Help;
