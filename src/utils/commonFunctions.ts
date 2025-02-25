
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
            regex: /^(#{1,6})\s*(.*?)$/gm, replacement: (match: any, p1: any, p2: any) => {
                const level = p1.length; // heading level based on number of `#`
                return `<h${level}>${p2}</h${level}>`;
            }
        }, // # heading #
        { regex: /- (.*?)(?=\n)/g, replacement: '<ul><li>$1</li></ul>' }, // bullet list (- item)
        { regex: /\d+\.(.*?)\n/g, replacement: '<ol><li>$1</li></ol>' }, // numbered list (1. item)
        { regex: /\~\~(.*?)\~\~/g, replacement: '<mark>$1</mark>' }, // ~~highlighted~~
        {
            regex: /<(\w+)\>(.*?)<\/\1>/g, replacement: (match: any, p1: any, p2: any) => {
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