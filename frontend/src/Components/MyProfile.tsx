import { useEffect, useState } from "react";
import { UserResponseDto } from "../Interfaces/User/user-response-dto.ts";
import { AuthService } from "../Services/AuthService.ts";
import Header from "./Header.tsx";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import "./MyProfile.css";
import Footer from "./Footer.tsx";

export default function MyProfile() {
  const [user, setUser] = useState<UserResponseDto>();

  const fetchUser = async () => {
    const userDetail = await AuthService.GetUserDetail();
    setUser(userDetail);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <>
      <Header />

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-avatar">
            <FaUser />
          </div>

          <h3 className="profile-name">
            {user.userName} {user.lastName}
          </h3>

          <div className="profile-info">
            <div className="profile-row">
              <FaEnvelope />
              <span>{user.email}</span>
            </div>

            <div className="profile-row">
              <FaPhone />
              <span>{user.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
