import { Card } from 'flowbite-react';
import { FileText, FileSpreadsheet, FileSliders } from "lucide-react";
import { mockFiles } from "../../../api/google/googleData";
import { Icon } from '@iconify/react/dist/iconify.js';

const fileCategories: { [key: string]: { icon: JSX.Element; type: string } } = {
  "Docs": { icon: <FileText className="w-6 h-6 text-blue-500" />, type: "application/vnd.google-apps.document" },
  "Sheets": { icon: <FileSpreadsheet className="w-6 h-6 text-green-500" />, type: "application/vnd.google-apps.spreadsheet" },
  "Slides": { icon: <FileSliders className="w-6 h-6 text-yellow-500" />, type: "application/vnd.google-apps.presentation" }
};

interface File {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink: string;
}


export default function ViewGoogleDrive() {
  const categorizedFiles = Object.keys(fileCategories).reduce((acc: { [key: string]: File[] }, category) => {
    acc[category] = mockFiles.filter((file: any) => file.mimeType === fileCategories[category].type);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Google Drive Files</h1>
      <div className="grid gap-6">
        {Object.entries(categorizedFiles).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
              {fileCategories[category].icon} {category}
            </h2>
            <div className="grid grid-cols-10 gap-2 minh-50">
              {items.map(file => (
                <Card key={file.id} className="p-3 flex flex-col items-center text-center border rounded-xl shadow-sm">
                  <Icon icon={"ri:google-fill"} className="w-6 h-6 self-center" />
                  {/* <CardContent> */}
                    <p className="text-xs font-light mt-2">{file.name}</p>
                  {/* </CardContent> */}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
