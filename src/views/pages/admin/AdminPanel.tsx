import { Button } from 'flowbite-react';
import { useState } from 'react';
import { Link } from 'react-router';
// import { inviteUser } from 'src/redux/slices/authSlice';
// import dispatch from 'src/redux/store';

const AdminPanel = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [email, setEmail] = useState('');

  const toggleSection = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleInvite = async () => {
      
    // dispatch(inviteUser({email}));
    setEmail('');
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

       {/* Navigation Links */}
      <div className="flex justify-end gap-4 mt-6">
        <Button as={Link} to="/id/dashboard" className="bg:primary" color={'primary'}>Dashboard</Button>
        <Button as={Link} to="/id/repository" className="bg:primary" color={'primary'}>Knowledge Base</Button>
        <Button as={Link} to="/id/chats" className="bg:primary size-sm" color={'primary'}>AI Chat</Button>
      </div>

      {/* Company Details Section */}
      <div className={`bg-white rounded-md shadow p-6 cursor-pointer ${expandedSection !== 'companyDetails' && 'hover:bg-lightprimary' }`}>
        <h2 className="text-xl font-semibold cursor-pointer" onClick={() => toggleSection('companyDetails')}>
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
      <div className={`bg-white rounded-md shadow p-6 cursor-pointer ${expandedSection !== 'inviteUsers' && 'hover:bg-lightprimary' }`}>
        <h2 className="text-xl font-semibold" onClick={() => toggleSection('inviteUsers')} >Invite Users</h2>

        {expandedSection === 'inviteUsers' && (
          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded p-2" />
            </div>
            <Button onClick={handleInvite} className="bg-primary">Invite</Button>
          </form>
        )}
      </div>

      {/* Access Control Section (disabled) */}
      <div className="bg-gray-300 rounded-md shadow p-6 cursor-not-allowed">
        <h2 className="text-xl font-semibold">Access Control <i className='text-lg'>(in Progress)</i></h2>
      </div>

      {/* Configurations Section (disabled) */}
      <div className="bg-gray-300 rounded-md shadow p-6 cursor-not-allowed">
        <h2 className="text-xl font-semibold">Configurations<i className='text-lg'>(in Progress)</i></h2>
      </div>

     
    </div>
  );
};

export default AdminPanel;