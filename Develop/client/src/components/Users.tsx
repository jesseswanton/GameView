
///not used 

import React from 'react';

import type { UserData } from "../interfaces/UserData";
import auth from '../utils/auth';

// Define the props for the component
interface UserListProps {
    users: UserData[] | null; // users can be an array of UserData objects or null
}

const UserList: React.FC<UserListProps> = () => {
    return (
        <>
            <h2 className="pt-4" style={{fontSize: "32px"}}>
               Hey {auth.getProfile().username}!
            </h2>
        </>
    );
};

export default UserList;
