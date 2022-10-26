import React from "react";
import { Lightbox } from "react-modal-image";
import { useState } from "react";
import { BASE_URL } from "../services/api";

const HomeCard = ({ homework, category }) => {
    const [open, setOpen] = useState(false);
    const [imageToShow, setImageToShow] = useState("");

    const handleImagePopup = (e) => {
        const url = e.target.src;
        setImageToShow(url);
        setOpen(true);
    };
    return (
        <>
            <div className="w-full min-h-[130px] border p-[10px] border-gray-200 rounded-md">
                <h2 className="text-center font-semibold text-[18px] border-b pb-[10px]">
                    {category}
                </h2>
                {homework.image_url && (
                    <img
                        onClick={handleImagePopup}
                        src={BASE_URL + homework.image_url}
                        alt=""
                        className="max-h-[100px] h-full w-full object-cover mt-[10px] cursor-pointer"
                    />
                )}
                <p className="p-[10px] text-[14px]">{homework.topic}</p>
            </div>
            {open && (
                <Lightbox
                    large={imageToShow}
                    onClose={() => {
                        setOpen(false);
                        setImageToShow("");
                    }}
                    hideDownload
                    hideZoom
                />
            )}
        </>
    );
};

export default HomeCard;
