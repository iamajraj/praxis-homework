import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import api from "../services/api";
import ToastMessage, { TYPE_ERROR, TYPE_SUCCESS } from "../utils/ToastMessage";
import AdminHomeworkCard from "./AdminHomeworkCard";

const ViewHomework = () => {
    const [homeworks, setHomeworks] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteHomeworkId, setDeleteHomeworkId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const getHomeWorks = async () => {
        const { data } = await api.get("/home");
        setHomeworks(data.homework);
        console.log(data);
    };

    const openHomeworkModal = (id) => {
        setDeleteHomeworkId(id);
        setDeleteModal(true);
    };

    const deleteHomework = async () => {
        setDeleting(true);
        try {
            const res = await api.post("/homwork-delete", {
                homework_id: deleteHomeworkId,
            });
            if (res.status === 200) {
                ToastMessage("Homework deleted successfully!", TYPE_SUCCESS);
                setHomeworks((prev) =>
                    prev.filter((homework) => homework.id !== deleteHomeworkId)
                );
            } else {
                ToastMessage("Failed to delete homework!", TYPE_ERROR);
            }
        } catch (err) {
            ToastMessage("Failed to delete homework!", TYPE_ERROR);
        }
        setDeleting(false);
        setDeleteModal(false);
        setDeleteHomeworkId(null);
    };

    useEffect(() => {
        getHomeWorks();
    }, []);

    return (
        <>
            <div className="shadow-sm bg-white pb-[15px] px-[10px] h-full">
                <h1 className="text-[22px] font-semibold">Homeworks</h1>
                {homeworks.length > 0 ? (
                    <div className="mt-[20px] flex flex-wrap gap-[15px]">
                        {homeworks.map((homework) => (
                            <AdminHomeworkCard
                                homework={homework}
                                openHomeworkModal={openHomeworkModal}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-[10px] mt-[20px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                        </svg>

                        <h1>No homework to show</h1>
                    </div>
                )}
            </div>
            {/* Modal */}
            <div
                className={`opacity-0 pointer-events-none fixed flex items-center justify-center bg-[#00000050] inset-0 h-full ${
                    deleteModal ? "opacity-100 pointer-events-auto" : ""
                }`}
            >
                <div
                    className={`w-full max-w-[400px] bg-white rounded-md pt-[20px] flex flex-col overflow-hidden mx-[10px] scale-0 transition-all duration-200 ${
                        deleteModal ? "scale-100" : ""
                    }`}
                >
                    <h1 className="font-semibold text-[22px] px-[20px] mb-[25px] flex items-center gap-[10px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                        </svg>
                        Are you sure?
                    </h1>
                    <div className="bg-gray-100 w-full mt-auto">
                        <div className="flex gap-[10px] py-[5px] w-max ml-auto pr-[10px]">
                            <button
                                type="submit"
                                className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                onClick={() => setDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                    deleting ? "pointer-events-none" : ""
                                }`}
                                onClick={deleteHomework}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ViewHomework;
