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
    icon: "ri:home-office-fill",
    url: "/id/repository"
}

export const structureFolder = (rawFolder: FolderType) => {

    console.log('raw folder ', rawFolder)

    folderTree.name = rawFolder?.name || "";
    folderTree.id = rawFolder?.id || "";

    const articleArr = rawFolder?.articles?.map((item: any) => ({ ...item, type: DocType.FILE, name: item?.title, id: item?._id, icon: 'flat-color-icons:file', url: `${folderTree.url}/${item["_id"]}` }));
    const childrenArr = rawFolder?.child?.map(item => ({ ...item, icon: "flat-color-icons:opened-folder", id: item?.id, url: `${folderTree.url}`, children: item?.child }));

    // console.log("ds ", rawFolder.child)

    folderTree.children = [...childrenArr, ...articleArr];
    // console.log({ folderTree })

    return folderTree;
}


export const formatChatMessage = (text: string) => {

    console.log('text ', text)
    if (text.includes("Private Data Detected:")) {
        return text
            .replace("Private Data Detected:", `<strong>Private Data Detected:</strong> <br>`)
            .replace("CEO’s Name (Jane Doe): Personal data under GDPR (identifies an individual).", `<li><strong>CEO’s Name (Jane Doe):</strong> Personal data under GDPR (identifies an individual).</li>`)
            .replace("Revenue ($2.5M): Confidential business data (not personal data, but sensitive for competition).", "<li><strong>Revenue ($2.5M):</strong> Confidential business data (not personal data, but sensitive for competition).</li>")
            .replace("Discount Code (YC2025): Proprietary business data (could expose internal pricing strategies).", `<li><strong>Discount Code (YC2025):</strong> Proprietary business data (could expose internal pricing strategies).</li> <br>`)
            .replace(/:warning:WARNING:warning:/g, "⚠️ <strong>WARNING</strong> ⚠️")
            .replace(/An IT alert has been triggered\./, "<br><em>An IT alert has been triggered.</em>");

    } else if (text.includes("Subject: Follow-Up & Exclusive Offer for Acme Corp")) {
        return text
            .replace("Subject: Follow-Up & Exclusive Offer for Acme Corp", `<strong>Subject: Follow-Up & Exclusive Offer for Acme Corp:</strong> <br>`)
            .replace("Hi Acme Corp,", `Hi Acme Corp, <br>`)
            .replace("Acme Corp team for this milestone.", "Acme Corp team for this milestone. <br>")
            .replace("best serve your upcoming needs.", `best serve your upcoming needs. <br>`)
            .replace("Looking forward to your thoughts.", `Looking forward to your thoughts. <br>`)
            .replace("Best regards,", `Best regards, <br> <br>`)
            .replace("Kawtar Lahlou", `Kawtar Lahlou<br>`)
    } else {
        return text;
    }
}