
import { Clipboard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ColorCard = ({ name, hex, description, className = '' }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(hex);
        toast({ title: 'Copied!', description: `${hex} copied to clipboard.` });
    };
    return (
        <div className="rounded-lg border bg-white shadow-sm p-4 space-y-4">
            <div className="flex justify-between items-start">
                <div className={`w-20 h-20 rounded-lg ${className}`} style={{ backgroundColor: hex }}></div>
                <button onClick={copyToClipboard} className="text-gray-400 hover:text-gray-600">
                    <Clipboard size={16} />
                </button>
            </div>
            <div>
                 <p className="font-semibold text-gray-800">{name}</p>
                 <p className="text-sm text-gray-600 mt-1">{description}</p>
                 <p className="text-sm font-mono text-gray-500 mt-2">{hex}</p>
            </div>
        </div>
    );
};


const ColorPalette = () => {
    const primaryColors = [
        { name: 'primary-lighter', description: 'Lightest purple for subtle backgrounds', hex: '#EFEBFF' },
        { name: 'primary-light', description: 'Light purple for secondary elements', hex: '#BEADFF' },
        { name: 'primary-main', description: 'Main brand purple for primary actions', hex: '#7B59FF' },
        { name: 'primary-dark', description: 'Dark purple for active states', hex: '#523BAA' },
        { name: 'primary-darker', description: 'Darkest purple for maximum emphasis', hex: '#291E55' },
        { name: 'primary-contrast-text', description: 'White text for primary backgrounds', hex: '#FFFFFF', className: "border" },
    ];

    const statusColors = [
        { name: 'Status: Success', description: 'For successful operations', hex: '#10B981' },
        { name: 'Status: Warning', description: 'For warnings or caution', hex: '#F59E0B' },
        { name: 'Status: Error', description: 'For errors or critical issues', hex: '#EF4444' },
        { name: 'Status: Info', description: 'For informational messages', hex: '#3B82F6' },
    ];

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-2xl font-bold mb-6">Primary Colors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {primaryColors.map(color => <ColorCard key={color.name} {...color} />)}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-6">Status Colors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statusColors.map(color => <ColorCard key={color.name} {...color} />)}
                </div>
            </div>
        </div>
    );
};

export default ColorPalette;
