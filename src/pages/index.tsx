import { GetStaticProps, NextPage } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { fetchUsers, User } from "../services/userServices"; 
import img from '../images/defaultimage.jpg';

interface HomeProps {
  users: User[];
}

const Home: NextPage<HomeProps> = ({ users }) => {
  const hoverShadowColor = 'rgb(99 102 241)';

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center ">User Information</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              transition: 'box-shadow 0.3s',
              willChange: 'transform',
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 0 3px ${hoverShadowColor}`}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}
          >
            <div className="relative h-40 w-full">
              <Image
                alt={user.name}
                className="h-full w-full object-cover"
                height={400}
                src={img}
                width={400}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                <Link href={`/users/${user.id}`}>
                <h1 className="hover:text-indigo-500">{user.name}</h1>
                </Link>
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const users = await fetchUsers();
  return {
    props: { users },
  };
};

export default Home;
