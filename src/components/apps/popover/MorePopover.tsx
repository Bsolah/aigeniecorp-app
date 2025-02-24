import { Popover } from "flowbite-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import dispatch from "src/redux/store";
import { deleteArticle } from "src/redux/slices/articleSlice";

const customPopoverTheme: any = {
  base: "rounded-sm bg-white shadow-lg z-[1]",
  content: "",
};

const MorePopover = ({ children, id, parentId, type }: any) => {

  
  const handleDelete = (e: any) => {
    e.preventDefault();

    if(type === 'folder') {
      // dispatch(deleteFolder({id: id, parentId: parentId}))
    } else {
      dispatch(deleteArticle({id: id, parentId: parentId}))
    }
  }

  return (<Popover
    children={children}
    trigger="click"
    theme={customPopoverTheme}
    placement="bottom-start"
    content={<div className="w-35 pt-4">
      <div className="mb-1 flex flex-col items-start text-xs">
        <div className="flex gap-2 px-4 py-2 hover:bg-gray-200 " ><Icon className="ml-auto" icon='tabler:edit' height={18} />Edit</div> 
        <div className="flex gap-2 px-4 py-2 hover:bg-gray-200"><Icon className="ml-auto" icon='bx:rename' height={18} />Rename</div> 
        <div className="w-full border-t border-dark-900 my-1"></div>
        <div className="flex gap-2 px-4 py-2 hover:bg-gray-200" onClick={handleDelete}><Icon className="ml-auto" icon='mi:delete' height={18} /> Delete</div>
        
      </div>
    </div>}
  />
  )

}

export default MorePopover;
