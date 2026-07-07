function ProfilePage({ userName, onChangeUserName }) {
  return (
    <main className="page">
      <h1>Profile</h1>

      <section className="profile-box">
        <h2>Current user</h2>

        <p>
          Your current username is: <strong>@{userName}</strong>
        </p>

        <label>Change username</label>

        <input
          value={userName}
          onChange={(e) => onChangeUserName(e.target.value)}
          placeholder="Enter username"
        />
      </section>
    </main>
  );
}

export default ProfilePage;
