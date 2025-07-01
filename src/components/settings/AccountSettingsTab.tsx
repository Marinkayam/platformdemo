
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccessToast } from "@/lib/toast-helpers";

export function AccountSettingsTab() {
  const [firstName, setFirstName] = useState("Lisa");
  const [lastName, setLastName] = useState("Smith");
  const [email, setEmail] = useState("lisa.smith@example.com");

  const handleSaveProfile = () => {
    showSuccessToast(
      "Profile updated",
      "Your profile information has been updated successfully."
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-grey-900 mb-1">Account Settings</h6>
        <p className="text-base text-grey-600">
          Manage your personal information and account preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and contact information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              value="Eastern Time (ET)"
              readOnly
              className="bg-gray-50 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              value="English"
              readOnly
              className="bg-gray-50 cursor-not-allowed"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveProfile} className="bg-[#7B59FF] hover:bg-[#6a4bea]">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
