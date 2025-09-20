export const mapFirebaseUser = (fbUser) => {
  if (!fbUser) return null;
  return {
    uid: fbUser.uid,
    displayName: fbUser.displayName,
    email: fbUser.email,
    emailVerified: fbUser.emailVerified,
    photoURL: fbUser.photoURL,
    accessToken: fbUser.accessToken, // optional
  };
};
