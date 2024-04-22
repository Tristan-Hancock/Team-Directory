
export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;  // Updated to string to handle phone number formats
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
  
  // Function to fetch users from the JSONPlaceholder API
  export async function fetchUsers(): Promise<User[]> {
    // The URL of the API endpoint
    const url = 'https://jsonplaceholder.typicode.com/users';
  
    // Fetch data from the API
    const response = await fetch(url);
  
    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
  
    // Parse the JSON data and return it
    const users: User[] = await response.json();
    return users;
  }
  