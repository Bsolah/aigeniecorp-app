import { MenuItem } from "src/layouts/full/vertical/sidebar/Sidebaritems";
import { FolderType } from "src/types/apps/repository";

export enum DocType {
    FILE = "file",
    FOLDER = "folder",
}

const folderTree: MenuItem = {
    name: "",
    children: [],
    id: "",
    type: DocType.FOLDER,
    icon: "flat-color-icons:opened-folder",
    url: "/id/repository"
}

export const structureFolder = (rawFolder: FolderType) => {

    folderTree.name = rawFolder.name;
    folderTree.id = rawFolder.id;

    const articleArr = rawFolder?.articles?.map((item: any) => ({ ...item, type: DocType.FOLDER, name: item.title, id: item.id, icon: 'flat-color-icons:file', url: `${folderTree.url}/${item["_id"]}` }));
    const childrenArr = rawFolder?.child?.map(item => ({ ...item, icon: "flat-color-icons:opened-folder", id: item.id, }));

    console.log("ds ", rawFolder.child)
    console.log({ childrenArr })

    folderTree.children = [...childrenArr, ...articleArr];

    return folderTree;
} 