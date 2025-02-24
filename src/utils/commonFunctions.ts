
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

    // // Normalize whitespace
    // let formatted = text.replace(/\s+/g, ' ').trim();

    // // Format bullet lists (hyphens or asterisks)
    // formatted = formatted.replace(/^\s*[-*]\s+/gm, '- ');

    // // Format numbered lists (like "1." or "1)")
    // formatted = formatted.replace(/^\s*\d+[.)]\s+/gm, match => `${match.trim()} `);

    // // Add line breaks after sentences (periods followed by a capital letter)
    // formatted = formatted.replace(/(\.)(\s+[A-Z])/g, '$1\n$2');

    // // Bold and Italic formatting (convert **text** to bold and *text* to italic)
    // formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    // formatted = formatted.replace(/\*(.*?)\*/g, '<i>$1</i>');

    // // Format simple markdown-style tables into readable format
    // formatted = formatted.replace(/\|(.+?)\|/g, (match: any) => {
    //     return match
    //         .split('|')
    //         .map((col: any) => col.trim())
    //         .filter((col: any) => col.length > 0)
    //         .join(' | ');
    // });

    // // Add indents for sublists (2 spaces for now, can be customized)
    // formatted = formatted.replace(/^(\s*)([-*]|\d+[.)])/gm, '  $1$2');

    // // Clean up double spaces
    // formatted = formatted.replace(/\s{2,}/g, ' ');

    // return formatted;

    // Split rows by newline
    // const rows = text.split('\n');
    // if (rows && rows.length > 2) {
    // // Create table element
    // const table = document.createElement('table');
    // table.border = '1'; // Optional: adds borders for visibility

    // // Populate table rows
    // rows.forEach((row, index) => {
    //     const tr = document.createElement('tr');
    //     const cells = row.split(',');

    //     cells.forEach(cell => {
    //         const td = document.createElement(index === 0 ? 'th' : 'td'); // Use <th> for the first row (header)
    //         td.textContent = cell.trim();
    //         tr.appendChild(td);
    //     });

    //     table.appendChild(tr);
    // });
    // const outputElement = document?.getElementById('output');
    // // console.log('heere ', outputElement, table)
    // if (outputElement) {
    //     outputElement.appendChild(table);
    // }
    // return outputElement;
    // } else {
    // console.log('text ', text)\
    // return text.replace(/\n/g, "<br>");

    return text.split('\n')
    .filter(line => line.trim() !== '')
    .map(line => {
      const boldMatch = /\*\*(.*?)\*\*/.exec(line);
      const description = line.replace(/\*\*(.*?)\*\*/, '').trim();
      if (boldMatch) {
        return `<li><strong>${boldMatch[1]}</strong>: ${description}</li>`;
      }
      return `<li>${line.trim()}</li>`;
    })
    .join('\n');
    // }

    // if (text.includes("Private Data Detected:")) {
    //     return text
    //         .replace("Private Data Detected:", `<strong>Private Data Detected:</strong> <br>`)
    //         .replace("CEO’s Name (Jane Doe): Personal data under GDPR (identifies an individual).", `<li><strong>CEO’s Name (Jane Doe):</strong> Personal data under GDPR (identifies an individual).</li>`)
    //         .replace("Revenue ($2.5M): Confidential business data (not personal data, but sensitive for competition).", "<li><strong>Revenue ($2.5M):</strong> Confidential business data (not personal data, but sensitive for competition).</li>")
    //         .replace("Discount Code (YC2025): Proprietary business data (could expose internal pricing strategies).", `<li><strong>Discount Code (YC2025):</strong> Proprietary business data (could expose internal pricing strategies).</li> <br>`)
    //         .replace(/:warning:WARNING:warning:/g, "⚠️ <strong>WARNING</strong> ⚠️")
    //         .replace(/An IT alert has been triggered\./, "<br><em>An IT alert has been triggered.</em>");

    // } else if (text.includes("Subject: Follow-Up & Exclusive Offer for Acme Corp")) {
    //     return text
    //         .replace("Subject: Follow-Up & Exclusive Offer for Acme Corp", `<strong>Subject: Follow-Up & Exclusive Offer for Acme Corp:</strong> <br>`)
    //         .replace("Hi Acme Corp,", `Hi, <br>`)
    //         .replace("Acme Corp team for this milestone.", "Acme Corp team for this milestone. <br>")
    //         .replace("best serve your upcoming needs.", `best serve your upcoming needs. <br>`)
    //         .replace("Looking forward to your thoughts.", `Looking forward to your thoughts. <br>`)
    //         .replace("Best regards,", `Best regards, <br> <br>`)
    //         .replace("Kawtar Lahlou", `Kawtar Lahlou<br>`)
    // } else if (text.includes("There appears to be a discrepancy in your knowledge base")) {
    //     return text
    //         .replace(":warning: There appears to be a discrepancy in your knowledge base.", `⚠️ <strong>There appears to be a discrepancy in your knowledge base.</strong> <br> <br>`)
    //         .replace("cash transactions is $10,000,", `cash transactions is <strong>$10,000</strong>`)
    //         .replace("Bank Secrecy Act (BSA).", `<strong>Bank Secrecy Act (BSA).</strong> <br><br>`)
    //         .replace("This applies to two primary scenarios:", "This applies to two primary scenarios: <br>")
    //         .replace(`      Financial Institutions under which your "Test Company" falls: Banks and other financial entities must file a Currency Transaction Report (CTR) with the Financial Crimes Enforcement Network (FinCEN) for cash transactions exceeding $10,000 in a single business day.
    //   Source: FinCEN CTR Requirements.`,
    //             `<li><strong>Financial Institutions under which your "Test Company" falls: </strong> Banks and other financial entities must file a <strong>Currency Transaction Report (CTR)</strong> with the Financial Crimes Enforcement Network (FinCEN) for cash transactions exceeding $10,000 in a single business day. Source: <span> <a> FinCEN CTR Requirements. </a></span></li>`)
    //         .replace(`      Businesses (Non-Financial Sectors): Businesses (e.g., retailers, car dealers) receiving cash payments over $10,000 must file IRS Form 8300.
    //   Source: IRS Form 8300 Guidance.`,
    //             `<li><strong>Businesses (Non-Financial Sectors):</strong> Businesses (e.g., retailers, car dealers) receiving cash payments over $10,000 must file <strong>IRS Form 8300.</strong> Source: <span> <a> IRS Form 8300 Guidance. </a> </span> </li><br>`)
    //         .replace("Please refer to the audit trail below that you can extract:", `<i>Please refer to the audit trail below that you can extract:<i><br>`)
    //         .replace(`V1. Created by "John Dow" 17.02.2020 and approved by "Alicia Johnson"  01.02.2020`, `<li><i>V1. Created by "John Dow" 17.02.2020 and approved by "Alicia Johnson"  01.02.2020</i></li>`)
    //         .replace(`V2. Updated by "Alex Thompson "20.12.2024" and approved by "Chloe Warren" 20.12.2024`, `<li><i>V2. Updated by "Alex Thompson "20.12.2024" and approved by "Chloe Warren" 20.12.2024</i></li>`)
    // } else {
    //     return text;
    // }
}