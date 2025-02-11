import React from 'react';
import AIUpdate from './AIUpdate';

const WelcomeContent: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-1">
            <h1 className="text-4xl font-bold text-primary mb-4">Welcome to your Company Repository</h1>
          <AIUpdate/>
          <div className="max-w-3xl p-5 text-center">
            <p className="text-lg text-gray-300 mb-6">
              Here you can manage files and folders for our project. Follow the instructions below to add or remove files and folders.
            </p>
    
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
              <h2 className="text-xl font-semibold text-blue-300 mb-3">📂 Adding a Folder:</h2>
              <ol className="list-decimal list-inside text-gray-300 mb-4">
                <li>Navigate to the knowledge base from your browser.</li>
                <li> <code className="bg-gray-700 p-1 rounded">Click on the the folders by the left</code> to create a new folder.</li>
                <li>By <code className="bg-gray-700 p-1 rounded">Toggling the folders</code> See Sub Folders and Files.</li>
                <li><code className="bg-gray-700 p-1 rounded">Click on the New Page icon bottom left "Added new page"</code>.</li>
                <li>Click on Integrations to <code className="bg-gray-700 p-1 rounded">integrate with icons</code>.</li>
              </ol>
    
              <h2 className="text-xl font-semibold text-red-300 mb-3">📂 Updating a Folder</h2>
              <ol className="list-decimal list-inside text-gray-300">
                <li>Click on the file to update and <code className="bg-gray-700 p-1 rounded">the files opens, click edit at the right top corner to start typing</code>.</li>
                <li>Modify with AI <code className="bg-gray-700 p-1 rounded">Click in AI Assist to refine the document</code>.</li>
                <li>Delete Files or Pages <code className="bg-gray-700 p-1 rounded">Depending on access files can be deleted by clicking on the delete button at the top</code>.</li>
                <li>Updates from be made <code className="bg-gray-700 p-1 rounded">directly from templates</code>.</li>
              </ol>
            </div>
    
            <div className="mt-6 text-gray-400">
              <p>💡 Need help? Contact the repo administrator.</p>
            </div>
          </div>
        </div>
      );
    
};

export default WelcomeContent;