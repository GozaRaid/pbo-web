"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePutDisplayname } from "@/features/profile/UsePutDisplayname";

export default function ProfileSection({ userData }) {
  const [displayName, setDisplayName] = useState(userData?.displayName || "");
  const putDisplayname = usePutDisplayname();

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleUpdateDisplayName = async () => {
    try {
      await putDisplayname.mutateAsync({
        displayname: displayName,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 mx-auto rounded-lg shadow bg-card">
      <h2 className="mb-4 text-2xl font-semibold">Profile</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={handleDisplayNameChange}
            className="mt-1"
          />
        </div>
        <Button onClick={handleUpdateDisplayName}>Update Display Name</Button>
      </div>
    </div>
  );
}
