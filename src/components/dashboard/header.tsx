import { Tabs,TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Header() {
  return (
    <div className="flex flex-col space-y-4 pb-4">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Articles</h1>
      <div className="overflow-x-auto">
        <Tabs defaultValue="generated" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="generated" className="relative px-3 sm:px-6 text-xs sm:text-sm">
              Generated
            </TabsTrigger>
            <TabsTrigger value="published" className="relative px-3 sm:px-6 text-xs sm:text-sm">
              Published
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="relative px-3 sm:px-6 text-xs sm:text-sm">
              Scheduled
            </TabsTrigger>
            <TabsTrigger value="archived" className="relative px-3 sm:px-6 text-xs sm:text-sm">
              Archived
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}