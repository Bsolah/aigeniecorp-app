
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
  
  console.log({newQuery})
  
  const writeWithAI = () => {
    dispatch(askAI(newQuery))
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
                  <div className="flex justify-end gap-3 mt-5">
                    <div className="flex gap-3 items-center">
                                <div className="btn-circle-hover cursor-pointer ">
                                  <Icon icon="solar:plain-linear"
                                    height="20"
                                    onClick={() => { writeWithAI(); setIsOpen(false);}}
                                  />
                                </div>
                                <div className="btn-circle-hover cursor-pointer">
                                  <Icon icon="solar:gallery-add-linear" height="20" />
                                </div>
                                <div className="btn-circle-hover cursor-pointer">
                                  <Icon icon="solar:paperclip-outline" height="20" />
                                </div>
                                <div className="btn-circle-hover cursor-pointer">
                                  <Icon icon="solar:microphone-2-outline" height="20" />
                                </div>
                              </div>
                    {/* <button onClick={() => setIsOpen(false)} className="ui-button-small px-6 bg-lighterror">Cancel</button> */}
                    {/* <button onClick={() => { writeWithAI(); setIsOpen(false);}} className="ui-button-small px-6 bg-primary">Assist</button> */}
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    );
  };
  