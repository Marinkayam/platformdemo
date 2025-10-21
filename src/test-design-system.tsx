import { Button, Card, CardHeader, CardTitle, CardContent, StatusBadge } from '@monto/design-system';

export function DesignSystemTest() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Design System Import Test</h1>

      {/* Test Button */}
      <div>
        <Button variant="default">Primary Button</Button>
        <Button variant="secondary" className="ml-2">Secondary Button</Button>
      </div>

      {/* Test Card */}
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card is from @monto/design-system!</p>
          <StatusBadge status="Paid" />
        </CardContent>
      </Card>
    </div>
  );
}
