import React from "react";
import { format, differenceInDays, formatDistanceToNow } from "date-fns";

const MangaComponent = ({ name, chapters, coverImg, dates }) => {

    const getDate = (releaseDate) => {
        if (!releaseDate) return "";
        const release = new Date(releaseDate);
        const inDays = differenceInDays(new Date(), release);
        const getDateDiff = formatDistanceToNow(release, { addSuffix: true });
        return inDays > 7 ? format(release, "d MMM yyyy") : getDateDiff;
    };

    return (
        <div>
            <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-300 hover:-translate-y-1 group">

                <div className="relative bg-gradient-to-b from-gray-50 to-gray-100">
                    <img
                        src={coverImg || "https://picsum.photos/400/250?random=1"}
                        alt={name}
                        className="w-full h-56 object-contain transition duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="p-5 space-y-4">

                    <div className="relative group">
                        <h3 className="text-md font-bold text-black tracking-tight truncate cursor-default">
                            {name}
                        </h3>
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3
                            opacity-0 group-hover:opacity-100 transition-all duration-300
                            bg-black text-white text-xs px-3 py-2 rounded-lg shadow-xl
                            whitespace-nowrap z-20 pointer-events-none">
                            {name}
                        </div>
                    </div>

                    <div className="h-[1px] bg-gray-300"></div>

                    <div className="flex justify-between items-start gap-4 flex-wrap">
                        {chapters[0] >= 2 ? (
                            <>
                                <div>
                                    <p className="text-gray-900 font-semibold text-sm">Ch {chapters[0]}</p>
                                    <p className="text-gray-500 text-sm">Ch {chapters[1]}</p>
                                </div>
                                <div className="text-right text-gray-400 text-xs space-y-2">
                                    <p>{getDate(dates[0])}</p>
                                    <p>{getDate(dates[1])}</p>
                                </div>
                            </>
                        ) : chapters[0] === 1 ? (
                            <>
                                <div>
                                    <p className="text-gray-900 font-semibold text-sm">Ch 1</p>
                                    <p className="text-gray-500 text-sm">Start reading</p>
                                </div>
                                <div className="text-right text-gray-400 text-xs space-y-2">
                                    <p>{getDate(dates[0])}</p>
                                    <p>New series</p>
                                </div>
                            </>
                        ) : (
                            <div >
                                <p className="text-gray-900 font-semibold text-sm">No Chapters Yet</p>
                                <p className="text-gray-500 text-sm">Coming soon</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MangaComponent;
