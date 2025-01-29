// src/components/Dashboard.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AiIcon  from '../assets/ai_panel.svg?react';
import ProcessIcon from '../assets/process.svg?react';
import RepositoryIcon from '../assets/repository.svg?react';
import SettingsIcon from '../assets/settings.svg?react';
import Search from './Chat/Search';
import RecentChat from './Chat/RecentChat';
import KnowledgeBase from './KnowledgeBase/KnowledgeBase';
import { logout } from '../redux/slices/authSlice';
import '../styles/styles.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const tabs = [
    { label: "Tab 1", content: <Search /> },
    { label: "Tab 2", content: <KnowledgeBase /> },
    { label: "Tab 3", content: "This is the content of Tab 3." },
    { label: "Tab 4", content: "This is the content of Tab 4." },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className='display-wrapper'>
        <div id='left-display'>
          <div className={activeTab === 0 ? 'feature-icon_active' : 'feature-icon'} onClick={() => setActiveTab(0)}>
            <AiIcon fill='#666' />
            <span>Genie Chat</span>
          </div>
          <div className={activeTab === 1 ? 'feature-icon_active' : 'feature-icon'} onClick={() => setActiveTab(1)}>
            <RepositoryIcon fill='#666' />
            <span>Knowledge Base</span>
          </div>
          <div className={activeTab === 2 ? 'feature-icon_active' : 'feature-icon'} onClick={() => setActiveTab(2)}>
            <SettingsIcon fill='#666' />
            <span>Actions</span>
          </div>
          <div className={activeTab === 3 ? 'feature-icon_active' : 'feature-icon'} onClick={() => setActiveTab(3)}>
            <ProcessIcon fill='#666' />
            <span>Projects</span>
          </div>

          <div className='feature-icon' onClick={handleLogout}>
            <ProcessIcon fill='#666' />
            <span>Logout</span>
            {user && <div style={{fontSize: 12}}><b>{user.username}</b></div>}
          </div>
        </div>
        <div id='main-display'>
          {tabs[activeTab].content}
        </div>
        <div id='right-display'>
          <div id='agents'></div>
          <RecentChat />
        </div>
      </div>
    </>
  );
}

export default Dashboard;