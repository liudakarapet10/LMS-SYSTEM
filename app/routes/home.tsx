import {json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserId } from '~/utils/auth.server'
import { Layout } from '~/components/layout'
import { UserPanel } from '~/components/user-panel'
import {getUserById} from '~/utils/user.server';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const user = await getUserById(userId);
  return {user};
}

export default function Home() {
  const { user } = useLoaderData();
  return (
    <Layout>
      <div className="h-full flex">
        <UserPanel user={user} />
      </div>
    </Layout>
  )
}
