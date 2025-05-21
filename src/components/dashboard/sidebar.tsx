
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Users, 
  BarChart, 
  HelpCircle,
  PlusCircle,
  X
} from "lucide-react";

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isMobile, isOpen, toggleSidebar }: SidebarProps) {

  const sidebarClasses = isMobile
    ? `fixed inset-y-0 left-0 z-[100] w-[240px] transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] border-none rounded-r-lg`
    : "flex h-full w-[240px] flex-col bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-none";

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center px-6 justify-between bg-gradient-to-r from-blue-50 to-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <span className="font-semibold text-lg text-gray-800">Content Dashboard</span>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 gap-2 text-sm font-medium">
          <Button variant="ghost" className="flex justify-start gap-3 px-4 py-2 h-10 w-full hover:bg-blue-50 hover:text-blue-600 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all rounded-md">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Button>
          <Button variant="ghost" className="flex justify-start gap-3 px-4 py-2 h-10 w-full hover:bg-blue-50 hover:text-blue-600 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all rounded-md">
            <FileText className="h-5 w-5" />
            Articles
          </Button>
          <Button variant="ghost" className="flex justify-start gap-3 px-4 py-2 h-10 w-full hover:bg-blue-50 hover:text-blue-600 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all rounded-md">
            <Users className="h-5 w-5" />
            Team
          </Button>
          <Button variant="ghost" className="flex justify-start gap-3 px-4 py-2 h-10 w-full hover:bg-blue-50 hover:text-blue-600 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all rounded-md">
            <BarChart className="h-5 w-5" />
            Analytics
          </Button>
          <Separator className="my-4 bg-gray-200" />
          <Button variant="ghost" className="flex justify-start gap-3 px-4 py-2 h-10 w-full hover:bg-blue-50 hover:text-blue-600 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all rounded-md">
            <Settings className="h-5 w-5" />
            Settings
          </Button>
          <Button variant="ghost" className="flex justify-start gap-3 px-4 py-2 h-10 w-full hover:bg-blue-50 hover:text-blue-600 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all rounded-md">
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </Button>
        </nav>
      </div>
      <div className="mt-auto p-4 bg-gradient-to-b from-white to-blue-50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] border-none">
        <Button className="w-full justify-start gap-2 px-4 py-2 h-10 bg-blue-600 hover:bg-blue-700 text-white shadow-[0_2px_5px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_10px_rgba(37,99,235,0.3)] transition-all rounded-md">
          <PlusCircle className="h-5 w-5" />
          New Article
        </Button>
      </div>
    </>
  );

  const mobileOverlay = isMobile && isOpen && (
    <div 
      className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm transition-opacity duration-300" 
      onClick={toggleSidebar}
    />
  );

  return (
    <>
      {mobileOverlay}
      <div className={sidebarClasses}>{sidebarContent}</div>
    </>
  );
}