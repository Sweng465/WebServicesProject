import { useEffect, useState } from "react";
import Header from "../components/Header";
import VehicleSearch from "../components/VehicleSearch";
import VehicleResultCard from "../components/VehicleResultCard";
import Pagination from "../components/Pagination";

const BrowseCars = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1 });

  const [filters, setFilters] = useState({
    yearId: "",
    makeId: "",
    modelId: "",
    submodelId: "",
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page,
          limit: 12,
          yearId: filters.yearId || "",
          makeId: filters.makeId || "",
          modelId: filters.modelId || "",
          submodelId: filters.submodelId || "",
        });

        const res = await fetch(`http://localhost:3000/api/vehicles?${query}`);
        const data = await res.json();

        // The backend returns { data: [...], pagination: {...} }
        setVehicles(data.data || []);
        setPagination(data.pagination || { totalPages: 1 });
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 to-blue-600">
      <Header />
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              Browse Cars
            </h1>
            <p className="text-gray-100 text-sm sm:text-base lg:text-lg">
              Search for vehicles by year, make, model, and more.
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
              Filters
            </h2>
            <VehicleSearch filters={filters} setFilters={setFilters} />
          </div>

          {/* Results Section */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-orange-600 mb-4"></div>
                  <p className="text-center text-lg text-gray-600">
                    Loading vehicles...
                  </p>
                </div>
              ) : vehicles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16">
                  <p className="text-center text-lg text-gray-600">
                    No vehicles found. Try adjusting your filters.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-gray-700 font-medium">
                      Found <span className="text-blue-600 font-bold">{vehicles.length}</span> vehicle{vehicles.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {vehicles.map((v) => (
                      <VehicleResultCard key={v.vehicleId} car={v} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Pagination Section */}
            {vehicles.length > 0 && (
              <div className="border-t border-gray-200 p-4 sm:p-6 lg:p-8 bg-gray-50">
                <Pagination
                  currentPage={page}
                  setPage={setPage}
                  totalPages={pagination.totalPages || 1}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseCars;
