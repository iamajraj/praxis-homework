import React from "react";
import { BASE_URL } from "../services/api";

const AdminHomeworkCard = ({ homework, openHomeworkModal }) => {
    return (
        <div className="bg-white shadow-sm rounded-md flex-1 min-w-[170px] overflow-hidden sm:max-w-[250px] min-h-[150px] flex flex-col border">
            {homework.image_url && (
                <img
                    src={BASE_URL + homework.image_url}
                    alt="img"
                    className="w-full h-[120px] object-cover"
                />
            )}
            <p className="text-[14px] py-[15px] px-[10px]">
                {homework.topic.length > 150
                    ? homework.topic.slice(0, 150) + "..."
                    : homework.topic}
            </p>
            <div className="bg-gray-100 py-[5px] pr-[5px] mt-auto">
                <svg
                    onClick={() => openHomeworkModal(homework.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-red-500 ml-auto cursor-pointer"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </div>
        </div>
    );
};

export default AdminHomeworkCard;
