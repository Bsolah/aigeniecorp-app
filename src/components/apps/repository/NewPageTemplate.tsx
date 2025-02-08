import { Card } from 'flowbite-react';
import { Icon } from '@iconify/react/dist/iconify.js';

export const NewPageTemplate = ({ isOpen, setIsOpen }: any) => {
  // const [isOpen, setIsOpen] = useState(false);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Open Popup
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Choose an option:</h2>
            <div className="grid grid-cols-3 gap-2">
              <Card onClick={() => setIsOpen(false)}
                className="cursor-pointer p-3 flex flex-col items-center text-center border rounded-xl shadow-sm">
                <Icon icon={"ri:file-fill"} className="w-10 h-10 self-center" />
                {/* <CardContent> */}
                <p className="text-xs font-light mt-2">New Page</p>
                {/* </CardContent> */}
              </Card>
              <Card onClick={() => setIsOpen(false)}
                className="cursor-pointer p-3 flex flex-col items-center text-center border rounded-xl shadow-sm">
                <Icon icon={"ri:file-list-3-line"} className="w-10 h-10 self-center" />
                {/* <CardContent> */}
                <p className="text-xs font-light mt-2">Template</p>
                {/* </CardContent> */}
              </Card>
               <Card onClick={() => setIsOpen(false)}
                className="cursor-pointer p-3 flex flex-col items-center text-center border rounded-xl shadow-sm">
                <Icon icon={"ri:import-fill"} className="w-10 h-10 self-center" />
                {/* <CardContent> */}
                <p className="text-xs font-light mt-2">Import</p>
                {/* </CardContent> */}
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
