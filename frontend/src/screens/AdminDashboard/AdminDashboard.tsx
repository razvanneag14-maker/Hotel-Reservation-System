import React, { useState } from 'react';
import { useStoreHotels } from '../../common/stores/useStoreHotels';
import { useStoreAuth } from '../../common/stores/useStoreAuth';
import { useToast } from '../../components/ui/Toast/Toast';
import { Badge } from '../../components/ui/Badge/Badge';
import { Button } from '../../components/ui/Button/Button';
import { Modal } from '../../components/ui/Modal/Modal';
import { HotelForm } from '../../components/forms/HotelForm/HotelForm';
import { StarRating } from '../../components/filters/StarRating/StarRating';
import type { Hotel } from '../../common/types/hotel';
import { formatPrice, getLowestPrice, formatStatus } from '../../utils/formatters';
import './AdminDashboard.css';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { hotels, addHotel, updateHotel, deleteHotel } = useStoreHotels();
  const { isAdmin } = useStoreAuth();
  const { showToast } = useToast();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  if (!isAdmin) {
    return (
      <div className="admin-dashboard">
        <div className="admin-no-access">
          <div style={{ fontSize: '48px' }}>🔒</div>
          <h2 className="admin-no-access-title">Access Denied</h2>
          <p className="admin-no-access-text">
            You need admin privileges to view this page.
          </p>
          <Button variant="outline" onClick={() => onNavigate('/login')}>
            Sign In as Admin
          </Button>
        </div>
      </div>
    );
  }

  const totalRooms = hotels.reduce((sum, h) => sum + h.camere.length, 0);
  const availableRooms = hotels.reduce(
    (sum, h) => sum + h.camere.filter((c) => c.disponibilitate).length,
    0
  );

  const handleCreate = (data: Omit<Hotel, 'id'>) => {
    addHotel(data);
    setShowCreateModal(false);
    showToast('success', 'Hotel Created', `${data.name} added successfully.`);
  };

  const handleUpdate = (data: Omit<Hotel, 'id'>) => {
    if (editingHotel) {
      updateHotel(editingHotel.id, data);
      setEditingHotel(null);
      showToast('success', 'Hotel Updated', `${data.name} updated.`);
    }
  };

  const handleDelete = (id: string) => {
    const hotel = hotels.find((h) => h.id === id);
    if (hotel && window.confirm(`Delete "${hotel.name}"?`)) {
      deleteHotel(id);
      showToast('info', 'Hotel Deleted', `${hotel.name} removed.`);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>
          <p className="admin-dashboard-subtitle">Manage your hotel portfolio</p>
        </div>
        <Button
          variant="primary"
          icon={<span>+</span>}
          onClick={() => setShowCreateModal(true)}
        >
          Add Hotel
        </Button>
      </div>

      {/* Stats */}
      <div className="admin-stats-row">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{hotels.length}</div>
          <div className="admin-stat-label">Total Hotels</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{totalRooms}</div>
          <div className="admin-stat-label">Total Rooms</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{availableRooms}</div>
          <div className="admin-stat-label">Available Rooms</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">
            {hotels.filter((h) => h.status === 'DESCHIS').length}
          </div>
          <div className="admin-stat-label">Open Hotels</div>
        </div>
      </div>

      {/* Hotels Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hotel</th>
              <th>Location</th>
              <th>Stars</th>
              <th>Rooms</th>
              <th>Price From</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => {
              const statusVariant =
                hotel.status === 'DESCHIS' ? 'success' : hotel.status === 'IN_RENOVARE' ? 'warning' : 'error';
              return (
                <tr key={hotel.id}>
                  <td>
                    <div className="admin-table-hotel-name">
                      <img
                        className="admin-table-hotel-thumb"
                        src={hotel.imagine}
                        alt={hotel.name}
                      />
                      <span style={{ fontWeight: 600 }}>{hotel.name}</span>
                    </div>
                  </td>
                  <td>{hotel.locatie}</td>
                  <td>
                    <StarRating rating={hotel.stele} size={14} />
                  </td>
                  <td>{hotel.camere.length}</td>
                  <td style={{ fontWeight: 600 }}>
                    {formatPrice(getLowestPrice(hotel.camere))}
                  </td>
                  <td>
                    <Badge variant={statusVariant}>{formatStatus(hotel.status)}</Badge>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onNavigate(`/hotel/${hotel.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingHotel(hotel)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(hotel.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Add New Hotel">
        <HotelForm onSubmit={handleCreate} onCancel={() => setShowCreateModal(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editingHotel !== null} onClose={() => setEditingHotel(null)} title="Edit Hotel">
        {editingHotel && (
          <HotelForm
            initialData={editingHotel}
            onSubmit={handleUpdate}
            onCancel={() => setEditingHotel(null)}
          />
        )}
      </Modal>
    </div>
  );
};
