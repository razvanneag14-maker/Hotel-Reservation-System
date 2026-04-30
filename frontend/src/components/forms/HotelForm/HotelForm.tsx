import React, { useState, useEffect } from 'react';
import type { Hotel, Camera } from '../../../common/types/hotel';
import { StatusHotel, TipCamera } from '../../../common/types/hotel';
import { ALL_FACILITIES } from '../../../common/constants/mockData';
import { Button } from '../../ui/Button/Button';
import './HotelForm.css';

interface HotelFormProps {
  initialData?: Hotel;
  onSubmit: (data: Omit<Hotel, 'id'>) => void;
  onCancel: () => void;
}

const emptyRoom: Camera = {
  etaj: 1,
  numar: 100,
  tip: TipCamera.DOUBLE,
  disponibilitate: true,
  facilitati: [],
  pretPerNoapte: 100,
};

export const HotelForm: React.FC<HotelFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [locatie, setLocatie] = useState('');
  const [imagine, setImagine] = useState('');
  const [descriere, setDescriere] = useState('');
  const [stele, setStele] = useState(3);
  const [status, setStatus] = useState<StatusHotel>(StatusHotel.DESCHIS);
  const [allInclusive, setAllInclusive] = useState(false);
  const [justBreakfast, setJustBreakfast] = useState(false);
  const [metriPlaja, setMetriPlaja] = useState(0);
  const [metriCentru, setMetriCentru] = useState(0);
  const [metriAtractii, setMetriAtractii] = useState(0);
  const [facilitati, setFacilitati] = useState<string[]>([]);
  const [camere, setCamere] = useState<Camera[]>([{ ...emptyRoom }]);

  // Pre-fill when editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLocatie(initialData.locatie);
      setImagine(initialData.imagine);
      setDescriere(initialData.descriere);
      setStele(initialData.stele);
      setStatus(initialData.status);
      setAllInclusive(initialData.allInclusive);
      setJustBreakfast(initialData.justBreakfast);
      setMetriPlaja(initialData.metri_de_plaja);
      setMetriCentru(initialData.metri_de_centrul_orasului);
      setMetriAtractii(initialData.metri_de_atractii_turistice);
      setFacilitati([...initialData.facilitati]);
      setCamere([...initialData.camere]);
    }
  }, [initialData]);

  const toggleFacility = (fac: string) => {
    setFacilitati((prev) =>
      prev.includes(fac) ? prev.filter((f) => f !== fac) : [...prev, fac]
    );
  };

  const updateRoom = (index: number, field: keyof Camera, value: unknown) => {
    setCamere((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const addRoom = () => {
    setCamere((prev) => [...prev, { ...emptyRoom, numar: (prev.length + 1) * 100 + 1 }]);
  };

  const removeRoom = (index: number) => {
    setCamere((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      locatie,
      imagine: imagine || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      descriere,
      stele,
      status,
      allInclusive,
      justBreakfast,
      metri_de_plaja: metriPlaja,
      metri_de_centrul_orasului: metriCentru,
      metri_de_atractii_turistice: metriAtractii,
      facilitati,
      camere,
    });
  };

  return (
    <form className="hotel-form" onSubmit={handleSubmit} id="hotel-form">
      {/* Basic Info */}
      <div className="hotel-form-row">
        <div className="hotel-form-field">
          <label className="hotel-form-label">Hotel Name *</label>
          <input
            className="hotel-form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Grand Palace Resort"
            required
          />
        </div>
        <div className="hotel-form-field">
          <label className="hotel-form-label">Location *</label>
          <input
            className="hotel-form-input"
            value={locatie}
            onChange={(e) => setLocatie(e.target.value)}
            placeholder="e.g. Mamaia, Constanta"
            required
          />
        </div>
      </div>

      <div className="hotel-form-field full-width">
        <label className="hotel-form-label">Image URL</label>
        <input
          className="hotel-form-input"
          value={imagine}
          onChange={(e) => setImagine(e.target.value)}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div className="hotel-form-field full-width">
        <label className="hotel-form-label">Description</label>
        <textarea
          className="hotel-form-textarea"
          value={descriere}
          onChange={(e) => setDescriere(e.target.value)}
          placeholder="Describe the hotel..."
        />
      </div>

      <div className="hotel-form-row">
        <div className="hotel-form-field">
          <label className="hotel-form-label">Stars</label>
          <select
            className="hotel-form-select"
            value={stele}
            onChange={(e) => setStele(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <option key={s} value={s}>{s} Star{s > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div className="hotel-form-field">
          <label className="hotel-form-label">Status</label>
          <select
            className="hotel-form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusHotel)}
          >
            {Object.values(StatusHotel).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Meal Plan */}
      <div className="hotel-form-checkbox-row">
        <label className="hotel-form-checkbox-label">
          <input
            type="checkbox"
            className="filter-checkbox"
            checked={allInclusive}
            onChange={(e) => setAllInclusive(e.target.checked)}
          />
          All Inclusive
        </label>
        <label className="hotel-form-checkbox-label">
          <input
            type="checkbox"
            className="filter-checkbox"
            checked={justBreakfast}
            onChange={(e) => setJustBreakfast(e.target.checked)}
          />
          Breakfast Only
        </label>
      </div>

      {/* Distances */}
      <div className="hotel-form-row">
        <div className="hotel-form-field">
          <label className="hotel-form-label">Distance to Beach (m)</label>
          <input
            className="hotel-form-input"
            type="number"
            min="0"
            value={metriPlaja}
            onChange={(e) => setMetriPlaja(Number(e.target.value))}
          />
        </div>
        <div className="hotel-form-field">
          <label className="hotel-form-label">Distance to City Center (m)</label>
          <input
            className="hotel-form-input"
            type="number"
            min="0"
            value={metriCentru}
            onChange={(e) => setMetriCentru(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="hotel-form-field">
        <label className="hotel-form-label">Distance to Attractions (m)</label>
        <input
          className="hotel-form-input"
          type="number"
          min="0"
          value={metriAtractii}
          onChange={(e) => setMetriAtractii(Number(e.target.value))}
        />
      </div>

      {/* Facilities */}
      <div className="hotel-form-section-title">Facilities</div>
      <div className="hotel-form-facilities-grid">
        {ALL_FACILITIES.map((fac) => (
          <button
            key={fac}
            type="button"
            className={`hotel-form-facility-chip ${facilitati.includes(fac) ? 'active' : ''}`}
            onClick={() => toggleFacility(fac)}
          >
            {fac}
          </button>
        ))}
      </div>

      {/* Rooms */}
      <div className="hotel-form-section-title">
        Rooms
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRoom}
          style={{ marginLeft: '12px' }}
        >
          + Add Room
        </Button>
      </div>
      <div className="hotel-form-rooms-list">
        {camere.map((room, idx) => (
          <div key={idx} className="hotel-form-room-row">
            <select
              className="hotel-form-select"
              value={room.tip}
              onChange={(e) => updateRoom(idx, 'tip', e.target.value)}
            >
              {Object.values(TipCamera).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input
              className="hotel-form-input"
              type="number"
              placeholder="Floor"
              value={room.etaj}
              onChange={(e) => updateRoom(idx, 'etaj', Number(e.target.value))}
            />
            <input
              className="hotel-form-input"
              type="number"
              placeholder="Room #"
              value={room.numar}
              onChange={(e) => updateRoom(idx, 'numar', Number(e.target.value))}
            />
            <input
              className="hotel-form-input"
              type="number"
              placeholder="€/night"
              value={room.pretPerNoapte}
              onChange={(e) => updateRoom(idx, 'pretPerNoapte', Number(e.target.value))}
            />
            <button
              type="button"
              className="hotel-form-room-remove"
              onClick={() => removeRoom(idx)}
              disabled={camere.length <= 1}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="hotel-form-actions">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Update Hotel' : 'Create Hotel'}
        </Button>
      </div>
    </form>
  );
};
