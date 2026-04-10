import { Download } from 'lucide-react';

const Reports = () => {
  const reports = [
    { name: 'Monthly Performance Report', date: '2024-01-15', size: '2.3 MB' },
    { name: 'AI Insights Summary', date: '2024-01-10', size: '1.8 MB' },
    { name: 'Resource Utilization Report', date: '2024-01-05', size: '3.1 MB' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Available Reports</h3>
          <button className="btn btn-primary">Generate New Report</button>
        </div>
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{report.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Generated on {report.date} • {report.size}</p>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;