import React from 'react';
import { ExceptionBanner } from '@/components/ui/exception-banner';
import { Button } from '@/components/ui/button';
import { WandSparkles, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Exception } from '@/types/exception';

interface SmartConnectionExceptionProps {
  exception: Exception;
  portal?: string;
}

export function SmartConnectionException({ exception, portal }: SmartConnectionExceptionProps) {
  const navigate = useNavigate();

  const handleNavigateToSmartConnections = () => {
    toast.info('Navigating to Smart Connections', {
      description: 'Opening Smart Connections page to resolve credential issues...'
    });
    navigate('/payments-relationships');
  };

  return (
    <div className="mt-4">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {/* Header Section */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">Resolve Exception</h2>
          </div>
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <p style={{ color: '#38415F' }} className="text-sm">
              Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Smart Connection Exceptions Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Smart connection Exception</h3>
            </div>
            <div className="space-y-3">
              <ExceptionBanner
                variant="error"
                icon="alert"
                title={exception.message}
              >
                {exception.details}
              </ExceptionBanner>
            </div>

            {/* Action Section */}
            <div className="flex items-start gap-3">
              <WandSparkles className="mt-0.5 flex-shrink-0 text-purple-600" size={16} />
              <div>
                <p className="text-sm text-gray-600">
                  To resolve this exception, edit the details on the Smart Connections page. The RTP exception will be cleared automatically.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleNavigateToSmartConnections}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Resolve by Editing Agent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
