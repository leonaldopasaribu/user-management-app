import type { Route } from './+types/home';
import UserList from '~/components/UserList';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'User Management App' },
    { name: 'description', content: 'Manage users with ease' },
  ];
}

export default function Home() {
  return <UserList />;
}
