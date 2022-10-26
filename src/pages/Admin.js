import { useState } from "react";
import CreateHomework from "../components/CreateHomework";
import ViewHomework from "../components/ViewHomework";

const Admin = () => {
    const [selectedMenu, setSelectedMenu] = useState("Create");

    const changeMenu = (menu) => {
        setSelectedMenu(menu);
    };

    return (
        <div className="min-h-screen">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        Dashboard
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="rounded-lg border-4 border-dashed border-gray-200">
                            <>
                                <div className="p-[20px]">
                                    <div className="md:grid md:grid-cols-3">
                                        <div className="md:col-span-1 space-y-[20px] border-b pb-[15px] md:border-b-0 md:pb-0 md:border-r md:pr-[10px]">
                                            <button
                                                onClick={() =>
                                                    changeMenu("Create")
                                                }
                                                className={`text-start w-full px-[10px] py-[10px] border rounded-md  hover:bg-gray-100 cursor-pointer ${
                                                    selectedMenu === "Create"
                                                        ? "border-indigo-500"
                                                        : ""
                                                }`}
                                            >
                                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                                    Add Homework
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    This information will be
                                                    displayed publicly so be
                                                    careful what you share.
                                                </p>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    changeMenu("View")
                                                }
                                                className={`text-start w-full px-[10px] py-[10px] border rounded-md hover:bg-gray-100 cursor-pointer ${
                                                    selectedMenu === "View"
                                                        ? "border-indigo-500"
                                                        : ""
                                                }`}
                                            >
                                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                                    View Homeworks
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    Check or delete homeworks
                                                </p>
                                            </button>
                                        </div>
                                        <div className="mt-5 md:col-span-2 md:mt-0 md:pl-[10px]">
                                            {selectedMenu === "Create" ? (
                                                <CreateHomework />
                                            ) : (
                                                selectedMenu === "View" && (
                                                    <ViewHomework />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin;
