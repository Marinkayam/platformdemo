import { cn } from '@/lib/utils';
import DynamicIcon, { IconName } from '@/components/ui/DynamicIcon';

export const designSystemNavItems = [
  { id: 'color-palette', label: 'Color Palette', icon: 'palette' as IconName },
  { id: 'typography', label: 'Typography', icon: 'type' as IconName },
  { id: 'spacing-layout', label: 'Spacing & Layout', icon: 'layout-grid' as IconName },
  { id: 'buttons', label: 'Buttons', icon: 'mouse-pointer-click' as IconName },
  { id: 'status-badges', label: 'Status Badges', icon: 'badge' as IconName },
  { id: 'tab-navigation', label: 'Tab Navigation', icon: 'tabs' as IconName },
  { id: 'filter-components', label: 'Filter Components', icon: 'filter' as IconName },
  { id: 'table-system', label: 'Table System', icon: 'table' as IconName },
  { id: 'form-elements', label: 'Form Elements', icon: 'clipboard-edit' as IconName },
  { id: 'layout-components', label: 'Layout Components', icon: 'layout-template' as IconName },
  { id: 'alerts', label: 'Alerts', icon: 'alert-triangle' as IconName },
  { id: 'progress', label: 'Progress', icon: 'hourglass' as IconName },
  { id: 'modals', label: 'Modals', icon: 'app-window' as IconName },
  { id: 'toast-notifications', label: 'Toast Notifications', icon: 'bell-ring' as IconName },
  { id: 'dropdowns', label: 'Dropdowns', icon: 'chevrons-up-down' as IconName },
  { id: 'breadcrumbs', label: 'Breadcrumbs', icon: 'more-horizontal' as IconName },
  { id: 'brand-assets', label: 'Brand Assets', icon: 'image-icon' as IconName },
  { id: 'portal-logos', label: 'Portal Logos', icon: 'gallery-thumbnails' as IconName },
  { id: 'icons', label: 'Icons', icon: 'sparkles' as IconName },
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
