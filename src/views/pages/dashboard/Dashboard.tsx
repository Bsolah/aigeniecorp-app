import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-5 bg-gray-100 h-full">
      <h1 className="text-xl font-bold mb-8">Compliance Management Dashboard</h1>

      {/* Compliance Overview Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold">Compliance Score</h2>
          <p className="text-2xl font-bold text-green-600">85%</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold">Recent Violations</h2>
          <p className="text-2xl font-bold text-red-600">5</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold">Pending Reviews</h2>
          <p className="text-2xl font-bold text-yellow-600">12</p>
        </div>
      </section>

      {/* Knowledge Base Analytics */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Knowledge Base Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">Total Articles: 120</div>
          <div className="p-4 bg-white rounded-lg shadow">Categories Breakdown: GDPR, ISO, etc.</div>
          <div className="p-4 bg-white rounded-lg shadow">Under Review: 8</div>
          <div className="p-4 bg-white rounded-lg shadow">AI Recommendations: 3</div>
        </div>
      </section>

      {/* Chat Insights */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Chat Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">Chats Today: 45</div>
          <div className="p-4 bg-white rounded-lg shadow">Top Questions: "What is GDPR?"</div>
          <div className="p-4 bg-white rounded-lg shadow">Unresolved Queries: 6</div>
          <div className="p-4 bg-white rounded-lg shadow">User Engagement: 25 Users</div>
        </div>
      </section>

      {/* Tasks & Actions
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tasks & Actions</h2>
        <ul className="bg-white p-6 rounded-2xl shadow">
          <li>Review GDPR Policy - Due: Tomorrow</li>
          <li>Respond to Flagged Article - Due: Today</li>
        </ul>
      </section> */}

      {/* Reporting & Logs */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Reporting & Logs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl shadow">Audit Logs</div>
          <div className="p-4 bg-white rounded-2xl shadow">Download Reports</div>
        </div>
      </section>

      {/* User & Role Management */}
      <section>
        <h2 className="text-2xl font-bold mb-4">User & Role Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl shadow">User Access Levels</div>
          <div className="p-4 bg-white rounded-2xl shadow">Recent Logins</div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;