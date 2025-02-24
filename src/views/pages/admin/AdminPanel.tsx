import { useState } from 'react';

const AdminPanel = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

       {/* Navigation Links */}
       <div className="flex justify-end gap-4 mt-6">
        <a href="/id/chats" className="text-blue-600 underline">AI Chat</a>
        <a href="/id/knowledge-base" className="text-blue-600 underline">Knowledge Base</a>
      </div>

      {/* Company Details Section */}
      <div className="bg-white rounded-md shadow p-6">
        <h2 className="text-2xl font-semibold cursor-pointer" onClick={() => toggleSection('companyDetails')}>
          Company Details
        </h2>
        {expandedSection === 'companyDetails' && (
          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">Company Name</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium"> Logo</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium"> Website</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Industry</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Company Size</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
          </form>
        )}
      </div>

      {/* Invite Users Section (disabled) */}
      <div className="bg-gray-300 rounded-md shadow p-6 cursor-not-allowed">
        <h2 className="text-2xl font-semibold">Invite Users <i className='text-lg'>(in Progress)</i></h2>
      </div>

      {/* Access Control Section (disabled) */}
      <div className="bg-gray-300 rounded-md shadow p-6 cursor-not-allowed">
        <h2 className="text-2xl font-semibold">Access Control <i className='text-lg'>(in Progress)</i></h2>
      </div>

      {/* Configurations Section (disabled) */}
      <div className="bg-gray-300 rounded-md shadow p-6 cursor-not-allowed">
        <h2 className="text-2xl font-semibold">Configurations<i className='text-lg'>(in Progress)</i></h2>
      </div>

     
    </div>
  );
};

export default AdminPanel;