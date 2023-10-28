import { Profile } from '@prisma/client'

interface props {
  profile: Profile
}

export function UserInfo({ profile}: props) {
  return (
    <div
      className="flex justify-center items-center"
    >
      <h2>
         {profile.firstName} {profile.lastName}
      </h2>
    </div>
  )
}