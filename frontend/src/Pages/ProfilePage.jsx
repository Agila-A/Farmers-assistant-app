import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../Styles/ProfilePage.css';

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const docRef = doc(db, "farmers", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        console.log("No profile found.");
      }
    };

    if (!loading) fetchProfile();
  }, [user, loading]);

  if (loading) return <div className="profile-container">Loading...</div>;
  if (!user) return <div className="profile-container">Please log in to view your profile.</div>;
  if (!profile) return <div className="profile-container">Fetching profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>👩‍🌾 Farmer Profile</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Land Size:</strong> {profile.landSize} acres</p>
        <p><strong>Location:</strong> {profile.location}</p>
        <p><strong>Soil Type:</strong> {profile.soilType}</p>
        <p><strong>Irrigation Type:</strong> {profile.irrigationType}</p>
      </div>
    </div>
  );
};

export default Profile;
