
export const Avatar = ({name, sizeType}: {name: string, sizeType: string}) => {

    return (
        <>
        {sizeType === "small" ? (
        <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-800 rounded-full">
            <span className="text-md font-light text-gray-200">{name[0]}</span>
        </div>
        ) : (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-800 rounded-full">
            <span className="text-md font-light text-gray-200">{name[0]}</span>
        </div>
        )
        }
        </>
    )

}