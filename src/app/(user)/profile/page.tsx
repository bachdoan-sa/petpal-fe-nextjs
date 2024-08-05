// "user client";
import BootstrapMenu from "@/src/components/header/Menu";
import { cookies } from "next/headers";
import userApiRequest from '@/src/apiRequests/user';
import { UserType } from '../../../schemaValidations/user.schema';

async function AccountUser() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  let user: UserType 
  try{
    const response = await userApiRequest.getUserInfoByToken({sessionToken})
    user = response.payload.data;
  } catch(error){
    console.log(error)
  }

  console.log()

  // const user = {
  //   fullName: "John Doe",
  //   address: "123 Main St, Anytown, USA",
  //   phoneNumber: "123-456-7890",
  //   roomId: "Room 101",
  //   profileImage: "/path/to/profileImage.jpg",
  //   email: "john.doe@example.com"
  // };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header text-center">
                <h4>User Profile</h4>
              </div>
              <div className="card-body text-center">
                <img
                  // src={user.profileImage}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-3"
                  style={{ width: "150px", height: "150px" }}
                />
                {/* <h5>{user.fullName}</h5>
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
                <p>{user.address}</p>
                <p>{user.roomId}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountUser;
