import { Database, Globe, Server } from 'lucide-react';

const ResourceCard = ({ resource }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'API':
        return <Globe className="w-8 h-8 text-blue-500" />;
      case 'Database':
        return <Database className="w-8 h-8 text-green-500" />;
      case 'Service':
        return <Server className="w-8 h-8 text-purple-500" />;
      default:
        return <Server className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-3 mb-4">
        {getIcon(resource.type)}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{resource.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{resource.type}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{resource.description}</p>
    </div>
  );
};

export default ResourceCard;