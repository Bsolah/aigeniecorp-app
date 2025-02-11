
const AIUpdate = () => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow-md max-w-xl mx-auto">
      <h3 className="text-lg font-semibold text-red-700">
        🔄 Call to Action:
      </h3>
      <p className="text-gray-700 mt-2">
        Our recent web crawl of the Central Bank website shows that details on 
        <a href="#" className="text-blue-600 font-semibold hover:underline">
          {" "}Central Bank Monetary Policy Report
        </a> 
        {" "}were updated as of <strong>15/01/2025</strong>.
      </p>
      <p className="text-gray-700 mt-2">
        Please note that your current 
        <a href="#" className="text-blue-600 font-semibold hover:underline">
          {" "}Lending Guidelines
        </a> 
        {" "}information is now outdated since <strong>15/01/2025 - 10 am EST</strong>.
      </p>
    </div>
  );
};

export default AIUpdate;
