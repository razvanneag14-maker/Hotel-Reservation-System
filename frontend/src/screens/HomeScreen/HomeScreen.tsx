import React, { useState, useMemo } from 'react';
import { Header } from '../../components/layout/Header/Header';
import { FilterPanel } from '../../components/filters/FilterPanel/FilterPanel';
import { HotelCard } from '../../components/cards/HotelCard/HotelCard';
import { Modal } from '../../components/ui/Modal/Modal';
import { HotelForm } from '../../components/forms/HotelForm/HotelForm';
import { Button } from '../../components/ui/Button/Button';
import { useStoreHotels } from '../../common/stores/useStoreHotels';
import { useStoreAuth } from '../../common/stores/useStoreAuth';
import { useToast } from '../../components/ui/Toast/Toast';
import type { Hotel } from '../../common/types/hotel';
import { applyFilters, DEFAULT_FILTERS } from '../../utils/filters';
import type { FilterState } from '../../utils/filters';
import './HomeScreen.css';

interface HomeScreenProps {
  onNavigate: (path: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { hotels, addHotel, updateHotel, deleteHotel } = useStoreHotels();
  const { isAdmin } = useStoreAuth();
  const { showToast } = useToast();

  const [filters, setFilters] = useState<FilterState>({ ...DEFAULT_FILTERS });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  const filteredHotels = useMemo(() => applyFilters(hotels, filters), [hotels, filters]);

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleDateChange = (checkIn: string, checkOut: string) => {
    setFilters((prev) => ({ ...prev, checkInDate: checkIn, checkOutDate: checkOut }));
  };

  const handleCreateHotel = (data: Omit<Hotel, 'id'>) => {
    addHotel(data);
    setShowCreateModal(false);
    showToast('success', 'Hotel Created', `${data.name} has been added successfully.`);
  };

  const handleUpdateHotel = (data: Omit<Hotel, 'id'>) => {
    if (editingHotel) {
      updateHotel(editingHotel.id, data);
      setEditingHotel(null);
      showToast('success', 'Hotel Updated', `${data.name} has been updated.`);
    }
  };

  const handleDeleteHotel = (id: string) => {
    const hotel = hotels.find((h) => h.id === id);
    if (hotel && window.confirm(`Are you sure you want to delete "${hotel.name}"?`)) {
      deleteHotel(id);
      showToast('info', 'Hotel Deleted', `${hotel.name} has been removed.`);
    }
  };

  return (
    <div className="home-screen">
      <Header onSearch={handleSearch} onDateChange={handleDateChange} />

      <div className="home-main">
        <FilterPanel filters={filters} onFilterChange={setFilters} />

        <div>
          <div className="home-results-header">
            <div>
              <h2 className="home-results-title">Hotels</h2>
              <span className="home-results-count">
                {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found
                {filters.checkInDate && filters.checkOutDate && (
                  <span> · {filters.checkInDate} → {filters.checkOutDate}</span>
                )}
              </span>
            </div>
            {isAdmin && (
              <div className="home-add-hotel-bar">
                <Button
                  variant="primary"
                  onClick={() => setShowCreateModal(true)}
                  icon={<span>+</span>}
                >
                  Add Hotel
                </Button>
              </div>
            )}
          </div>

          {filteredHotels.length > 0 ? (
            <div className="home-hotel-grid">
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onViewDetails={(id) => onNavigate(`/hotel/${id}`)}
                  onEdit={(h) => setEditingHotel(h)}
                  onDelete={handleDeleteHotel}
                />
              ))}
            </div>
          ) : (
            <div className="home-no-results">
              <div className="home-no-results-icon">🔍</div>
              <h3 className="home-no-results-title">No hotels found</h3>
              <p className="home-no-results-text">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal (Admin only) */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Hotel"
      >
        <HotelForm onSubmit={handleCreateHotel} onCancel={() => setShowCreateModal(false)} />
      </Modal>

      {/* Edit Modal (Admin only) */}
      <Modal
        isOpen={editingHotel !== null}
        onClose={() => setEditingHotel(null)}
        title="Edit Hotel"
      >
        {editingHotel && (
          <HotelForm
            initialData={editingHotel}
            onSubmit={handleUpdateHotel}
            onCancel={() => setEditingHotel(null)}
          />
        )}
      </Modal>
    </div>
  );
};
