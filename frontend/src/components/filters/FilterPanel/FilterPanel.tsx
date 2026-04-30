import React from 'react';
import { TipCamera, StatusHotel } from '../../../common/types/hotel';
import { ALL_FACILITIES } from '../../../common/constants/mockData';
import { PriceRange } from '../PriceRange/PriceRange';
import { formatStatus, formatRoomType } from '../../../utils/formatters';
import type { FilterState } from '../../../utils/filters';
import { DEFAULT_FILTERS } from '../../../utils/filters';
import './FilterPanel.css';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const update = (partial: Partial<FilterState>) => {
    onFilterChange({ ...filters, ...partial });
  };

  const toggleArrayItem = <T,>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  const handleClearAll = () => {
    onFilterChange({ ...DEFAULT_FILTERS });
  };

  return (
    <aside className="filter-panel" id="filter-panel">
      <div className="filter-panel-title">
        Filters
        <button className="filter-clear-btn" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      {/* ── Stars ─────────────────────────────── */}
      <div className="filter-section">
        <div className="filter-section-title">Star Rating</div>
        <div className="filter-star-row">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              className={`filter-star-btn ${filters.stars.includes(star) ? 'active' : ''}`}
              onClick={() => update({ stars: toggleArrayItem(filters.stars, star) })}
            >
              {star}★
            </button>
          ))}
        </div>
      </div>

      {/* ── Price Range ───────────────────────── */}
      <div className="filter-section">
        <div className="filter-section-title">Price Range</div>
        <PriceRange
          min={0}
          max={1000}
          currentMin={filters.priceMin}
          currentMax={filters.priceMax}
          onMinChange={(val) => update({ priceMin: val })}
          onMaxChange={(val) => update({ priceMax: val })}
        />
      </div>

      {/* ── Room Type ─────────────────────────── */}
      <div className="filter-section">
        <div className="filter-section-title">Room Type</div>
        <div className="filter-checkbox-group">
          {Object.values(TipCamera).map((tipo) => (
            <label key={tipo} className="filter-checkbox-label">
              <input
                type="checkbox"
                className="filter-checkbox"
                checked={filters.roomTypes.includes(tipo)}
                onChange={() => update({ roomTypes: toggleArrayItem(filters.roomTypes, tipo) })}
              />
              {formatRoomType(tipo)}
            </label>
          ))}
        </div>
      </div>

      {/* ── Meal Plan ─────────────────────────── */}
      <div className="filter-section">
        <div className="filter-section-title">Meal Plan</div>
        <div className="filter-checkbox-group">
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={filters.mealPlan.includes('allInclusive')}
              onChange={() => update({ mealPlan: toggleArrayItem(filters.mealPlan, 'allInclusive' as const) })}
            />
            All Inclusive
          </label>
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={filters.mealPlan.includes('justBreakfast')}
              onChange={() => update({ mealPlan: toggleArrayItem(filters.mealPlan, 'justBreakfast' as const) })}
            />
            Breakfast Included
          </label>
        </div>
      </div>

      {/* ── Distance to Beach ─────────────────── */}
      <div className="filter-section">
        <div className="filter-section-title">Distance to Beach</div>
        <PriceRange
          min={0}
          max={10000}
          currentMin={0}
          currentMax={filters.maxDistanceBeach}
          onMinChange={() => {}}
          onMaxChange={(val) => update({ maxDistanceBeach: val })}
          label="Max distance"
          formatValue={(v) => (v >= 10000 ? 'Any' : v < 1000 ? `${v}m` : `${(v / 1000).toFixed(1)}km`)}
        />
      </div>

      {/* ── Distance to City ──────────────────── */}
      <div className="filter-section">
        <div className="filter-section-title">Distance to City Center</div>
        <PriceRange
          min={0}
          max={10000}
          currentMin={0}
          currentMax={filters.maxDistanceCity}
          onMinChange={() => {}}
          onMaxChange={(val) => update({ maxDistanceCity: val })}
          label="Max distance"
          formatValue={(v) => (v >= 10000 ? 'Any' : v < 1000 ? `${v}m` : `${(v / 1000).toFixed(1)}km`)}
        />
      </div>

      {/* ── Facilities ────────────────────────── */}
      <div className="filter-section">
        <div className="filter-section-title">Facilities</div>
        <div className="filter-facilities-grid">
          {ALL_FACILITIES.map((fac) => (
            <button
              key={fac}
              className={`filter-facility-chip ${filters.facilities.includes(fac) ? 'active' : ''}`}
              onClick={() => update({ facilities: toggleArrayItem(filters.facilities, fac) })}
            >
              {fac}
            </button>
          ))}
        </div>
      </div>

      {/* ── Availability ──────────────────────── */}
      <div className="filter-section">
        <div className="filter-toggle-row">
          <span className="filter-toggle-label">Available Rooms Only</span>
          <button
            className={`filter-toggle ${filters.showAvailableOnly ? 'active' : ''}`}
            onClick={() => update({ showAvailableOnly: !filters.showAvailableOnly })}
            aria-label="Toggle available only"
          />
        </div>
      </div>

      {/* ── Hotel Status ──────────────────────── */}
      <div className="filter-section">
        <div className="filter-section-title">Hotel Status</div>
        <div className="filter-checkbox-group">
          {Object.values(StatusHotel).map((s) => (
            <label key={s} className="filter-checkbox-label">
              <input
                type="checkbox"
                className="filter-checkbox"
                checked={filters.status.includes(s)}
                onChange={() => update({ status: toggleArrayItem(filters.status, s) })}
              />
              {formatStatus(s)}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
