
export enum DocType {
    FILE = "file",
    FOLDER = "folder",
}

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
}

export const formatChatMessage: any = (text: string) => {

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
            .replace("Subject: Follow-Up & Exclusive Offer for Acme Corp", `<strong>Subject: Follow-Up & Exclusive Offer for Acme Corp:</strong> <br><br>`)
            .replace("Hi Acme Corp,", `Hi, <br>`)
            .replace("Acme Corp team for this milestone.", "Acme Corp team for this milestone. <br>")
            .replace("best serve your upcoming needs.", `best serve your upcoming needs. <br>`)
            .replace("Looking forward to your thoughts.", `Looking forward to your thoughts. <br>`)
            .replace("Best regards,", `Best regards, <br>`)
            .replace("Kawtar Lahlou", `Jane Doe<br>`)
            .replace("Company Test,", `Company Test,<br>`)
    } else if (text.includes("There appears to be a discrepancy in your knowledge base")) {
        return text
            .replace(":warning: There appears to be a discrepancy in your knowledge base.", `⚠️ <strong>There appears to be a discrepancy in your knowledge base.</strong> <br> <br>`)
            .replace("cash transactions is $10,000,", `cash transactions is <strong>$10,000</strong>`)
            .replace("Bank Secrecy Act (BSA).", `<strong>Bank Secrecy Act (BSA).</strong> <br><br>`)
            .replace("This applies to two primary scenarios:", "This applies to two primary scenarios: <br>")
            .replace(`      Financial Institutions under which your "Test Company" falls: Banks and other financial entities must file a Currency Transaction Report (CTR) with the Financial Crimes Enforcement Network (FinCEN) for cash transactions exceeding $10,000 in a single business day.
      Source: FinCEN CTR Requirements.`,
                `<li><strong>Financial Institutions under which your "Test Company" falls: </strong> Banks and other financial entities must file a <strong>Currency Transaction Report (CTR)</strong> with the Financial Crimes Enforcement Network (FinCEN) for cash transactions exceeding $10,000 in a single business day. Source: <span> <a> FinCEN CTR Requirements. </a></span></li>`)
            .replace(`      Businesses (Non-Financial Sectors): Businesses (e.g., retailers, car dealers) receiving cash payments over $10,000 must file IRS Form 8300.
      Source: IRS Form 8300 Guidance.`,
                `<li><strong>Businesses (Non-Financial Sectors):</strong> Businesses (e.g., retailers, car dealers) receiving cash payments over $10,000 must file <strong>IRS Form 8300.</strong> Source: <span> <a> IRS Form 8300 Guidance. </a> </span> </li><br>`)
            .replace("Please refer to the audit trail below that you can extract:", `<i>Please refer to the audit trail below that you can extract:<i><br>`)
            .replace(`V1. Created by "John Dow" 17.02.2020 and approved by "Alicia Johnson"  01.02.2020`, `<li><i>V1. Created by "John Dow" 17.02.2020 and approved by "Alicia Johnson"  01.02.2020</i></li>`)
            .replace(`V2. Updated by "Alex Thompson "20.12.2024" and approved by "Chloe Warren" 20.12.2024`, `<li><i>V2. Updated by "Alex Thompson "20.12.2024" and approved by "Chloe Warren" 20.12.2024</i></li>`)
    }

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
                const rows = match.split('\n').map((row: any) =>
                    `<tr>${row.split('|').filter(Boolean).map((cell: any) => `<td>${cell.trim()}</td>`).join('')}</tr>`
                ).join('');
                return `<table>${rows}</table>`;
            }
        }, // simple markdown-style tables
        { regex: /(^|\s)(\^)(.*?)\^/g, replacement: '<sup>$3</sup>' }, // ^superscript^
        { regex: /~\~(.*?)\~\~/g, replacement: '<sub>$1</sub>' }, // ~~subscript~~
        {
            regex: /^(#{1,6})\s*(.*?)$/gm, replacement: (_: any, p1: any, p2: any) => {
                const level = p1.length; // heading level based on number of `#`
                return `<h${level}>${p2}</h${level}>`;
            }
        }, // # heading #
        { regex: /- (.*?)(?=\n)/g, replacement: '<ul><li>$1</li></ul>' }, // bullet list (- item)
        { regex: /\d+\.(.*?)\n/g, replacement: '<ol><li>$1</li></ol>' }, // numbered list (1. item)
        { regex: /\~\~(.*?)\~\~/g, replacement: '<mark>$1</mark>' }, // ~~highlighted~~
        {
            regex: /<(\w+)\>(.*?)<\/\1>/g, replacement: (_: any, p1: any, p2: any) => {
                return `<span class="${p1}">${p2}</span>`;
            }
        }, // generic tag parser (for dynamic handling)
        { regex: /\{font:(\w+)\}(.*?)\{\/font\}/g, replacement: '<span style="font-size:$1;">$2</span>' }, // {font: large}text{/font}
        { regex: /==(.+?)==/g, replacement: '<mark>$1</mark>' }, // ==highlighted text==
        { regex: /^>\s*(.*?)$/gm, replacement: '<blockquote>$1</blockquote>' }, // Blockquote: > text
        { regex: /^(?:\s*\*\s*(.*?))$/gm, replacement: '<ul><li>$1</li></ul>' }, // Bullet list using *
        { regex: /\*\*\*(.*?)\*\*\*/g, replacement: '<b><i>$1</i></b>' }, // ***bold and italic***
        { regex: /\n\n/g, replacement: '<p></p>' }, // Double newlines become paragraph tags
        // { regex: /(<([^>]+)>)/ig, replacement: '' }, // Remove any unwanted HTML tags (for extra safety)
        { regex: /\{color:(\w+)\}(.*?)\{\/color\}/g, replacement: '<span style="color:$1;">$2</span>' }, // {color:red}text{/color}
        { regex: /\{bgcolor:(\w+)\}(.*?)\{\/bgcolor\}/g, replacement: '<span style="background-color:$1;">$2</span>' }, // {bgcolor:yellow}text{/bgcolor}
        { regex: /\{fontfamily:(\w+)\}(.*?)\{\/fontfamily\}/g, replacement: '<span style="font-family:$1;">$2</span>' }, // {fontfamily:Arial}text{/fontfamily}
        { regex: /\{style:(.*?)\}(.*?)\{\/style\}/g, replacement: '<span style="$1;">$2</span>' }, // {style:font-weight:bold;color:red;}text{/style}
        { regex: /---+/g, replacement: '<hr>' }, // Horizontal line: ---
        { regex: /___+/g, replacement: '<hr>' }, // Horizontal line: ___
        { regex: /--(.*?)--/g, replacement: '<s>$1</s>' }, // --strikethrough with dashes--
        { regex: /\*\*\*\*(.*?)\*\*\*\*/g, replacement: '<b><i><u>$1</u></i></b>' }, // ***__bold, italic, and underline__***
        { regex: /\$\$(.*?)\$\$/g, replacement: '<math>$1</math>' }, // $$math$$ (LaTeX-style)
        { regex: /\\([*|_~`\-{}])/g, replacement: '$1' }, // Escape characters (\* -> *)      
    ];

    // Apply all patterns
    return patterns.reduce((text, { regex, replacement }: any) => {
        return text.replace(regex, replacement);
    }, text);
}