import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Article } from "@/data/articles";
import { articles } from "@/data/articles";
import { Eye, ChevronUp, ChevronDown, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type SortField = 'title' | 'keyword' | 'wordCount' | 'createdAt';
type SortDirection = 'asc' | 'desc';
type StatusFilter = 'all' | 'published' | 'generated' | 'scheduled' | 'archived';

export function DataTable() {
  const [data] = useState<Article[]>(articles);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading state to true initially
    setIsLoading(true);

    // Use a timeout to simulate data loading and hide the loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    // First filter by search term
    let result = data.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Then filter by status
    if (statusFilter !== 'all') {
      result = result.filter(article => article.status === statusFilter);
    }

    // Then sort
    return result.sort((a, b) => {
      if (sortField === 'wordCount') {
        return sortDirection === 'asc'
          ? a.wordCount - b.wordCount
          : b.wordCount - a.wordCount;
      } else if (sortField === 'title') {
        return sortDirection === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortField === 'keyword') {
        return sortDirection === 'asc'
          ? a.keyword.localeCompare(b.keyword)
          : b.keyword.localeCompare(a.keyword);
      } else if (sortField === 'createdAt') {
        // Simple string comparison for dates (not ideal but works for demo)
        return sortDirection === 'asc'
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt);
      }
      return 0;
    });
  }, [data, searchTerm, sortField, sortDirection, statusFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Get status badge color
  const getStatusBadge = (status: Article['status']) => {
    switch (status) {
      case 'published':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200">Published</Badge>;
      case 'generated':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200">Generated</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200">Scheduled</Badge>;
      case 'archived':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200">Archived</Badge>;
      default:
        return null;
    }
  };

  // Loading skeleton component
  const TableSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-100 rounded-md mb-4"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-50 rounded-md mb-2"></div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      {/* Search and filter section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6">
        <div className="w-full sm:w-auto relative">
          <Input
            placeholder="Search for Title & Keywords..."
            className="w-full sm:w-80 pl-10 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
          />
          <svg
            className="absolute left-3 top-3 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex gap-3 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                disabled={isLoading}
              >
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <span className="hidden sm:inline">Filter Status</span>
                <span className="sm:hidden">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 bg-white rounded-md shadow-lg border border-gray-200">
              <DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md" onClick={() => setStatusFilter('all')}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md" onClick={() => setStatusFilter('published')}>
                Published
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md" onClick={() => setStatusFilter('generated')}>
                Generated
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md" onClick={() => setStatusFilter('scheduled')}>
                Scheduled
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md" onClick={() => setStatusFilter('archived')}>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {statusFilter !== 'all' && !isLoading && (
            <Badge variant="outline" className="h-10 px-3 py-2 bg-gray-50 border-gray-200">
              <span className="hidden sm:inline">Filtering:</span> {statusFilter}
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 ml-2 p-0 rounded-full hover:bg-gray-200"
                onClick={() => setStatusFilter('all')}
              >
                ×
              </Button>
            </Badge>
          )}
        </div>
      </div>

      {/* Table section */}
      <div className="rounded-md border border-gray-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200 hover:bg-gray-50">
                <TableHead className="w-[30px] hidden sm:table-cell py-3">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </TableHead>
                <TableHead
                  className="cursor-pointer py-3 font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center">
                    <span className="whitespace-nowrap">Article Title</span>
                    {sortField === 'title' && (
                      sortDirection === 'asc' ?
                        <ChevronUp className="ml-1 h-4 w-4 text-blue-500" /> :
                        <ChevronDown className="ml-1 h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hidden md:table-cell py-3 font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSort('keyword')}
                >
                  <div className="flex items-center">
                    <span className="whitespace-nowrap">Keyword [Traffic]</span>
                    {sortField === 'keyword' && (
                      sortDirection === 'asc' ?
                        <ChevronUp className="ml-1 h-4 w-4 text-blue-500" /> :
                        <ChevronDown className="ml-1 h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hidden sm:table-cell py-3 font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSort('wordCount')}
                >
                  <div className="flex items-center">
                    Words
                    {sortField === 'wordCount' && (
                      sortDirection === 'asc' ?
                        <ChevronUp className="ml-1 h-4 w-4 text-blue-500" /> :
                        <ChevronDown className="ml-1 h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hidden md:table-cell py-3 font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    <span className="whitespace-nowrap">Created On</span>
                    {sortField === 'createdAt' && (
                      sortDirection === 'asc' ?
                        <ChevronUp className="ml-1 h-4 w-4 text-blue-500" /> :
                        <ChevronDown className="ml-1 h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="hidden sm:table-cell py-3 font-medium text-gray-700">Status</TableHead>
                <TableHead className="text-right py-3 font-medium text-gray-700">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((article) => (
                <TableRow key={article.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <TableCell className="hidden sm:table-cell py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </TableCell>
                  <TableCell className="font-medium py-4">
                    <div>
                      <div className="text-gray-900 font-medium">{article.title}</div>
                      <div className="md:hidden text-xs text-gray-500 mt-1">
                        {article.keyword} • {article.wordCount} words
                      </div>
                      <div className="sm:hidden text-xs mt-2">
                        {getStatusBadge(article.status)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell py-4 text-gray-700">
                    <div>
                      <span>{article.keyword}</span>
                      <span className="ml-2 text-xs text-gray-500">{article.keywordVolume}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell py-4 text-gray-700">{article.wordCount}</TableCell>
                  <TableCell className="hidden md:table-cell py-4 text-gray-700">{article.createdAt}</TableCell>
                  <TableCell className="hidden sm:table-cell py-4">{getStatusBadge(article.status)}</TableCell>
                  <TableCell className="py-4">
                    {/* Desktop buttons */}
                    <div className="hidden sm:flex justify-end">
                      <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 hover:text-blue-600">
                        <Eye className="h-4 w-4 text-gray-500" />
                        <span className="ml-2">View</span>
                      </Button>
                    </div>

                    {/* Mobile dropdown menu */}
                    <div className="sm:hidden flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4 text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36 p-2 bg-white rounded-md shadow-lg border border-gray-200">
                          <DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md">
                            <Eye className="h-4 w-4 mr-2 text-gray-500" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md">
                            <img src="/wordpress-icon.svg" alt="WordPress" className="h-4 w-4 mr-2" />
                            Publish
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination section */}
      {!isLoading && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6">
          <div className="text-sm text-gray-500">
            showing <span className="font-medium text-gray-700">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAndSortedData.length)}</span>
            {' '}of{' '}<span className="font-medium text-gray-700">{filteredAndSortedData.length}</span> articles
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-sm text-gray-500">
              Show
              <select   
                className="mx-2 rounded border border-gray-200 p-1 focus:border-blue-500 focus:ring-blue-500"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="hidden sm:inline">per page</span>
            </div>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1} 
                className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center mx-2">
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                  const pageNum = currentPage <= 2 ? i + 1 : currentPage - 1 + i;
                  if (pageNum <= totalPages) {
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        className={`mx-1 min-w-[32px] ${
                          currentPage === pageNum 
                            ? "bg-blue-600 text-white" 
                            : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                  return null;
                })}
                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <span className="mx-1 text-gray-500">...</span>
                )}
                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mx-1 min-w-[32px] border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === totalPages || totalPages === 0} 
                className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}