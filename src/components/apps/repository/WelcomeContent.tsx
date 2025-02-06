import React from 'react';

const WelcomeContent: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Welcome to the Company Repository</h1>
            <p className="text-lg text-gray-300 mb-6">
              Here you can manage files and folders for our project. Follow the instructions below to add or remove files and folders.
            </p>
    
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
              <h2 className="text-xl font-semibold text-blue-300 mb-3">📂 Adding a Folder:</h2>
              <ol className="list-decimal list-inside text-gray-300 mb-4">
                <li>Navigate to the knowledge base from your browser.</li>
                <li>Run <code className="bg-gray-700 p-1 rounded">mkdir folder-name</code> to create a new folder.</li>
                <li>Use <code className="bg-gray-700 p-1 rounded">git add folder-name</code> to stage it.</li>
                <li>Commit with <code className="bg-gray-700 p-1 rounded">git commit -m "Added new folder"</code>.</li>
                <li>Push the changes with <code className="bg-gray-700 p-1 rounded">git push origin main</code>.</li>
              </ol>
    
              <h2 className="text-xl font-semibold text-red-300 mb-3">🗑 Removing a Folder:</h2>
              <ol className="list-decimal list-inside text-gray-300">
                <li>Delete the folder using <code className="bg-gray-700 p-1 rounded">rm -rf folder-name</code>.</li>
                <li>Stage the removal with <code className="bg-gray-700 p-1 rounded">git add -A</code>.</li>
                <li>Commit with <code className="bg-gray-700 p-1 rounded">git commit -m "Removed folder"</code>.</li>
                <li>Push changes using <code className="bg-gray-700 p-1 rounded">git push origin main</code>.</li>
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