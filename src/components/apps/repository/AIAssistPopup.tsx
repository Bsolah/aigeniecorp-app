
import {
  Textarea,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { askAI } from "src/redux/slices/aiSlice";
import { AppDispatch } from "src/redux/store";


export const AIAssistPopup = ({ isOpen, setIsOpen }: any) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fullSizeImage, setFullSizeImage] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const [isFullSize, setIsFullSize] = useState<any>(null);
  const [newQuery, setNewQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea: any = textareaRef.current;
    if (textarea && textarea.style) {
      // Reset height to auto before calculating scrollHeight
      textarea.style.height = 'auto';
      // Set the height to match scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // console.log('vc ', selectedFile)

  const handleFileChange = (event: any) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setSelectedFile(uploadedFile);

      // Check if the uploaded file is an image
      if (uploadedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          setFullSizeImage(reader.result);
        };
        reader.readAsDataURL(uploadedFile);
      }

      else {
        setPreview(null);
        setFullSizeImage(null);
      }
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    setIsFullSize(null);
  };

  // console.log({ newQuery })

  const writeWithAI = () => {
    dispatch(askAI({query: newQuery, file: selectedFile}))
  }

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md"
              >
                <DialogTitle className="text-lg font-semibold text-ld">
                  What do you need help with?
                </DialogTitle>

                <Textarea
                  placeholder="Start typing..."
                  ref={textareaRef}
                  onInput={handleInput}
                  value={newQuery}
                  onChange={(e: any) => setNewQuery(e.target.value)}
                  style={{
                    minHeight: '50px', // Initial height
                    height: 'auto',    // Dynamic height
                    width: "100%"
                  }}
                  className="mb-2 p-2 border-none bg-transparent focus:ring-0 outline-none text-gray-600 placeholder-gray-300 resize-none overflow-hidden"
                />
                {preview && (
                  <div className="relative mt-2">
                    <img src={preview} alt="Preview" onClick={() => setIsFullSize(true)} // Click to open full size
                      className="w-12 h-12 object-cover rounded cursor-pointer" />
                    <button
                      onClick={handleRemove}
                      className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-error text-white text-xs rounded-full shadow-lg hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {isFullSize && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
                    {/* Full-size image */}
                    <img
                      src={fullSizeImage}
                      alt="Full Size"
                      className="max-w-full max-h-full cursor-pointer"
                      onClick={() => setIsFullSize(false)} // Click to close
                    />
                    {/* Close button */}
                    <button
                      onClick={() => setIsFullSize(false)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white text-black text-lg rounded-full shadow-lg hover:bg-gray-300"
                    >
                      ✕
                    </button>
                  </div>
                )}
                <div className="flex justify-end gap-3 mt-5">
                  <div className="flex gap-3 items-center">
                    <div className="btn-circle-hover cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        id="file-input-file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-input-file" className="cursor-pointer">
                        <Icon icon="solar:paperclip-outline" height="20" />
                      </label>
                    </div>
                    <div className="btn-circle-hover cursor-pointer ">
                      <Icon icon="solar:plain-linear"
                        height="20"
                        onClick={() => { writeWithAI(); setIsOpen(false); }}
                      />
                    </div>


                  </div>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};
