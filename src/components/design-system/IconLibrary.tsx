
import React, { useState, useMemo } from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import DynamicIcon, { IconName } from '../ui/DynamicIcon';
import { Input } from '@/components/ui/input';

const usedIconNames: IconName[] = [
    'palette', 'type', 'layout-grid', 'mouse-pointer-click', 'badge', 'layout-list',
    'filter', 'table', 'clipboard-list', 'layout-template', 'alert-triangle',
    'hourglass', 'app-window', 'bell-ring', 'chevrons-up-down', 'ellipsis',
    'image', 'gallery-thumbnails', 'sparkles', 'chevron-left', 'clipboard',
    'user-circle-2', 'x', 'check', 'download', 'pencil', 'ellipsis-vertical',
    'file-text', 'arrow-left', 'info'
];

const allIconNames = [...new Set(usedIconNames)].sort() as IconName[];

const IconDisplay: React.FC<{ name: IconName }> = ({ name }) => (
  <div className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <DynamicIcon name={name} size={32} />
    <span className="text-xs text-center text-gray-600 break-all">{name}</span>
  </div>
);

const IconLibrary = () => {
  const [search, setSearch] = useState('');

  const filteredIconNames = useMemo(() => {
    if (!search) {
      return allIconNames;
    }
    return allIconNames.filter(name =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
          Displaying a curated list of icons currently used throughout the application.
      </p>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search for icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
        {filteredIconNames.map(iconName => (
          <IconDisplay key={iconName} name={iconName} />
        ))}
      </div>
      {filteredIconNames.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No icons found for "{search}"</p>
        </div>
      )}
    </div>
  );
};

export default IconLibrary;
