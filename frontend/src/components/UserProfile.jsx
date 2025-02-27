import { authClient } from "../lib/auth-client";

const UserProfile = () => {
  const { data: session, isPending, error } = authClient.useSession();

  console.log("session", session);

  const handleClick = async () => {
    console.log("Clicked here");
    try {
      const response = await fetch("http://localhost:3000/tryUser", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {session && (
        <div>
          <h1>Welcome {session.user.name}</h1>
          <p>Email: {session.user.email}</p>
          <p>EmailVerified: {session.user.emailVerified}</p>
          <p>IsAnonymous: {session.user.isAnonymous}</p>

          <img
            src={session.user.image}
            alt={session.user.name}
          />
          <button onClick={() => authClient.signOut()}>Sign Out</button>
        </div>
      )}

      <div>
        <button onClick={handleClick}>Click me</button>
      </div>
    </div>
  );
};

export default UserProfile;
