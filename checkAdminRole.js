import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountPath) {
  throw new Error("❌ Missing FIREBASE_SERVICE_ACCOUNT_KEY in .env file");
}

// ✅ Read the service account JSON file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// ✅ Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://coffee-recipe-finder-default-rtdb.europe-west1.firebasedatabase.app/",
});

// ✅ Function to check if a user has the admin role
async function checkAdminRole(userId) {
  try {
    const user = await admin.auth().getUser(userId);
    console.log("🔍 Checking admin role for:", user.email);

    if (user.customClaims && user.customClaims.role === "admin") {
      console.log("✅ User is an admin!");
    } else {
      console.log("❌ User is NOT an admin.");
    }
  } catch (error) {
    console.error("❌ Error checking admin status:", error);
  }
}

// ✅ Replace with actual user ID
const userId = "p4Ujex5CiOO4tktxsABTqkXeCgQ2";
checkAdminRole(userId);
