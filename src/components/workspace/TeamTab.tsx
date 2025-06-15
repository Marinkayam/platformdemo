import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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


const initialTeamMembers = [
  { id: 1, email: "sarah@monto.tech", role: "Admin" as const },
  { id: 2, email: "mike@monto.tech", role: "Editor" as const },
  { id: 3, email: "lisa@monto.tech", role: "Viewer" as const },
];

type TeamMember = typeof initialTeamMembers[number];
type MemberRole = TeamMember['role'];

const getRoleBadgeClass = (role: MemberRole) => {
  switch (role) {
    case "Admin":
      return "bg-[#efefff] text-[#6b53e6] hover:bg-[#e5e2ff] font-medium";
    case "Editor":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200 font-medium";
    case "Viewer":
      return "bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium";
  }
};

export function TeamTab() {
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MemberRole>("Viewer");
  
  const handleAddNewMember = () => {
    setMemberToEdit(null);
    setEmail("");
    setRole("Viewer");
    setIsModalOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setMemberToEdit(member);
    setEmail(member.email);
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
    if (!email) {
        // Here you could show an error toast
        return;
    }
    if (memberToEdit) {
      setMembers(members.map(m => m.id === memberToEdit.id ? { ...m, email, role } : m));
      showSuccessToast("Member updated", "The team member's details have been updated.");
    } else {
      const newMember = { id: Date.now(), email, role };
      setMembers([...members, newMember]);
      showSuccessToast("Member added", "An invitation has been sent to the new member.");
    }
    setIsModalOpen(false);
    setMemberToEdit(null);
  };
  
  const memberActions = (member: TeamMember) => [
    commonActions.edit(() => handleEditMember(member)),
    commonActions.delete(() => handleDeleteMemberRequest(member)),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-gray-900 mb-1">Team</h6>
        <p className="text-base text-gray-600">
          Invite teammates to collaborate. Admins can manage users, connections, and settings.<br />
          Editors can view and edit. Viewers can only view.
        </p>
      </div>
      <Card className="shadow-none border-[0.5px] border-[#ececec] rounded-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50 border-b">
                <TableRow>
                  <TableHead className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</TableHead>
                  <TableHead className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</TableHead>
                  <TableHead className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white divide-y divide-gray-100">
                {members.map((member) => (
                  <TableRow key={member.id} className="hover:bg-gray-50">
                    <TableCell className="px-8 py-5 whitespace-nowrap text-base text-gray-900">{member.email}</TableCell>
                    <TableCell className="px-8 py-5 whitespace-nowrap">
                      <Badge variant="secondary" className={getRoleBadgeClass(member.role)}>
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8 py-5 whitespace-nowrap">
                       <TableActions actions={memberActions(member)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="px-7 py-7 border-t">
            <Button onClick={handleAddNewMember} className="bg-[#7b61ff] hover:bg-[#634edc] text-white font-semibold h-11 px-6">
              <Plus size={18} className="mr-2" />
              Add New Member
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{memberToEdit ? "Edit Member" : "Add New Member"}</DialogTitle>
            <DialogDescription>
              {memberToEdit ? "Update the details for the team member." : "Enter the email and assign a role to invite a new member."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
              <Select onValueChange={(value: MemberRole) => setRole(value)} value={role}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
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
            <Button type="button" onClick={handleSaveMember} className="bg-[#7b61ff] hover:bg-[#634edc] text-white">
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
