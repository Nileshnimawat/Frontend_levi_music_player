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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 800);
      setIsOpen(width > 800);
      if (window.innerWidth <= 1000) {
        setIsRightOpen(false);
      }
    };

    handleResize(); // Call once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScreen = () => {
    if (window.innerWidth <= 800) {
      return 0;
    } else return 22;
  };
  const handleMaxScreen = () => {
    if (window.innerWidth <= 800) {
      return 55;
    } else return 25;
  };

  return (
    <div className="flex flex-col h-screen hide-scrollbar bg-[#121212]">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <ResizablePanel minSize={!isMobile ? 65 : 60} maxSize={100}>
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="h-full overflow-y-auto hide-scrollbar px-2 sm:px-4">
            {children}
          </div>
        </ResizablePanel>

        {<ResizableHandle className="bg-gray-500 w-1" />}

        { 
          <ResizablePanel
            defaultSize={handleScreen()}
            maxSize={handleMaxScreen()}
            className="bg-[#212121]"
          >
            <RightSideBar
              isOpen={isRightOpen}
              setIsOpen={setIsRightOpen}
              className=""
            />
          </ResizablePanel>
        }
      </ResizablePanelGroup>

      <MusicPlayer />
    </div>
  );
};

export default MainLayout;
