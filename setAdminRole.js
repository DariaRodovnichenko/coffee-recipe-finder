import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountPath) {
  throw new Error("❌ Missing FIREBASE_SERVICE_ACCOUNT_KEY in .env file");
}

// Read the service account JSON file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://coffee-recipe-finder-default-rtdb.europe-west1.firebasedatabase.app/",
});

// Set Admin Role
async function setAdminRole(userId) {
  try {
    await admin.auth().setCustomUserClaims(userId, { role: "admin" });
    console.log(`✅ Admin role assigned to user: ${userId}`);
  } catch (error) {
    console.error("❌ Error assigning admin role:", error);
  }
}

// Replace with actual user ID
const userId = "p4Ujex5CiOO4tktxsABTqkXeCgQ2";
setAdminRole(userId);
