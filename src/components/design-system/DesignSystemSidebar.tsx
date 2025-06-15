
import { cn } from '@/lib/utils';
import DynamicIcon from '@/components/ui/DynamicIcon';

export const designSystemNavItems = [
  { id: 'color-palette', label: 'Color Palette', icon: 'palette' },
  { id: 'typography', label: 'Typography', icon: 'type' },
  { id: 'spacing-layout', label: 'Spacing & Layout', icon: 'layout-grid' },
  { id: 'buttons', label: 'Buttons', icon: 'mouse-pointer-click' },
  { id: 'status-badges', label: 'Status Badges', icon: 'badge' },
  { id: 'tab-navigation', label: 'Tab Navigation', icon: 'layout-list' },
  { id: 'filter-components', label: 'Filter Components', icon: 'filter' },
  { id: 'table-system', label: 'Table System', icon: 'table' },
  { id: 'form-elements', label: 'Form Elements', icon: 'clipboard-list' },
  { id: 'layout-components', label: 'Layout Components', icon: 'layout-template' },
  { id: 'alerts', label: 'Alerts', icon: 'alert-triangle' },
  { id: 'progress', label: 'Progress', icon: 'hourglass' },
  { id: 'modals', label: 'Modals', icon: 'app-window' },
  { id: 'toast-notifications', label: 'Toast Notifications', icon: 'bell-ring' },
  { id: 'dropdowns', label: 'Dropdowns', icon: 'chevrons-up-down' },
  { id: 'breadcrumbs', label: 'Breadcrumbs', icon: 'ellipsis' },
  { id: 'brand-assets', label: 'Brand Assets', icon: 'image' },
  { id: 'portal-logos', label: 'Portal Logos', icon: 'gallery-thumbnails' },
  { id: 'icons', label: 'Icons', icon: 'sparkles' },
];

interface DesignSystemSidebarProps {
    activeItem: string;
    onSelectItem: (id: string) => void;
}

const DesignSystemSidebar = ({ activeItem, onSelectItem }: DesignSystemSidebarProps) => {
    return (
        <nav className="flex flex-col gap-1 p-2">
            {designSystemNavItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onSelectItem(item.id)}
                    className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors',
                        activeItem === item.id && 'bg-purple-50 text-purple-700 font-semibold'
                    )}
                >
                    <DynamicIcon name={item.icon} className="h-4 w-4" />
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default DesignSystemSidebar;
