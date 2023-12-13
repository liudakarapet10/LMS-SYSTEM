import { Profile } from "@prisma/client";

interface props {
  profile: Profile;
}

export function UserWelcome({ profile }: props) {
  return (
    <div className="flex justify-center items-center">
      Вітаю, {profile.firstName} {profile.lastName}
    </div>
  );
}
