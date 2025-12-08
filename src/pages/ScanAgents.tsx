import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { PaymentsRelationshipsHeader } from "@/components/payments-relationships/PaymentsRelationshipsHeader";
import { TooltipProvider } from "@/components/ui/tooltip";
import { mockPortalUsers } from "@/data/portalUsers";
import { PortalUser } from "@/types/portalUser";
import { PortalUsersTable } from "@/components/payments-relationships/portal-users";
import { AddPortalUserModal } from "@/components/payments-relationships/portal-users/AddPortalUserModal";
import { ConfirmRemoveModal } from "@/components/payments-relationships/portal-users/ConfirmRemoveModal";
import { PortalUserDetailModal } from "@/components/payments-relationships/portal-users/PortalUserDetailModal";
import { usePortalUserFiltering } from "@/hooks/usePortalUserFiltering";
import { DataTableFacetedFilter, Option } from "@/components/dashboard/filters/DataTableFacetedFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Search, ArrowLeft } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function ScanAgents() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddPortalUserModalOpen, setIsAddPortalUserModalOpen] = useState(false);
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
  const [userToRemoveId, setUserToRemoveId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPortalUser, setSelectedPortalUser] = useState<PortalUser | null>(null);
  const [portalUsers, setPortalUsers] = useState<PortalUser[]>(
    mockPortalUsers.filter(u => !['Coupa','Amazon Payee','Oracle Procurement'].includes(u.portal))
  );

  // Use original filtering logic but adapt for new UI
  const {
    filters: portalUserFilters,
    filteredUsers,
    handleFilterChange: handlePortalUserFilterChange,
    handleResetFilters: handleResetPortalUserFilters
  } = usePortalUserFiltering(portalUsers);

  // Generate filter options from data using original approach
  const statusOptions: Option[] = useMemo(() => {
    const statuses = [...new Set(portalUsers.map(user => user.status))];
    return statuses.map(status => ({
      label: status,
      value: status,
      count: portalUsers.filter(user => user.status === status).length
    }));
  }, [portalUsers]);

  const portalOptions: Option[] = useMemo(() => {
    const portals = [...new Set(portalUsers.map(user => user.portal))];
    return portals.map(portal => ({
      label: portal,
      value: portal,
      count: portalUsers.filter(user => user.portal === portal).length
    }));
  }, [portalUsers]);

  const userTypeOptions: Option[] = useMemo(() => {
    const userTypes = [...new Set(portalUsers.map(user => user.userType))];
    return userTypes.map(userType => ({
      label: userType,
      value: userType,
      count: portalUsers.filter(user => user.userType === userType).length
    }));
  }, [portalUsers]);

  // Adapter functions to bridge old and new filter systems
  const handleStatusChange = (values: Set<string>) => {
    handlePortalUserFilterChange('status', Array.from(values));
  };

  const handlePortalChange = (values: Set<string>) => {
    handlePortalUserFilterChange('portal', Array.from(values));
  };

  const handleUserTypeChange = (values: Set<string>) => {
    handlePortalUserFilterChange('userType', Array.from(values));
  };

  const handleSearchChange = (value: string) => {
    handlePortalUserFilterChange('search', value);
  };

  const handleReset = () => {
    handleResetPortalUserFilters();
  };

  const isFiltered = portalUserFilters.search || 
                   portalUserFilters.status.length > 0 || 
                   portalUserFilters.portal.length > 0 || 
                   portalUserFilters.userType.length > 0;

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

    setPortalUsers(prev => [...prev, newUser]);
    setIsAddPortalUserModalOpen(false);
  };

  // Handle opening modal from URL parameter
  useEffect(() => {
    const openAgentModal = searchParams.get('openAgentModal');
    const portalName = searchParams.get('portal');

    if (openAgentModal === 'true') {
      // Find the first portal user for the specified portal, or just the first one
      const userToOpen = portalName
        ? portalUsers.find(user => user.portal === portalName)
        : portalUsers[0];

      if (userToOpen) {
        setSelectedPortalUser(userToOpen);
        setIsDetailModalOpen(true);
      }

      // Clear the query parameter
      searchParams.delete('openAgentModal');
      searchParams.delete('portal');
      setSearchParams(searchParams);
    }
  }, [searchParams, portalUsers]);

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPortalUser(null);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-3 p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-gray-600" />
          </button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Scan Agents</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center justify-between">
          <PageHeader
            title="Scan Agents"
            subtitle="Portal Agents automatically scan portals, sync invoice and PO data, and keep your records up to date—no manual effort needed."
          />
          <PaymentsRelationshipsHeader
            activeTab="scan-agents"
            onAddPortalUser={() => setIsAddPortalUserModalOpen(true)}
          />
        </div>
        
        {/* New Filter System */}
        <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <DataTableFacetedFilter
              title="Status"
              options={statusOptions}
              selectedValues={new Set(portalUserFilters.status)}
              onSelectionChange={handleStatusChange}
            />

            {/* Portal Filter */}
            <DataTableFacetedFilter
              title="Portal"
              options={portalOptions}
              selectedValues={new Set(portalUserFilters.portal)}
              onSelectionChange={handlePortalChange}
            />

            {/* User Type Filter */}
            <DataTableFacetedFilter
              title="User Type"
              options={userTypeOptions}
              selectedValues={new Set(portalUserFilters.userType)}
              onSelectionChange={handleUserTypeChange}
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

            {/* Search Input - moved to right end */}
            <div className="relative w-64 ml-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={portalUserFilters.search || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="h-8 pl-8"
              />
            </div>
        </div>
        
        <PortalUsersTable 
          portalUsers={filteredUsers} 
          onRemovePortalUser={(id) => {
            setUserToRemoveId(id);
            setIsConfirmRemoveModalOpen(true);
          }}
        />
      </div>

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
        itemName={portalUsers.find(user => user.id === userToRemoveId)?.username || "this scan agent"}
      />

      {isDetailModalOpen && selectedPortalUser && (
        <PortalUserDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          portalUser={selectedPortalUser}
          onEditPortalUser={(user) => {
            console.log('Updated user:', user);
          }}
          onDeletePortalUser={(userId) => {
            closeDetailModal();
            setUserToRemoveId(userId);
            setIsConfirmRemoveModalOpen(true);
          }}
        />
      )}
    </TooltipProvider>
  );
}