
import { cn } from '@/lib/utils';
import DynamicIcon, { IconName } from '@/components/ui/DynamicIcon';

export const designSystemNavItems = [
  { id: 'color-palette', label: 'Color Palette', icon: 'Palette' as IconName },
  { id: 'typography', label: 'Typography', icon: 'Type' as IconName },
  { id: 'spacing-layout', label: 'Spacing & Layout', icon: 'LayoutGrid' as IconName },
  { id: 'buttons', label: 'Buttons', icon: 'MousePointerClick' as IconName },
  { id: 'status-badges', label: 'Status Badges', icon: 'Badge' as IconName },
  { id: 'tab-navigation', label: 'Tab Navigation', icon: 'Tabs' as IconName },
  { id: 'filter-components', label: 'Filter Components', icon: 'Filter' as IconName },
  { id: 'table-system', label: 'Table System', icon: 'Table' as IconName },
  { id: 'form-elements', label: 'Form Elements', icon: 'ClipboardEdit' as IconName },
  { id: 'layout-components', label: 'Layout Components', icon: 'LayoutTemplate' as IconName },
  { id: 'alerts', label: 'Alerts', icon: 'AlertTriangle' as IconName },
  { id: 'progress', label: 'Progress', icon: 'Hourglass' as IconName },
  { id: 'modals', label: 'Modals', icon: 'AppWindow' as IconName },
  { id: 'toast-notifications', label: 'Toast Notifications', icon: 'BellRing' as IconName },
  { id: 'dropdowns', label: 'Dropdowns', icon: 'ChevronsUpDown' as IconName },
  { id: 'breadcrumbs', label: 'Breadcrumbs', icon: 'MoreHorizontal' as IconName },
  { id: 'brand-assets', label: 'Brand Assets', icon: 'ImageIcon' as IconName },
  { id: 'portal-logos', label: 'Portal Logos', icon: 'GalleryThumbnails' as IconName },
  { id: 'icons', label: 'Icons', icon: 'Sparkles' as IconName },
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
