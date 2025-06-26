import { useState, useEffect } from "react";
import {
  Navbar,
  Sidebar,
  RightSideBar,
  MusicPlayer
} from "@/utils/lib";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";

const MainLayout = ({ children }) => {
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 800);
      setIsOpen(width > 800);
      setIsRightOpen(width > 1500 ? true : false);
    };

    handleResize(); // Call once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen hide-scrollbar bg-[#121212]">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <ResizablePanel minSize={65} maxSize={100}>
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="h-full overflow-y-auto hide-scrollbar px-2 sm:px-4">
            {children}
          </div>
        </ResizablePanel>

        {!isMobile && <ResizableHandle className="bg-gray-500 w-1" />}

        {!isMobile && (
          <ResizablePanel
            defaultSize={isMobile ? 45 : 22}
            maxSize={25}
            className="bg-[#212121]"
          >
            <RightSideBar
              isOpen={isRightOpen}
              setIsOpen={setIsRightOpen}
              className=""
            />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>

      <MusicPlayer />
    </div>
  );
};

export default MainLayout;
