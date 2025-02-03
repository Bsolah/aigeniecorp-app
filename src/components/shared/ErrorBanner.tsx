import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";

const ErrorBanner = ({ information, action }: any) => {

    return <Banner>
        <div className="flex w-full justify-between border-b border-red-200 bg-red-100 p-4 dark:border-red-600 dark:bg-red-700 rounded-md">
            <div className="mx-auto flex items-center">
                <p className="flex items-center text-sm font-normal text-red-500 dark:text-red-400">
                    <MdAnnouncement className="mr-4 h-4 w-4" />
                    <span className="[&_p]:inline">
                        {information}
                    </span>
                </p>
            </div>
            <Banner.CollapseButton
                onClick={action}
                color="red"
                className="border-0 bg-transparent text-red-500 dark:text-red-400"
            >
                <HiX className="h-4 w-4" />
            </Banner.CollapseButton>
        </div>
    </Banner>
}

export default ErrorBanner;