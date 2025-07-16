import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../src/ui/table";

import Badge from "../../src/ui/badge/Badge";
import type { User } from "../models/User";
import { useEffect, useState } from "react";
import { getUsers } from "../services/UserService";
import { useNavigate } from "react-router-dom";


export default function UsersPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);


    useEffect(() => {
        console.log("Fetching users...");
        // Fetch users from an API or other source
        const fetchUsers = async () => {
            const response = await getUsers();
            const data = response as User[];
            console.log("Fetched users:", data);
            // Set the fetched users to state
            if (!data || !Array.isArray(data)) {
                console.error("Invalid data format:", data);
                return;
            }
            if (data.length === 0) {
                console.warn("No users found");
                return;
            }
            // Assuming data is an array of User objects
            if (data.some(user => !user.id || !user.name || !user.email)) {
                console.error("Some users are missing required fields");
                return;
            }
            console.log("Valid users data:", data);
            // Set the users state  
            setUsers(data);
        };
        fetchUsers();
    }, []); 

    const handleCreateUser = () => {
        // Logic to handle user creation
        navigate('/add-user'); // Navigate to the Add User page
        
    };



    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            {/* App bar with button create user and more */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-white/[0.05]">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Users
                </h1>
                <button onClick={handleCreateUser} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                   Add user
                </button>
            </div>
            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Table Header */}
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                User
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Email
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Role
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Phone
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Budget
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.05]">
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white">
                                    {user.name}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white">
                                    {user.email}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white">
                                    {user.role}
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <Badge
                                        variant="light"
                                        color={user.status === "active" ? "success" : "error"}
                                        size="sm"
                                        >
                                        {user.phone_number}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white">
                                    $1000
                                </TableCell>
                            </TableRow>
                        ))} 
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
