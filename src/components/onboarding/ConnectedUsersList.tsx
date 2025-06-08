
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Trash2, CheckCircle } from 'lucide-react';

export interface ConnectedUser {
  id: string;
  portal: string;
  username: string;
  status: 'connected' | 'connecting' | 'failed';
  poCount?: number;
  invoiceCount?: number;
  error?: string;
}

interface ConnectedUsersListProps {
  users: ConnectedUser[];
  onRemoveUser: (id: string) => void;
}

export function ConnectedUsersList({ users, onRemoveUser }: ConnectedUsersListProps) {
  if (users.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-grey-900">Connected Portal Users</h3>
      <div className="space-y-3">
        {users.map(user => (
          <Card key={user.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-grey-600" />
                  <div>
                    <p className="font-medium text-grey-900">{user.portal}</p>
                    <p className="text-sm text-grey-600">{user.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {user.status === 'connected' && (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {user.poCount} POs, {user.invoiceCount} Invoices
                      </Badge>
                    </>
                  )}
                  {user.status === 'connecting' && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Connecting...
                    </Badge>
                  )}
                  {user.status === 'failed' && (
                    <Badge variant="destructive">
                      Failed
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveUser(user.id)}
                    className="text-grey-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {user.status === 'failed' && user.error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-700">{user.error}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
