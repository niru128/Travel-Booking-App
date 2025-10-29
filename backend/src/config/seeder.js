import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "../model/ExperienceModel.js";

dotenv.config();

const sampleExperiences = [
  {
    title: "Scuba Diving in Goa",
    location: "Goa, India",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description:
      "Experience the thrill of diving into the Arabian Sea with professional guides.",
    pricePerPerson: 3500,
    availableSlots: [
      {
        date: "2025-11-01",
        times: [
          { time: "10:00 AM" },
          { time: "2:00 PM" },
          { time: "5:00 PM" },
        ],
      },
    ],
  },
  {
    title: "Camping in Coorg",
    location: "Karnataka, India",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description:
      "Spend a night under the stars surrounded by nature in Coorg’s scenic hills.",
    pricePerPerson: 2000,
    availableSlots: [
      {
        date: "2025-11-03",
        times: [
          { time: "9:00 AM" },
          { time: "1:00 PM" },
        ],
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Experience.deleteMany();
    await Experience.insertMany(sampleExperiences);
    console.log("🌱 Sample data inserted!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedDatabase();
