import React from 'react';
import { Hotel } from '../types/hotel';
// Ensure these types are imported correctly
import { TipPlata } from '../types/booking'; 

interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  
  const handleBooking = (numarCamera: number) => {
    console.log(`Initiating Reservation for Room #${numarCamera} at ${hotel.locatie}`);
    
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    marginBottom: '20px',
    padding: '16px',
    textAlign: 'left' 
  };

  return (
    <div style={containerStyle}>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
        <h2 style={{ margin: 0, color: '#003580' }}>{hotel.locatie}</h2>
        <div style={{ fontSize: '14px', color: '#6c757d' }}>
          {hotel.stele} Stars • {hotel.metri_de_plaja}m from beach • {hotel.facilitati}
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', color: '#666' }}>
            <th style={{ padding: '8px' }}>Room Type</th>
            <th style={{ padding: '8px' }}>Floor</th>
            <th style={{ padding: '8px' }}>Status</th>
            <th style={{ padding: '8px' }}>Price/Night</th>
            <th style={{ padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {hotel.camere.map((camera) => (
            <tr key={camera.numar} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: '12px 8px' }}>
                <div style={{ fontWeight: 'bold' }}>{camera.tip}</div>
                <div style={{ fontSize: '12px' }}>#{camera.numar}</div>
              </td>
              <td style={{ padding: '12px 8px' }}>{camera.etaj}</td>
              <td style={{ padding: '12px 8px' }}>
                <span style={{ 
                  color: camera.disponibilitate ? '#28a745' : '#dc3545', 
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}>
                  {camera.disponibilitate ? '✔ Available' : '✘ Occupied'}
                </span>
              </td>
              <td style={{ padding: '12px 8px' }}>200 EUR</td>
              <td style={{ padding: '12px 8px' }}>
                <button 
                  onClick={() => handleBooking(camera.numar)}
                  disabled={!camera.disponibilitate}
                  style={{
                    backgroundColor: camera.disponibilitate ? '#0071c2' : '#e9ecef',
                    color: camera.disponibilitate ? 'white' : '#6c757d',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '2px',
                    cursor: camera.disponibilitate ? 'pointer' : 'not-allowed',
                    fontWeight: 'bold'
                  }}
                >
                  Book Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};