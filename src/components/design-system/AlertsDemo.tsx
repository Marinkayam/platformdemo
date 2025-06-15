
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';

const AlertsDemo = () => {
  return (
    <div className="space-y-8 max-w-lg">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is a standard informational alert. Use it to convey important updates.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          This is a destructive alert. Use it for critical errors and warnings.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertsDemo;
