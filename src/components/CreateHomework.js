import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";
import ToastMessage, { TYPE_ERROR, TYPE_SUCCESS } from "../utils/ToastMessage";

const CreateHomework = () => {
    const [data, setData] = useState({
        topic: "",
        image: "",
        category: "Speaking",
    });
    const [error, setError] = useState(false);
    const [image, setImage] = useState(null);
    const [tmpImage, setTmpImage] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [adding, setAdding] = useState(false);
    const dropAreaRef = useRef();

    const prepareDropArea = () => {
        ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
            dropAreaRef.current.addEventListener(
                eventName,
                preventDefaults,
                false
            );
        });
        ["dragenter", "dragover"].forEach((eventName) => {
            dropAreaRef.current.addEventListener(
                eventName,
                () => setDragging(true),
                false
            );
        });
        ["dragleave", "drop"].forEach((eventName) => {
            dropAreaRef.current.addEventListener(
                eventName,
                () => setDragging(false),
                false
            );
        });

        dropAreaRef.current.addEventListener("drop", handleDrop, false);
    };
    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const addImage = (img) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImage(img);
            setTmpImage(reader.result.toString());
        };
        reader.readAsDataURL(img);
    };
    const handleDrop = (e) => {
        const img = e.dataTransfer.files[0];
        addImage(img);
    };
    const removeImage = () => {
        setTmpImage(null);
        setImage(null);
    };
    const handleInputChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        if (data.topic.trim() !== "") {
            setError(false);
            setAdding(true);
            try {
                const formData = new FormData();
                formData.append("topic", data.topic);
                formData.append("category", data.category);
                if (data.image) {
                    formData.append("image", image);
                }
                const res = await api.post("/homwork-store", formData);
                if (res.status === 200) {
                    ToastMessage("Homework added successfully!", TYPE_SUCCESS);
                    setData((prev) => ({ ...prev, topic: "", image: "" }));
                    setImage(null);
                    setTmpImage(null);
                } else {
                    ToastMessage("Failed to add homework.", TYPE_ERROR);
                }
            } catch (err) {
                console.log(err);
                ToastMessage("Failed to add homework.", TYPE_ERROR);
            }
            setAdding(false);
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        setData((prev) => ({ ...prev, image: image }));
    }, [image]);

    useEffect(() => {
        prepareDropArea();
    }, []);
    return (
        <>
            <form onSubmit={submit}>
                <div
                    className={`shadow sm:overflow-hidden sm:rounded-md  ${
                        adding ? "animate-pulse pointer-events-none" : ""
                    }`}
                >
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div>
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Topic
                            </label>
                            <div className="mt-1">
                                <textarea
                                    name="topic"
                                    value={data.topic}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="border w-full text-[18px] rounded-md p-[10px] outline-none ring-1 ring-indigo-200 focus:ring-indigo-600 min-h-[150px]"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Add Image (optional)
                            </label>
                            <div
                                ref={dropAreaRef}
                                className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
                            >
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    {dragging ? (
                                        <>
                                            <p className=" font-medium text-indigo-600 text-sm">
                                                Drop your{" "}
                                                <span className="text-gray-600">
                                                    file
                                                </span>
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        accept="image/jpeg, image/jpg, image/png, image/gif, image/svg"
                                                        onChange={(e) => {
                                                            addImage(
                                                                e.target
                                                                    .files[0]
                                                            );
                                                        }}
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">
                                                    or drag and drop
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                            {tmpImage && (
                                <div className="rounded-md overflow-hidden h-[80px] w-[80px] border border-gray-300 mt-[10px] relative select-none">
                                    <svg
                                        onClick={removeImage}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4 absolute right-1 top-1 bg-white rounded-full shadow-md cursor-pointer active:scale-110"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>

                                    <img
                                        src={tmpImage}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Select Category
                            </label>
                            <div className="mt-1">
                                <select
                                    onChange={handleInputChange}
                                    defaultValue="Speaking"
                                    name="category"
                                    id="category"
                                    className="border w-full text-[15px] rounded-md p-[10px] outline-none ring-1 ring-indigo-200 focus:ring-indigo-600"
                                >
                                    {["Speaking", "Reading", "Listening"].map(
                                        (value, i) => {
                                            return (
                                                <option key={i} value={value}>
                                                    {value}
                                                </option>
                                            );
                                        }
                                    )}
                                    <option value="writting">Writing</option>
                                </select>
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-500 italic">
                                *Please provide topic text
                            </p>
                        )}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                adding ? "pointer-events-none" : ""
                            }`}
                        >
                            {adding ? "Adding.." : "Add"}
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </form>
        </>
    );
};

export default CreateHomework;
