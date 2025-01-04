import ProfileSection from "@/components/component/ProfileSection";
import SettingsSection from "@/components/component/SettingsSection";
import { withAuth } from "@/components/layouts/withAuth";
import { useAuth } from "@/features/auth/AuthContext";
import { useFetchUser } from "@/features/users/useFetchUser";

function ProfileAndSettingsPage() {
  const { userData } = useAuth();
  const { data: allUserData, isLoading } = useFetchUser();
  if (!userData) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container p-4 mx-auto space-y-8">
      <ProfileSection userData={userData} />
      {userData.role === "admin" && <SettingsSection allUsers={allUserData} />}
    </div>
  );
}

export default withAuth(ProfileAndSettingsPage);
