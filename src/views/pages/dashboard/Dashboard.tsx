import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="p-5 h-full">
            <h1 className="text-xl font-bold mb-8">Compliance Management Dashboard</h1>

            {/* Compliance Overview Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Compliance Score</h2>
                    <p className="text-3xl font-bold text-success">85%</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Recent Violations</h2>
                    <p className="text-3xl font-bold text-error">5</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Pending Reviews</h2>
                    <p className="text-3xl font-bold text-warning">12</p>
                </div>
            </section>

            {/* Knowledge Base Analytics */}
            <h2 className="text-xl font-bold mb-4">Knowledge Base Analytics</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">My Documents</h2>
                    <p className="text-3xl font-bold text-primary">102</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Under Review</h2>
                    <p className="text-3xl font-bold text-warning">8</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Collaborations</h2>
                    <p className="text-3xl font-bold text-success">7</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Outdated</h2>
                    <p className="text-3xl font-bold text-error">3</p>
                </div>
            </section>

            {/* Chat Insights */}
            <h2 className="text-xl font-bold mb-4">Chat Insights</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Charts Today</h2>
                    <p className="text-3xl font-bold text-success">38</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Top Question Today</h2>
                    <p className="text-3xl  text-primary">How to file a claim?</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Data Leaks</h2>
                    <p className="text-3xl font-bold text-error">9</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Employee Engagement</h2>
                    <p className="text-3xl font-bold text-warning">70%</p>
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
            <h2 className="text-xl font-bold mb-4">Reporting & Logs</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Audit Logs</h2>
                    <p className="text-2xl text-primary">126</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow cursor-pointer">
                    <h2 className="text-md">Download Reports</h2>
                    <p className="text-2xl text-primary">68</p>
                </div>
            </section>

            {/* User & Role Management */}
            {/* <section>
                <h2 className="text-xl font-bold mb-4">User & Role Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl shadow">User Access Levels</div>
                    <div className="p-4 bg-white rounded-2xl shadow">Recent Logins</div>
                </div>
            </section> */}
        </div>
    );
};

export default Dashboard;