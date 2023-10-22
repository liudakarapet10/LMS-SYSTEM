import { User } from "@prisma/client";
import { UserWelcome } from '~/components/user-welcome'


export function UserPanel({user}: {user: User[]}) {
    return (
      <div className="w-1/6 bg-gray-200 flex flex-col">
        <div className="text-center bg-gray-300 h-20 flex items-center justify-center">
        {user.map(user => (
       <UserWelcome key={user.id} profile={user.profile} />
    ))}
        </div>
        <div className="flex-1 overflow-y-scroll py-4 flex flex-col gap-y-10">
          <ul>
            <li>Профіль</li>
            <li>Розклад</li>
            <li>Журнал</li>
          </ul>
        </div>
        <div className="text-center p-6 bg-gray-300">
                <form action="/logout" method="post">
                    <button type="submit" className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                        Вихід
                    </button>
                </form>
            </div>

      </div>
    )
  }