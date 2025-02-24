import { Popover } from "flowbite-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import dispatch from "src/redux/store";
import { createArticle } from "src/redux/slices/articleSlice";
import { createFolder } from "src/redux/slices/folderSlice";
import { useSelector } from "react-redux";

const customPopoverTheme: any = {
  base: "rounded-sm bg-white shadow-lg",
  content: "",
};



const AddPopover = ({ children, parentId }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const orgId = user.organizations[0]._id

  const handleNewPage = (e: any) => {
    e.preventDefault();
    dispatch(createArticle({ parent: parentId }))
  }

  const handleNewFolder = (e: any) => {
    e.preventDefault();
    dispatch(createFolder({ parent: parentId, orgId: orgId }))
  }

  return (<Popover
    children={children}
    trigger="click"
    theme={customPopoverTheme}
    placement="right-start"
    content={<div className="w-35 pt-4">
      <div className="mb-1 flex flex-col items-start text-xs">
        <div className="flex gap-2 px-4 py-2 hover:bg-gray-200" onClick={handleNewPage}  ><Icon className="ml-auto" icon='solar:document-text-outline' height={18} />New Page</div>
        {/* <div className="flex flex-row gap-2 px-4 py-2 hover:bg-gray-200">
          <input
            type="file"
            className="hidden"
            id="file-input-repo"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileUpload}
          />
          <label htmlFor="file-input-repo" className="flex cursor-pointer gap-2">
            <Icon className="ml-auto" icon='solar:paperclip-outline' height={18} />Import File
          </label>
        </div> */}
        <div className="w-full border-t border-dark-900 my-1"></div>
        <div className="flex gap-2 px-4 py-2 hover:bg-gray-200" onClick={handleNewFolder}><Icon className="ml-auto" icon='tabler:folder-open' height={18} /> New Folder</div>

      </div>
    </div>}
  />
  )

}

export default AddPopover;

