import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { DataTable } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function DashboardLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // स्क्रीन साइज़ चेक करें
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px से कम = मोबाइल/टैबलेट
    };

    // पहली बार चेक करें
    checkScreenSize();

    // रीसाइज़ पर चेक करें
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle initial loading state
  useEffect(() => {
    // Hide the loading indicator after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // साइडबार टॉगल करें
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar 
        isMobile={isMobile} 
        isOpen={isSidebarOpen || !isMobile} 
        toggleSidebar={toggleSidebar} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* मोबाइल हेडर */}
        {isMobile && (
          <div className="h-14 border-b flex items-center px-4 bg-white shadow-sm">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
            <span className="ml-4 font-semibold">Content Dashboard</span>
          </div>
        )}
        
        <div className="flex-1 overflow-auto bg-gray-50">
          {isLoading ? (
            <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8">
              <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-6 animate-pulse"></div>
              <div className="rounded-lg bg-white overflow-hidden shadow-sm border-0">
                <div className="p-6 space-y-4">
                  <div className="h-10 bg-gray-200 rounded-md w-full animate-pulse"></div>
                  <div className="h-64 bg-gray-100 rounded-md w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8">
              <Header />
              <div className="overflow-x-auto">
                <DataTable />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}