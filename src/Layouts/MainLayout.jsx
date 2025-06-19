import { useState } from "react";
import { Navbar, Sidebar, 
  RightSideBar, MusicPlayer
 } from "@/utils/lib";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

const MainLayout = ({ children }) => {
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen hide-scrollbar">
     <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <ResizablePanelGroup direction="horizontal" className="flex-grow bg-black">
      
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
       


        <ResizablePanel defaultSize={100} minSize={40}>
          <div className="h-full overflow-y-auto">{children}</div>
        </ResizablePanel>

        <ResizableHandle  className={"bg-gray-500 w-1"}/>

        <ResizablePanel defaultSize={0}  maxSize={30}>
          <RightSideBar isOpen={isRightOpen} setIsOpen={setIsRightOpen} />
        </ResizablePanel>
      </ResizablePanelGroup>

      <MusicPlayer/>
    </div>
  );
};

export default MainLayout;
