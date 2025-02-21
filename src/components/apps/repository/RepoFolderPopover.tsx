
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    PopoverBackdrop,
} from "@headlessui/react";

const RepoFolderPopover = ({ children }: any): any => {
    // const [isOpen, setIsOpen] = useState(false);


    return (

        <div className="flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm w-full flex justify-center">
            <Popover className="relative ">
                <PopoverButton
                    // onMouseEnter={() => setIsOpen(true)}
                    // onMouseLeave={() => setIsOpen(false)}
                    className="block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white">
                    {children}
                </PopoverButton>
                <PopoverBackdrop className="fixed inset-0 bg-black/15 z-50" />

                {/* <Transition
                    as={Fragment}
                    show={isOpen} // Control popover visibility manually
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel
                        className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-lg p-3 border text-sm"
                        onMouseEnter={() => setIsOpen(true)} // Keep it open when hovering over the panel
                        onMouseLeave={() => setIsOpen(false)} // Close when the mouse leaves
                    >
                        <div className="flex flex-col gap-1">
                            <a href="/analytics" className="ui-dropdown-item">
                                Analytics
                            </a>
                            <a href="/engagement" className="ui-dropdown-item">
                                Engagement
                            </a>
                            <a href="/security" className="ui-dropdown-item">
                                Security
                            </a>
                            <a href="/integrations" className="ui-dropdown-item">
                                Integrations
                            </a>
                        </div>        </Popover.Panel>
                </Transition> */}

                <PopoverPanel
                    transition
                    anchor="bottom"
                    className="w-52 z-[60] py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                >
                    <div className="flex flex-col gap-1">
                        <a href="/analytics" className="ui-dropdown-item">
                            Analytics
                        </a>
                        <a href="/engagement" className="ui-dropdown-item">
                            Engagement
                        </a>
                        <a href="/security" className="ui-dropdown-item">
                            Security
                        </a>
                        <a href="/integrations" className="ui-dropdown-item">
                            Integrations
                        </a>
                    </div>
                </PopoverPanel>
            </Popover>
        </div>)
}

export default RepoFolderPopover;
