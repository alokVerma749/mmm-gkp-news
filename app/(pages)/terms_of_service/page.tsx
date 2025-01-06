import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-700 mb-2">
        By accessing MMMGKP.News, you agree to the following terms:
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-gray-600">
        <li>You are responsible for verifying the accuracy of any news or articles.</li>
        <li>Our content is for informational purposes only and may not reflect official sources.</li>
        <li>We reserve the right to modify or remove content at our discretion.</li>
      </ol>
    </div>
  );
};

export default TermsOfService;
