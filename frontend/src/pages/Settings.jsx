const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="John Doe"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultChecked />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Email notifications for alerts</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" defaultChecked />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Push notifications for AI insights</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;