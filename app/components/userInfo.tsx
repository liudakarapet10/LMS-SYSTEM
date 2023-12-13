import { Profile } from '@prisma/client'

interface props {
  profile: Profile
}

export function UserInfo({ profile}: props) {
  return (
    <div
      className="flex justify-center items-center"
    >
      {profile.firstName} {profile.lastName}
    </div>
  )
}