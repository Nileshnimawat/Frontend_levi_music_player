import { useState, useEffect } from "react";
import { Navbar, Sidebar, RightSideBar, MusicPlayer } from "@/utils/lib";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";



const MainLayout = ({ children }) => {
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  

  useEffect(() => {
    if (window.innerWidth <= 800) {
      setIsOpen(false);
      setIsRightOpen(false);
    }

     if(window.innerWidth <= 1500){
      setIsRightOpen(false)
     }
  }, []);

  

  return (
    <div className="flex flex-col h-screen hide-scrollbar bg-[#121212]">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-grow  "
      >
      
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
       
          
        <ResizablePanel minSize={65} maxSize={100} >
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="h-full overflow-y-auto hide-scrollbar px-2 sm:px-4 ">
            {children}
          </div>
        </ResizablePanel>

        {window.innerWidth > 200 && <ResizableHandle className={"bg-gray-500 w-1 "} />}

       {window.innerWidth > 200 && <ResizablePanel defaultSize={30} maxSize={40}>
          <div className="bg-[#212121] ">
          <RightSideBar isOpen={isRightOpen} setIsOpen={setIsRightOpen} className="" />
         </div>
        </ResizablePanel>}
      </ResizablePanelGroup>

      <MusicPlayer />
    </div>
  );
};

export default MainLayout;
