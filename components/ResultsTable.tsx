
import React, { useState, useMemo } from 'react';
import type { CoordinatePoint } from '../types';

interface ResultsTableProps {
  points: CoordinatePoint[];
}

const ROWS_PER_PAGE = 10;

export const ResultsTable: React.FC<ResultsTableProps> = ({ points }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(points.length / ROWS_PER_PAGE);

  const paginatedPoints = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    return points.slice(startIndex, endIndex);
  }, [points, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  if (points.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm shadow-lg rounded-xl border border-gray-700 overflow-hidden">
      <h2 className="text-xl font-semibold text-white p-4 border-b border-gray-700">Generated Coordinates</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wider text-cyan-400">Distance (mi)</th>
              <th className="p-3 text-sm font-semibold tracking-wider text-cyan-400">Angle (°)</th>
              <th className="p-3 text-sm font-semibold tracking-wider text-cyan-400">Latitude</th>
              <th className="p-3 text-sm font-semibold tracking-wider text-cyan-400">Longitude</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {paginatedPoints.map((point, index) => (
              <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-150">
                <td className="p-3 text-gray-300">{point.distance}</td>
                <td className="p-3 text-gray-300">{point.angle}</td>
                <td className="p-3 text-gray-300 font-mono">{point.latitude.toFixed(6)}</td>
                <td className="p-3 text-gray-300 font-mono">{point.longitude.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="p-3 bg-gray-900/50 border-t border-gray-700 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition"
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
