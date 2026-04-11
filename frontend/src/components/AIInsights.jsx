import { Lightbulb } from 'lucide-react';

const AIInsights = () => {
  const insights = [
    "Reduce API calls by 30% by implementing caching for this endpoint",
    "Switch to a more efficient algorithm to improve response time by 25%",
    "Optimize database queries to reduce memory usage by 15%",
  ];

  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <Lightbulb className="w-6 h-6 text-gray-500 mr-2" />
        <h3 className="text-lg font-semibold">AI Insights</h3>
      </div>
      <ul className="space-y-2">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start">
            <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIInsights;