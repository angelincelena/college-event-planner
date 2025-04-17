// import React, { useEffect, useState } from 'react';
// import '../../Styles/Profile.css';

// interface Organizer {
//   organizer_id: number;
//   name: string;
//   email: string;
//   contact_info: string;
//   description: string;
// }

// const MyProfile: React.FC = () => {
//   const [organizer, setOrganizer] = useState<Organizer | null>(null);
//   const [loading, setLoading] = useState(true);

//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch(`http://localhost:5002/api/auth/organizer/${userId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setOrganizer(data.organizer);
//         } else {
//           console.error('Failed to fetch organizer:', data.message);
//         }
//       } catch (err) {
//         console.error('Error fetching organizer:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchProfile();
//   }, [userId]);

//   if (loading) return <div className="organizer-profile-loader">Loading...</div>;

//   return (
//     <div className="organizer-profile-container">
//       <h2 className="organizer-profile-title">My Organizer Profile</h2>
//       {organizer ? (
//         <div className="organizer-profile-card">
//           <p><strong>Name:</strong> {organizer.name}</p>
//           <p><strong>Email:</strong> {organizer.email}</p>
//           <p><strong>Contact Info:</strong> {organizer.contact_info}</p>
//           <p><strong>Description:</strong> {organizer.description}</p>
//         </div>
//       ) : (
//         <p className="organizer-profile-error">Organizer profile not found.</p>
//       )}
//     </div>
//   );
// };

// export default MyProfile;
