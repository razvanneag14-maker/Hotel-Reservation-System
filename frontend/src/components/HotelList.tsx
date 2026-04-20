import React, { useEffect, useState } from 'react';
import { Hotel } from '../types/hotel';
import { HotelApiService } from '../services/api/api-request.service';
import { HotelCard } from './HotelCard';

export const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHotels = async () => {
      const data = await HotelApiService.getHotels();
      setHotels(data);
      setLoading(false);
    };
    loadHotels();
  }, []);

  if (loading) return <div>Loading great deals...</div>;

  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ marginBottom: '20px' }}>Hotels found in your area</h2>
      {hotels.map((h, index) => (
        <HotelCard key={index} hotel={h} />
      ))}
    </div>
  );
};