import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricCard = ({ title, value, trend }) => {
  const isPositive = trend.startsWith('+');

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="ml-1 text-sm font-medium">{trend}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;