import { GetStaticProps, NextPage } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { fetchUsers, User } from "../services/userServices";
import img from '../images/defaultimage.jpg';

interface HomeProps {
  users: User[];
}

const Home: NextPage<HomeProps> = ({ users }) => {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white-700">User Information</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out card"
          >
            <div className="relative h-48 w-full">
              <Image
                alt={user.name}
                className="h-full w-full object-cover"
                src={img}
                layout="fill"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">
                <Link href={`/users/${user.id}`}>
                  <h1 className="hover:text-indigo-500 transition-colors duration-300">{user.name}</h1>
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .card:hover {
          box-shadow: 0 0 0 3px rgb(10, 102, 240); /* electric blue outline */
        
        }
      `}</style>
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
