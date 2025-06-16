import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import '..//Styles/ProfilePage.css';

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const docRef = doc(db, 'farmers', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data);
        setEditedProfile(data);
      } else {
        console.log('No profile found.');
      }
    };

    if (!loading) fetchProfile();
  }, [user, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'farmers', user.uid);
      await updateDoc(docRef, editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view your profile.</div>;
  if (!profile) return <div>Fetching profile...</div>;

  return (
    <div className="profile-container">
      <h2>👩‍🌾 Farmer Profile</h2>
      <form className="profile-form">
        {['name', 'email', 'landSize', 'location', 'soilType', 'irrigationType'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              name={field}
              value={editedProfile[field]}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        ))}
      </form>

      <div className="profile-buttons">
        {isEditing ? (
          <button type="button" onClick={handleSave} className="save-btn">Save</button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
        )}
      </div>
    </div>
  );
};

export default Profile;