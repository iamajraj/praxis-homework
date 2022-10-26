import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import {
    listeningApi,
    readingApi,
    speakingApi,
    writingApi,
} from "../services/api";

function Home() {
    const [speakingData, setSpeakingData] = useState();
    const [readingData, setReadingData] = useState();
    const [listeningData, setListeningData] = useState();
    const [writingData, setWritingData] = useState();
    const [selectedTab, setSelectedTab] = useState("Speaking");
    const [loading, setLoading] = useState(false);

    const tabs = {
        Speaking: speakingData ?? [],
        Writing: writingData ?? [],
        Listening: listeningData ?? [],
        Reading: readingData ?? [],
    };

    const fetchData = async () => {
        if (!loading) {
            setLoading(true);
            let data;
            data = await speakingApi();
            setSpeakingData(data.speaking);
            setLoading(false);
            data = await readingApi();
            setReadingData(data.reading);
            data = await writingApi();
            setWritingData(data.writting);
            data = await listeningApi();
            setListeningData(data.listening);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full h-screen sm:h-auto min-h-screen flex sm:items-center sm:justify-center">
            <div className="w-full flex-1 h-full sm:max-w-[400px] sm:border sm:border-gray-200 sm:min-h-[550px] sm:rounded-md shadow-md flex flex-col sm:mx-[10px] sm:my-[15px] overflow-hidden">
                <div className="w-full bg-indigo-500 py-[10px] relative">
                    <h1 className="text-[22px] text-center text-white">
                        Homeworks
                    </h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-white absolute top-[50%] -translate-y-[50%] right-[10px] cursor-pointer"
                        onClick={fetchData}
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                    </svg>
                </div>
                {/* Content */}
                <div className="flex-1 flex flex-col mt-[30px] sm:max-h-[430px] px-[15px] pb-[15px]">
                    <h1 className="text-[22px]">
                        Date: {new Date().toDateString()}
                    </h1>
                    <div className="flex-1 h-full overflow-y-scroll mt-[25px] space-y-[20px] scrollbar">
                        {loading ? (
                            <h1>Loading...</h1>
                        ) : tabs[selectedTab].length > 0 ? (
                            tabs[selectedTab].map((homework) => {
                                return (
                                    <HomeCard
                                        key={homework.id}
                                        homework={homework}
                                        category={selectedTab}
                                    />
                                );
                            })
                        ) : (
                            <h1 className="flex items-center gap-[10px]">
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
                                No homeworks in{" "}
                                <span className="text-indigo-500">
                                    {selectedTab}
                                </span>
                            </h1>
                        )}
                    </div>
                </div>
                {/* Icons */}
                <ul className="flex justify-between flex-wrap bg-indigo-500 min-h-[60px] mt-auto">
                    <li
                        className="rounded-sm px-[10px] flex items-center justify-center flex-1 my-[10px] cursor-pointer hover:opacity-40 border-r"
                        onClick={() => setSelectedTab("Speaking")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-6 h-6 fill-white transition-all duration-200 ${
                                selectedTab === "Speaking" ? "scale-150" : ""
                            }`}
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 64 64"
                        >
                            <path d="M63.981 36.09c0 1.098-.57 1.984-1.271 1.984H48.64c-.705 0-1.273-.887-1.273-1.984c0-1.094.568-1.985 1.273-1.985h14.07c.7-.001 1.27.891 1.27 1.985" />
                            <path d="M48.983 36.827c0-1.098.569-1.986 1.272-1.986h13.433c-.232-.444-.583-.732-.978-.732H48.64c-.705 0-1.273.892-1.273 1.985c0 1.098.568 1.984 1.273 1.984h.634a2.7 2.7 0 0 1-.293-1.251" />
                            <path d="M61.762 21.76c.603.918.616 1.972.026 2.351l-11.803 7.582c-.59.379-1.555-.06-2.157-.978c-.604-.92-.615-1.974-.025-2.353l11.801-7.582c.589-.379 1.554.062 2.158.98" />
                            <path d="M49.586 30.458c-.603-.918-.616-1.974-.026-2.351l11.271-7.243c-.441-.244-.894-.297-1.227-.084l-11.801 7.582c-.59.379-.578 1.433.025 2.353c.603.918 1.567 1.357 2.157.978l.532-.344a2.769 2.769 0 0 1-.931-.891" />
                            <path d="M61.762 50.43c.603-.918.616-1.972.026-2.349l-11.803-7.582c-.59-.382-1.555.057-2.157.978c-.604.918-.615 1.972-.025 2.351l11.801 7.582c.589.379 1.554-.06 2.158-.98" />
                            <path d="M49.586 41.729c-.603.923-.616 1.974-.026 2.354l11.271 7.24c-.441.244-.894.3-1.227.084l-11.801-7.582c-.59-.379-.578-1.433.025-2.351c.603-.921 1.567-1.359 2.157-.978l.532.341c-.336.19-.669.492-.931.892" />
                            <path d="M40.753 30.556c.612-.554.568-.785.803-1.215c.347-.629.351-1.157.151-1.623c-2.298-1.22-4.294-2.999-5.123-5.491c-.302-.905-.368-2.01-.297-2.958c.053-.727-.328-1.583-.81-2.408c-.178-.215-.393-.41-.602-.608c.335-.39.719-.845.98-1.614c.395-1.118.386-4.052.284-5.287c-.202-2.417-2.657-3.371-5.132-4.165c-.187-.058-.362.159-.506.527c-1.641-.075-3.699.528-4.788.608c-1.208.084-2.397.122-3.582.16c-5.083 1.883-9.909 1.57-14.229 5.963c-2.291 2.331-4.302 4.901-6.511 7.294c.856-.031 1.708-.049 2.599.044c.497.053.284 1.832.146 2.116c-.948 1.946-2.53 3.246-4.136 4.585c4.6 2.666 6.529 7.619 7.948 12.685a21.897 21.897 0 0 1 2.493 1.65c.455 4.54.914 10.508.679 13.705c-.044.417-.095.808-.164 1.132c-.018.097-.066.262-.12.45c-.244.521-.821 1.501-1.224 2.377h24.756c-.423-.712-.951-1.466-1.159-1.896c-.012-.066-.022-.137-.031-.184c-.382-1.581-.677-5.01-.774-6.598c-.015-.009-.049-.022-.066-.029l-.002-.011c2.563.923 3.255 1.26 5.753 1.49c1.92.178 2.113-1.774 2.159-2.02c.359-1.867-.088-3.313.08-4.941c.098-.978 1.087-2.242.734-3.087c-.237-.567-.61-1.102-1.16-1.597c-.293-.262-2.258-.053-2.614-.306c-1.302-.914-.605-.843.246-1.818c1.562-1.254 2.342-1.544 2.794-2.657c.235-.585-.696-1.021-1.022-1.714c-.215-.459.158-1.191.145-1.582c.218-.199 1.08-.771 1.302-.975" />
                        </svg>
                    </li>
                    <li
                        className="rounded-sm px-[10px] flex items-center justify-center flex-1 my-[10px] cursor-pointer hover:opacity-40 border-r"
                        onClick={() => setSelectedTab("Listening")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-8 h-8 fill-white transition-all duration-200 ${
                                selectedTab === "Listening" ? "scale-150" : ""
                            }`}
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 48 48"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.978 23.317a6.775 6.775 0 1 1 12.75 4.267c-.987 3.112-5.153 5.32-5.873 9.154s-7.818 4.031-7.395-1.44"
                            />
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M27.17 24.529s.512-3.61-2.815-3.61s-2.772 5.878-5.879 5.878"
                            />
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.845 30.604s-1.155.186-1.155 2.001s3.906 1.65 3.906-1.156s-3.166-4.237-1.494-7.082m2.863-11.37a11.002 11.002 0 0 1 11.002 11.002"
                            />
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M23.965 7.602a16.397 16.397 0 0 1 16.397 16.397"
                            />
                            <circle
                                cx="24"
                                cy="24"
                                r="21.5"
                                fill="none"
                                stroke="white"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </li>
                    <li
                        className="rounded-sm px-[10px] flex items-center justify-center flex-1 my-[10px] cursor-pointer hover:opacity-40 border-r"
                        onClick={() => setSelectedTab("Reading")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-8 h-8 fill-white transition-all duration-200 ${
                                selectedTab === "Reading" ? "scale-150" : ""
                            }`}
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 48 48"
                        >
                            <path
                                fill="white"
                                d="M40 40c-6.9 0-16 4-16 4V22s9-4 18-4l-2 22z"
                            />
                            <path
                                fill="white"
                                d="M8 40c6.9 0 16 4 16 4V22s-9-4-18-4l2 22z"
                            />
                            <g fill="#FFB74D">
                                <circle cx="24" cy="12" r="8" />
                                <path d="M41 32h1c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-1c-1.7 0-3 1.3-3 3s1.3 3 3 3zM7 26H6c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1h1c1.7 0 3-1.3 3-3s-1.3-3-3-3z" />
                            </g>
                        </svg>
                    </li>
                    <li
                        className="rounded-sm px-[10px] flex items-center justify-center flex-1 my-[10px] cursor-pointer hover:opacity-40"
                        onClick={() => setSelectedTab("Writing")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-8 h-8 fill-white transition-all duration-200 ${
                                selectedTab === "Writing" ? "scale-150" : ""
                            }`}
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 64 64"
                        >
                            <path
                                fill="#e6b796"
                                d="M20.6 55c1 1.1 7.9 1 9.1.2c2.5-1.5 19.9-22.4 4.8-28.5c-11.5-4.7-14 5.9-15.2 6.8c-2.3 1.8-.6 19.4 1.3 21.5"
                            />
                            <g fill="#ffe1bd">
                                <path d="M57.6 54.3c-17.4.1-8.9 2.6-22.8 2.6c-5.5 0-10.2-3.6-10.2-8.6v-.1c8.6-5.7-5.8-3.2-3.6-16.7c.7-4.5 5.5-4.8 11.8-5.4c5.3-.5 23.2 6.3 23.2 6.3c6.4 2.3 8.8 21.9 1.6 21.9" />
                                <path d="M20.1 23.2c2.8-1.9 16 3.2 16 3.2L28 46.8S-.6 46 8.7 38.2c7.8-6.5 7.5-12.3 11.4-15" />
                            </g>
                            <g fill="#e6b796">
                                <path d="M7.8 39.1c-2.2 5.5 17.9 6.4 20.6 6.5l-.5 1.2S1.5 46 7.8 39.1m19.8-4c3.4 5.2 4.9 6.3 4.9 6.3s-3.4-.8-5.7-4.2l.8-2.1" />
                                <path d="M27.4 34c1.5 0 0 7.3 1.7 9.3c-.4 1.3-3 .5-3 .5s.8-9 .7-9.5l.6-.3" />
                                <path d="m19.6 40.5l1.5 1.5s13.7-12.6 17.5-15.1l-4.5-1l-14.5 14.6" />
                            </g>
                            <path
                                fill="#428bc1"
                                d="m8.5 44.5l4.4 4.3l34.7-34.5l-4.4-4.3z"
                            />
                            <path
                                fill="#574137"
                                d="m43.9 10.8l2.9 2.8l3.8-3.7L47.7 7zm-6.1 3.3l5.6 5.5l1-.9l-5.6-5.6zm-9 7.4l.8.7l9.2-9.1l-.8-.7z"
                            />
                            <path
                                fill="#a9b5ae"
                                d="m12.9 48.8l-9.8 5.4l5.4-9.7z"
                            />
                            <path fill="#574137" d="m2 54.6l.7.7l2-2l-.7-.7z" />
                            <path
                                fill="#ffe1bd"
                                d="M39.4 51.4c.2-.6.3-1.1.4-1.7c.1-.3.2-.6.3-1c1-4.3-15.3-7.1-15.3-7.1l-1.2-.3c-2.6-.6-8.3-1.3-12.5 3.5c-2.9 3.4.1 6.8 2.8 7c7.3.7 12.7 2.5 16.8 4.2c3.6 1.7 7.2-.2 8.7-4.6"
                            />
                            <path
                                fill="#e6b796"
                                d="M23.5 42.9c-2.6-.9-6.8-3.2-12.2 1.6c5-6.1 13.1-3 13.4-2.9c7.6 1 12.6-2 12.6-2c-1.5 3.8-10 4.6-13.8 3.3m11.8 12.7c13.9 0 5.5-2.5 22.8-2.6c1.5 0 2.7-1.5 3.4-2.9c-.5 2.7-2 4.2-3.9 4.2c-17.4.1-9 2.7-22.9 2.7c-5.5 0-10.7-2.8-15.1-4.2c-.1-.1 10.5 2.8 15.7 2.8"
                            />
                        </svg>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
