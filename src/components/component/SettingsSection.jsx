"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePostAdmin } from "@/features/profile/usePostAdmin";

export default function SettingsSection({ allUsers }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const postAdmin = usePostAdmin();

  const handleSave = async () => {
    // Here you would typically send the updated user roles to your backend
    try {
      await postAdmin.mutateAsync({ id: selectedUser });
      window.location.reload();
    } catch (error) {
      console.error("Error updating user roles:", error);
    }
  };

  const nonAdminUsers = allUsers.filter((user) => user.role === "user");

  return (
    <div className="w-full max-w-2xl p-6 mx-auto rounded-lg shadow bg-card">
      <h2 className="mb-4 text-2xl font-semibold">Settings</h2>
      <div className="space-y-4">
        <div className="pt-4">
          <Label htmlFor="make-admin-select">Make User Admin</Label>
          <div className="flex items-center mt-1 space-x-2">
            <Select
              onValueChange={setSelectedUser}
              value={selectedUser || undefined}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {nonAdminUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={!selectedUser}>
                  Confirm
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will make the selected user an admin. They will
                    have full access to all admin features.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSave}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
