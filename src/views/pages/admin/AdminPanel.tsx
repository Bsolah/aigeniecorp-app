import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { updateOrg } from 'src/redux/slices/orgSlice';
import dispatch from 'src/redux/store';
// import { inviteUser } from 'src/redux/slices/authSlice';

const orgObj = {
  id: '',
  name: '',
  regNo: '',
  website: '',
  industry: '',
  size: '',
  location: '',
}

const AdminPanel = () => {
  const {org} = useSelector((state: any) => state.org);
  orgObj['id'] = org?._id;
  orgObj['name'] = org?.name;
  orgObj['regNo'] = org?.regNo;
  orgObj['website'] = org?.website;
  orgObj['industry'] = org?.industry;
  orgObj['size'] = org?.size;
  orgObj['location'] = org?.location;
  const [orgState, setOrgState] = useState(orgObj);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [email, setEmail] = useState('');

    // Check if state has changed
    useEffect(() => {
      setIsChanged(JSON.stringify(orgState) !== JSON.stringify(orgObj));
    }, [orgState]);  

  const toggleSection = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleInvite = async () => {
      
    // dispatch(inviteUser({email}));
    setEmail('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrgState({ ...orgState, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(updateOrg(orgState));
    setIsChanged(false);
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
              <input type="text" name="name" onChange={handleChange} className="w-full border rounded p-2" value={orgState?.name} />
            </div>
            <div>
              <label className="block text-sm font-medium" > EIN/Registration No.</label>
              <input type="text" name="regNo" onChange={handleChange} className="w-full border rounded p-2" value={orgState?.regNo}  />
            </div>
            <div>
              <label className="block text-sm font-medium"> Website</label>
              <input type="text" name="website" onChange={handleChange} className="w-full border rounded p-2" value={orgState?.website}  />
            </div>
            <div>
              <label className="block text-sm font-medium" >Industry</label>
              <input type="text" name="industry" onChange={handleChange} className="w-full border rounded p-2" value={orgState?.industry}  />
            </div>
            <div>
              <label className="block text-sm font-medium">Company Size</label>
              <input type="text" name="size" onChange={handleChange} className="w-full border rounded p-2" value={orgState?.size}  />
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input type="text" name="location" onChange={handleChange} className="w-full border rounded p-2"value={orgState?.location} />
            </div>

            <Button className="bg-primary" disabled={!isChanged} onClick={handleSubmit}>Save</Button>
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