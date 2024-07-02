import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../Components/Events.css';

const CustomStar = ({ value, filled, onClick }) => {
  return (
    <span
      onClick={() => onClick(value)}
      style={{ cursor: 'pointer', color: filled ? 'gold' : 'gray' }}
    >
      ★
    </span>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({});
  const userId = localStorage.getItem('userId'); 
// console.log(userId,"hhjkh")
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRatingClick = (eventId, value,userId) => {
    console.log('Sending rating:', eventId, value,userId); 

    fetch('http://127.0.0.1:8000/api/store-rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId, userId, rating: value }), 
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Failed to store rating: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Rating stored successfully:', data);
        setRatings(prevRatings => ({ ...prevRatings, [eventId]: value }));
      })
      .catch(error => {
        console.error('Error storing rating:', error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className='container'>
        {events.map(event => (
          <div className="card mt-5 mb-5 p-3" key={event.id}>
            <div className="row g-0">
              <div className="col-md-4 text-center">
                <img
                  src={`http://127.0.0.1:8000/assets/imgs/events/${event.image}`}
                  className="img-fluid rounded"
                  alt="Event"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title"><span style={{ color: 'brown' }}>Events:</span> {event.name}</h5>
                  <p className="card-text"><span style={{ color: 'brown' }}>Location:</span>  {event.location}</p>
                  <div className="mb-3">
                    <label className="form-label"><span style={{ color: 'brown' }}>Rate this event</span></label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                        <CustomStar
                          key={value}
                          value={value}
                          filled={value <= (ratings[event.id] || 0)}
                          onClick={() => handleRatingClick(event.id, value,userId)}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {ratings[event.id]
                      ? `You rated this event ${ratings[event.id]} stars`
                      : 'No rating yet'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Events;
