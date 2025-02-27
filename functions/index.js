const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp(); // ✅ Initializes Firebase Admin SDK
const db = admin.database();
const corsHandler = cors({origin: true});
/**
 * 🔍 Get All Users (Admins Only)
 * - Requires authentication
 * - Only accessible to users with `role: admin`
 */
// eslint-disable-next-line max-len
exports.getUsers = functions
    .region("europe-west1")
    .https.onRequest((req, res) => {
      corsHandler(req, res, async () => {
        try {
          console.log("📡 [Cloud Function] Received request to fetch users.");

          // ✅ Enable CORS properly
          res.set("Access-Control-Allow-Origin", "*");
          res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
          // eslint-disable-next-line max-len
          res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

          if (req.method === "OPTIONS") {
            return res.status(204).send(""); // ✅ Handle preflight request
          }

          const usersRef = db.ref("users");
          const snapshot = await usersRef.once("value");

          if (!snapshot.exists()) {
            console.warn("⚠️ No users found in database.");
            return res.status(404).json({error: "No users found"});
          }

          // eslint-disable-next-line max-len
          const users = Object.entries(snapshot.val()).map(([uid, userData]) => ({uid, ...userData}));

          console.log("✅ Users fetched:", users);
          res.status(200).json(users);
        } catch (error) {
          console.error("❌ Error fetching users:", error);
          res.status(500).json({error: "Failed to fetch users"});
        }
      });
    });

/**
 * 🗑️ Delete User (Admins Only)
 * - Requires authentication
 * - Only accessible to users with `role: admin`
 */
// eslint-disable-next-line max-len
exports.deleteUser = functions
    .region("europe-west1")
    .https.onRequest(async (req, res) => {
      corsHandler(req, res, async () => {
      // ✅ Wrap request with CORS handler
        try {
          console.log(`🗑️ [Cloud Function] Received request to delete user.`);

          // 🔐 Verify Authorization
          if (!req.headers.authorization) {
            return res
                .status(401)
                .json({error: "Unauthorized: Missing token."});
          }

          const token = req.headers.authorization.split(" ")[1];
          const decodedToken = await admin.auth().verifyIdToken(token);

          // 🔍 Verify the requester is an admin
          // eslint-disable-next-line max-len
          const userRef = admin.database().ref(`users/${decodedToken.uid}/role`);
          const snapshot = await userRef.once("value");

          if (!snapshot.exists() || snapshot.val() !== "admin") {
            return res
                .status(403)
                .json({error: "Forbidden: You are not an admin."});
          }

          // 🛑 Prevent admins from deleting themselves
          const {uid} = req.query;
          if (!uid) {
            return res.status(400).json({error: "Missing user ID."});
          }
          if (uid === decodedToken.uid) {
            return res
                .status(403)
                .json({error: "You cannot delete your own account."});
          }

          // 🔥 Delete user from Firebase Auth
          await admin.auth().deleteUser(uid);

          // ❌ Remove user from Realtime Database
          await admin.database().ref(`users/${uid}`).remove();

          console.log(`✅ [Cloud Function] Successfully deleted user: ${uid}`);
          res.json({success: true, message: `User ${uid} deleted.`});
        } catch (error) {
          console.error("❌ [Cloud Function] Error deleting user:", error);
          res.status(500).json({error: "Failed to delete user."});
        }
      });
    });
