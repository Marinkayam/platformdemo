import React, { useState, useMemo } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PaymentsRelationshipsHeader } from "@/components/payments-relationships/PaymentsRelationshipsHeader";
import { TooltipProvider } from "@/components/ui/tooltip";
import { mockPortalUsers } from "@/data/portalUsers";
import { PortalUser } from "@/types/portalUser";
import { PortalUsersTable } from "@/components/payments-relationships/portal-users";
import { AddPortalUserModal } from "@/components/payments-relationships/portal-users/AddPortalUserModal";
import { ConfirmRemoveModal } from "@/components/payments-relationships/portal-users/ConfirmRemoveModal";
import { DataTableFacetedFilter, Option } from "@/components/dashboard/filters/DataTableFacetedFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Search, Filter } from "lucide-react";

export default function SecretScanAgents() {
  const [isAddPortalUserModalOpen, setIsAddPortalUserModalOpen] = useState(false);
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
  const [userToRemoveId, setUserToRemoveId] = useState<string | null>(null);
  const [portalUsers, setPortalUsers] = useState<PortalUser[]>(
    mockPortalUsers.filter(u => !['Coupa','Amazon Payee','Oracle Procurement'].includes(u.portal))
  );

  // New filter states
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());
  const [selectedPortals, setSelectedPortals] = useState<Set<string>>(new Set());
  const [selectedUserTypes, setSelectedUserTypes] = useState<Set<string>>(new Set());

  // Generate filter options from data
  const statusOptions: Option[] = useMemo(() => {
    const statusCounts = portalUsers.reduce((acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({
      label: status,
      value: status,
      count
    }));
  }, [portalUsers]);

  const portalOptions: Option[] = useMemo(() => {
    const portalCounts = portalUsers.reduce((acc, user) => {
      acc[user.portal] = (acc[user.portal] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(portalCounts).map(([portal, count]) => ({
      label: portal,
      value: portal,
      count
    }));
  }, [portalUsers]);

  const userTypeOptions: Option[] = useMemo(() => {
    const typeCounts = portalUsers.reduce((acc, user) => {
      acc[user.userType] = (acc[user.userType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts).map(([type, count]) => ({
      label: type,
      value: type,
      count
    }));
  }, [portalUsers]);

  // Filter logic
  const filteredUsers = useMemo(() => {
    let filtered = [...portalUsers];

    // Search filter
    if (searchValue) {
      filtered = filtered.filter(user => 
        user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.portal.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.verificationEmail?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatuses.size > 0) {
      filtered = filtered.filter(user => selectedStatuses.has(user.status));
    }

    // Portal filter  
    if (selectedPortals.size > 0) {
      filtered = filtered.filter(user => selectedPortals.has(user.portal));
    }

    // User type filter
    if (selectedUserTypes.size > 0) {
      filtered = filtered.filter(user => selectedUserTypes.has(user.userType));
    }

    return filtered;
  }, [portalUsers, searchValue, selectedStatuses, selectedPortals, selectedUserTypes]);

  const isFiltered = searchValue || selectedStatuses.size > 0 || selectedPortals.size > 0 || selectedUserTypes.size > 0;

  const handleReset = () => {
    setSearchValue("");
    setSelectedStatuses(new Set());
    setSelectedPortals(new Set());
    setSelectedUserTypes(new Set());
  };

  const handleConfirmRemove = () => {
    if (userToRemoveId) {
      setPortalUsers(prev => prev.filter(user => user.id !== userToRemoveId));
      setIsConfirmRemoveModalOpen(false);
      setUserToRemoveId(null);
    }
  };

  const handleAddModalSubmit = (userData: Partial<PortalUser>) => {
    const newUser: PortalUser = {
      id: `pu${Date.now()}`,
      portal: userData.portal || '',
      username: userData.username || '',
      status: userData.status || 'Validating',
      userType: userData.userType || 'External',
      linkedSmartConnections: userData.linkedSmartConnections || 0,
      lastUpdated: new Date().toISOString(),
      isReadOnly: false,
      twoFAMethod: userData.twoFAMethod,
      phoneNumber: userData.phoneNumber,
      verificationEmail: userData.verificationEmail,
      issue: userData.issue
    };
    setPortalUsers([...portalUsers, newUser]);
    setIsAddPortalUserModalOpen(false);
  };

  const handleRemoveUser = (userId: string) => {
    setUserToRemoveId(userId);
    setIsConfirmRemoveModalOpen(true);
  };

  return (
    <TooltipProvider>
      <div className="space-y-4 p-8">
        <PaymentsRelationshipsHeader 
          activeTab="scan-agents"
          onAddPortalUser={() => setIsAddPortalUserModalOpen(true)}
        />
        
        <PageHeader 
          title="Scan Agents (Test Filters)"
          subtitle="Testing new filter system - Portal users configuration for automated scanning"
        />

        {/* New Filter Toolbar */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </h3>
            {isFiltered && (
              <span className="text-xs text-gray-500">
                {filteredUsers.length} of {portalUsers.length} users
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users, portals, emails..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-8 pl-8"
              />
            </div>

            {/* Status Filter */}
            <DataTableFacetedFilter
              title="Status"
              options={statusOptions}
              selectedValues={selectedStatuses}
              onSelectionChange={setSelectedStatuses}
            />

            {/* Portal Filter */}
            <DataTableFacetedFilter
              title="Portal"
              options={portalOptions}
              selectedValues={selectedPortals}
              onSelectionChange={setSelectedPortals}
            />

            {/* User Type Filter */}
            <DataTableFacetedFilter
              title="User Type"
              options={userTypeOptions}
              selectedValues={selectedUserTypes}
              onSelectionChange={setSelectedUserTypes}
            />

            {/* Reset Button */}
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={handleReset}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {isFiltered && (
            <div className="flex flex-wrap gap-2">
              {searchValue && (
                <Badge variant="secondary" className="rounded-sm">
                  Search: {searchValue}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => setSearchValue("")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              {Array.from(selectedStatuses).map((status) => (
                <Badge key={status} variant="secondary" className="rounded-sm">
                  Status: {status}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => {
                      const newStatuses = new Set(selectedStatuses);
                      newStatuses.delete(status);
                      setSelectedStatuses(newStatuses);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {Array.from(selectedPortals).map((portal) => (
                <Badge key={portal} variant="secondary" className="rounded-sm">
                  Portal: {portal}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => {
                      const newPortals = new Set(selectedPortals);
                      newPortals.delete(portal);
                      setSelectedPortals(newPortals);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {Array.from(selectedUserTypes).map((type) => (
                <Badge key={type} variant="secondary" className="rounded-sm">
                  Type: {type}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => {
                      const newTypes = new Set(selectedUserTypes);
                      newTypes.delete(type);
                      setSelectedUserTypes(newTypes);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Portal Users Table */}
        <PortalUsersTable 
          portalUsers={filteredUsers}
          onRemovePortalUser={handleRemoveUser}
        />

        {/* Modals */}
        <AddPortalUserModal
          isOpen={isAddPortalUserModalOpen}
          onClose={() => setIsAddPortalUserModalOpen(false)}
          mode="create"
          onSave={handleAddModalSubmit}
        />

        <ConfirmRemoveModal
          isOpen={isConfirmRemoveModalOpen}
          onClose={() => setIsConfirmRemoveModalOpen(false)}
          onConfirm={handleConfirmRemove}
          itemName="agent"
        />
      </div>
    </TooltipProvider>
  );
}