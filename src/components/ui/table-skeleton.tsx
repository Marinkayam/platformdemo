import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showFooter?: boolean;
}

export function TableSkeleton({ rows = 5, columns = 6, showFooter = false }: TableSkeletonProps) {
  return (
    <>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex} className="h-[65px]">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex} className="px-4">
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {showFooter && (
        <tbody>
          <TableRow className="h-[65px] bg-[#F6F7F9]">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex} className="px-4">
                <Skeleton className="h-4 w-3/4" />
              </TableCell>
            ))}
          </TableRow>
        </tbody>
      )}
    </>
  );
}