import { envVar } from "@/utils/envVar";
import { cookies } from "next/headers";
import UserCard from "./UserCard";

async function AllUser() {
  const url = `${envVar.backend_server}/users/all-user`;
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.value}`
    },
    cache: "no-store",
  });

  const usersData = await res.json();

  return (
    <div className="space-y-4 mt-4 max-w-[950px] mx-auto">
      {usersData?.data?.length > 0 ? (
        usersData.data.map((user: any) => (
          <UserCard key={user.id} user={user} />
        ))
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
}

export default AllUser;