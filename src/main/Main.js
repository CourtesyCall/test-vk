import React, {useContext} from 'react';
import {UserContext} from "../context";

const Main = () => {
    const { user } = useContext(UserContext);
    return (
        <div className='flex h-screen flex-col justify-between border-e bg-white'>
            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <img
                        alt=""
                        src={user.user.avatar}
                        className="size-10 rounded-full object-cover"
                    />

                    <div>
                        <p className="text-xs">
                            <strong className="block font-medium">{`${user.user.first_name} ${user.user.last_name}`}</strong>

                            <span>{user.user.email}</span>
                        </p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Main;