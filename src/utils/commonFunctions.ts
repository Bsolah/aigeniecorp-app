
export enum DocType {
    FILE = "file",
    FOLDER = "folder",
}


// export const structureFolder = (rawFolder: FolderType) => {

//     // console.log('raw folder ', rawFolder)

//     folderTree.name = rawFolder?.name || "";
//     folderTree.id = rawFolder?.id || rawFolder?._id || "";

//     const articleArr = rawFolder?.articles?.map((item: any) => ({ ...item, type: DocType.FILE, name: item?.name, id: item?._id, icon: 'flat-color-icons:file', url: `${folderTree.url}/${item["_id"]}` }));
//     const childrenArr = rawFolder?.child?.map(item => ({ ...item, icon: "flat-color-icons:opened-folder", id: item?.id, url: `${folderTree.url}`, children: item?.child }));

//     // console.log("ds ", rawFolder.child)

//     folderTree.children = [...childrenArr, ...articleArr];
//     // console.log({ folderTree })

//     return folderTree;
// }

export const structureFolder = (rawFolder: any, parentId: any = '123'): any => {
    if (!rawFolder) return {} as any;

    const isFolder = rawFolder?.type !== "file";

    return {
        name: rawFolder?.name || "",
        id: rawFolder?.id || "",
        parentId: parentId,
        icon: isFolder ? "tabler:folder-open" : "tabler:file",
        url: `/id/repository/${rawFolder?.id}`,
        ...(isFolder && {
            children: [...(rawFolder?.children?.map((item: any) => structureFolder(item, rawFolder?.id)) || [])]
        })
    };
};

export const findKeyAndUpdate = (arr: any, newObj: any): any => {

    arr.children.map((item: any) => {
        if (item.id === newObj.id) {
            item['children'] = newObj.children
        } else {
            if (item?.children?.length > 0) {
                findKeyAndUpdate(item, newObj);
            }
        }
    })

    return arr;
    // for (const item of arr.children) {
    //     if (typeof item === 'object' && item !== null) {
    //         if (item.id === newObj.id) {
    //             console.log('I entred here ')
    //             item['children'] = newObj.children;
    //             return item; // Found the key, return its value
    //         }

    //         // If the item has children (array or object), recurse
    //         for (const value of Object.values(item)) {
    //             if (Array.isArray(value)) {
    //                 const result = findKeyAndUpdate(value, newObj);
    //                 if (result !== undefined) {
    //                     return result;
    //                 }
    //             }
    //         }
    //     }
    // }
    // return arr; // Key not found
}


// export const structureFolder = (rawFolder: FolderType): MenuItem => {
//     if (!rawFolder) return {} as FolderType;

//     return {
//         name: rawFolder?.name || "",
//         id: rawFolder?.id || rawFolder?._id || "",
//         icon: "tabler:folder-open",
//         url:  "",


//         children: [
//             // Recursively process child folders
//             ...(rawFolder?.child?.map(item => structureFolder(item)) || []),

//             // Process articles
//             ...(rawFolder?.articles?.map((item: any) => ({
//                 ...item,
//                 type: DocType.FILE,
//                 name: item?.name,
//                 id: item?._id,
//                 icon: "tabler:file",
//                 url: `/id/repository/${item["_id"]}`
//             })) || []),
//         ]
//     };
// };

export const formatChatMessage: any = (text: string) => {

    // Master regex patterns
  const patterns = [
    { regex: /\*\*(.*?)\*\*/g, replacement: '<b>$1</b>' }, // **bold**
    { regex: /\*(.*?)\*/g, replacement: '<i>$1</i>' }, // *italic*
    { regex: /__(.*?)__/g, replacement: '<u>$1</u>' }, // __underline__
    { regex: /~~(.*?)~~/g, replacement: '<s>$1</s>' }, // ~~strikethrough~~
    { regex: /`(.*?)`/g, replacement: '<code>$1</code>' }, // `inline code`
    { regex: /```([\s\S]*?)```/g, replacement: '<pre><code>$1</code></pre>' }, // ```code block```
    { regex: /\[(.*?)\]\((.*?)\)/g, replacement: '<a href="$2" target="_blank">$1</a>' }, // [link](url)
    { regex: /(^|\s)(https?:\/\/[^\s]+)/g, replacement: '$1<a href="$2" target="_blank">$2</a>' }, // auto-link URLs
    { regex: /:(\w+):/g, replacement: '<span class="emoji">:$1:</span>' }, // :emoji:
    { regex: /\n/g, replacement: '<br>' }, // new lines
    { 
      regex: /\|(.+?)\|/g, 
      replacement: (match: any) => {
        const rows = match.split('\n').map((row : any) => 
          `<tr>${row.split('|').filter(Boolean).map((cell: any) => `<td>${cell.trim()}</td>`).join('')}</tr>`
        ).join('');
        return `<table>${rows}</table>`;
      } 
    } // simple markdown-style tables
  ];

  // Apply all patterns
  return patterns.reduce((text, { regex, replacement }: any) => {
    return text.replace(regex, replacement);
  }, text);
}