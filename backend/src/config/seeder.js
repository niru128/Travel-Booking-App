import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "../model/ExperienceModel.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

// Helper function to generate next 5 days with random booked slots
const generateAvailableSlots = () => {
  const slots = [];
  const times = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const slotTimes = times.map((time) => ({
      time,
      isBooked: Math.random() < 0.3, // 30% chance that slot is booked
    }));

    slots.push({ date: formattedDate, times: slotTimes });
  }

  return slots;
};

const experiences = [
  {
    title: "Mysore Palace Tour",
    description:
      "Explore the royal heritage of Mysore Palace with a guided cultural experience.",
    location: "Mysore",
    pricePerPerson: 499,
    category: "Historical",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Mysore_Palace_Morning.jpg",
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Coorg Coffee Plantation Visit",
    description:
      "Discover the art of coffee making amidst lush green plantations of Coorg.",
    location: "Coorg",
    pricePerPerson: 799,
    category: "Nature",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Coorg_coffee_plantation.jpg",
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Gokarna Beach Camping",
    description:
      "Enjoy a serene beach camping experience with bonfire and stargazing by the sea.",
    location: "Gokarna, Karnataka",
    pricePerPerson: 1299,
    category: "Adventure",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/58/Gokarna_Beach_View.jpg",
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Nandi Hills Sunrise Trek",
    description:
      "Witness breathtaking sunrise views from Nandi Hills with a morning trek.",
    location: "Nandi Hills, Bangalore",
    pricePerPerson: 599,
    category: "Trekking",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/94/Nandi_Hills_Sunrise.jpg",
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Kabini Wildlife Safari",
    description:
      "Get close to nature with an exciting jeep safari at Kabini Wildlife Sanctuary.",
    location: "Kabini, Karnataka",
    pricePerPerson: 1499,
    category: "Wildlife",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/Kabini_Tiger_Safari.jpg",
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Hampi Heritage Walk",
    description:
      "Step into history with a guided heritage walk through the ancient ruins of Hampi.",
    location: "Hampi, Karnataka",
    pricePerPerson: 699,
    category: "Historical",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Hampi_Stone_Chariot.jpg",
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Chikmagalur Hill Retreat",
    description:
      "Relax amidst misty hills and scenic coffee estates at Chikmagalur.",
    location: "Chikmagalur, Karnataka",
    pricePerPerson: 999,
    category: "Nature",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e2/Chikmagalur_hills.jpg",
    availableSlots: generateAvailableSlots(),
  },
  {
    title: "Jog Falls Adventure Trail",
    description:
      "Embark on an adventurous trail to one of the tallest waterfalls in India – Jog Falls.",
    location: "Shimoga, Karnataka",
    pricePerPerson: 899,
    category: "Adventure",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Jog_Falls_in_full_flow.jpg",
    availableSlots: generateAvailableSlots(),
  },
];

const importData = async () => {
  try {
    await Experience.deleteMany();
    await Experience.insertMany(experiences);
    console.log("✅ 8 Experiences imported with random full slots!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

importData();
