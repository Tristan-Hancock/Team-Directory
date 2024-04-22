import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { fetchUsers, User } from '../../services/userServices';
import { motion } from 'framer-motion';

interface UserDetailProps {
  user: User;
}
const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
    scale: 0.8
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: "100vw",
    scale: 1.2
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};
const UserDetail: NextPage<UserDetailProps> = ({ user }) => {
  return (
    <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className="container mx-auto px-4 py-8 md:px-6 lg:px-8"
  >
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 bg-gray-950 dark:bg-gray-950">
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
        <div className="flex items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Contact Information</h3>
            <p className="text-gray-400">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">Website:</span> 
              <a className="text-blue-500 hover:underline" href={`http://${user.website}`} rel="noopener noreferrer" target="_blank">
                {user.website}
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
            <p className="text-gray-400">
              <span className="font-semibold">Name:</span> {user.company.name}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">Catch Phrase:</span> {user.company.catchPhrase}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">BS:</span> {user.company.bs}
            </p>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Close</button>
        </div>
      </div>
    </div>
    </motion.div>

  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await fetchUsers();
  const paths = users.map(user => ({
    params: { id: user.id.toString() }
  }));

  return {
    paths,
    fallback: 'blocking' 
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const users = await fetchUsers();
  const user = users.find(u => u.id.toString() === id);

  if (!user) {
    return { notFound: true };
  }

  return {
    props: {
      user
    },
    revalidate: 60 
  };
};

export default UserDetail;
