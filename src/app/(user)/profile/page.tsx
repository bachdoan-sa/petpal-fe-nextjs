// "user client";
import BootstrapMenu from "@/src/components/header/Menu";
import { cookies } from "next/headers";
import userApiRequest from '@/src/apiRequests/user';
import { UserType } from '../../../schemaValidations/user.schema';

async function AccountUser() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  // let user: UserType 
  // try{
  //   const response = await userApiRequest.getUserInfoByToken({sessionToken})
  //   user = response.payload.data;
  // } catch(error){
  //   console.log(error)
  // }

  console.log()

  const user = {
    fullName: "An Bình",
    address: "Vinhome Gardpark",
    phoneNumber: "0967671523",
    roomId: "Room 101",
    profileImage: "/assets/images/pet-contact-1.jpg",
    email: "binhan@gamil.com"
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header text-center">
                <h4>Hồ sơ người dùng</h4>
              </div>
              <div className="card-body text-center">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-3"
                  style={{ width: "150px", height: "150px" }}
                />
                <h5>Họ tên: {user.fullName}</h5>
                <p>Email: {user.email}</p>
                <p>Số điện thoại: {user.phoneNumber}</p>
                <p>Địa chỉ: {user.address}</p>
                <p>Số phòng: {user.roomId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountUser;
