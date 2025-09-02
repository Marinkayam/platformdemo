
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableActions, commonActions } from "@/components/ui/table-actions";
import { showSuccessToast } from "@/lib/toast-helpers";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const initialTeamMembers = [
  { id: 1, firstName: "Sarah", lastName: "Johnson", email: "sarah@monto.tech", role: "Admin" as const },
  { id: 2, firstName: "Mike", lastName: "Chen", email: "mike@monto.tech", role: "Sys-Admin" as const },
  { id: 3, firstName: "Lisa", lastName: "Rodriguez", email: "lisa@monto.tech", role: "Operator" as const },
];

type TeamMember = typeof initialTeamMembers[number];
type MemberRole = "Admin" | "Sys-Admin" | "Operator";

const getRoleBadgeClass = (role: MemberRole) => {
  switch (role) {
    case "Admin":
      return "bg-[#efefff] text-[#6b53e6] hover:bg-[#e5e2ff] font-medium";
    case "Sys-Admin":
      return "bg-red-100 text-red-800 hover:bg-red-200 font-medium";
    case "Operator":
      return "bg-green-100 text-green-800 hover:bg-green-200 font-medium";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium";
  }
};

export function TeamTab() {
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [copiedMemberId, setCopiedMemberId] = useState<number | null>(null);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<MemberRole>("Operator");
  
  const handleAddNewMember = () => {
    setMemberToEdit(null);
    setEmail("");
    setFirstName("");
    setLastName("");
    setRole("Operator");
    setIsModalOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setMemberToEdit(member);
    setEmail(member.email);
    setFirstName(member.firstName);
    setLastName(member.lastName);
    setRole(member.role);
    setIsModalOpen(true);
  };
  
  const handleDeleteMemberRequest = (member: TeamMember) => {
    setMemberToDelete(member);
  };
  
  const confirmDelete = () => {
    if (memberToDelete) {
      setMembers(members.filter(m => m.id !== memberToDelete.id));
      setMemberToDelete(null);
      showSuccessToast("Member removed", "The team member has been successfully removed.");
    }
  };

  const handleSaveMember = () => {
    if (!email || !firstName || !lastName) {
        // Here you could show an error toast
        return;
    }
    if (memberToEdit) {
      setMembers(members.map(m => m.id === memberToEdit.id ? { ...m, email, firstName, lastName, role } : m));
      showSuccessToast("Member updated", "The team member's details have been updated.");
    } else {
      const newMember = { id: Date.now(), firstName, lastName, email, role };
      setMembers([...members, newMember]);
      showSuccessToast("Member added", "An invitation has been sent to the new member.");
    }
    setIsModalOpen(false);
    setMemberToEdit(null);
  };
  
  const handleCopyInviteLink = async (member: TeamMember) => {
    const inviteLink = `https://montotechnologies.monto.com/invite/${member.id}`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopiedMemberId(member.id);
      setTimeout(() => setCopiedMemberId(null), 2000);
      showSuccessToast("Invite link copied", "The invitation link has been copied to your clipboard.");
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const memberActions = (member: TeamMember) => [
    commonActions.edit(() => handleEditMember(member)),
    commonActions.delete(() => handleDeleteMemberRequest(member)),
  ];

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-semibold text-gray-900 mb-1">Team</h6>
          <p className="text-base text-gray-600">
            Invite teammates to collaborate.
          </p>
        </div>
        <Button onClick={handleAddNewMember} size="default">
          <Plus size={16} strokeWidth={1.5} className="mr-2" />
          Add New Member
        </Button>
      </div>
      <Card className="shadow-none border border-[#ececec] rounded-xl w-full overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="bg-gray-50/50 border-b">
                <TableRow>
                  <TableHead className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide w-1/4">Full Name</TableHead>
                  <TableHead className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide w-1/4">Email</TableHead>
                  <TableHead className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide w-1/4">Role</TableHead>
                  <TableHead className="px-4 md:px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide w-1/4"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {members.map((member, index) => (
                 <TableRow key={member.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0">
                    <TableCell className="px-4 md:px-6 py-4 w-1/4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#EFEBFF] text-[#6b53e6] flex items-center justify-center text-xs font-light">
                          {getInitials(member.firstName, member.lastName)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">{member.firstName} {member.lastName}</div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 md:px-6 py-4 w-1/4">
                      <div className="text-sm text-gray-600">{member.email}</div>
                    </TableCell>
                    <TableCell className="px-4 md:px-6 py-4 w-1/4">
                      <Badge className={getRoleBadgeClass(member.role)}>{member.role}</Badge>
                    </TableCell>
                    <TableCell className="px-4 md:px-6 py-4 text-right w-1/4">
                       <TableActions actions={memberActions(member)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{memberToEdit ? "Edit Member" : "Add New Member"}</DialogTitle>
            <DialogDescription>
              {memberToEdit ? "Update the details for the team member." : "Enter the details to invite a new member."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-3"
                placeholder="John"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-3"
                placeholder="Doe"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="name@company.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select value={role} onValueChange={(value: MemberRole) => setRole(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Sys-Admin">Sys-Admin</SelectItem>
                  <SelectItem value="Operator">Operator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveMember}>
              {memberToEdit ? "Save Changes" : "Send Invite"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={!!memberToDelete} onOpenChange={(open) => !open && setMemberToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the member from your team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setMemberToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
