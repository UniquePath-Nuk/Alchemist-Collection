import { useState, useEffect } from "react";
import { db } from "../../backend/lib/firebaseClient";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import CarForm from "../components/CarForm";
import CarList from "../components/CarList";

export default function CarsManager({ user }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");
  const [editingCar, setEditingCar] = useState(null);

  const carsRef = collection(db, "cars");

  async function fetchCars() {
    setLoading(true);
    try {
      const q = query(carsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setCars(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  function handleOpenCreate() {
    setEditingCar(null);
    setViewMode("form");
  }

  function handleOpenEdit(car) {
    setEditingCar(car);
    setViewMode("form");
  }

  async function handleSaveCar(formData) {
    try {
      if (editingCar) {
        const carDoc = doc(db, "cars", editingCar.id);
        await updateDoc(carDoc, {
          ...formData,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(carsRef, {
          ...formData,
          authorEmail: user?.email || "Admin",
          createdAt: serverTimestamp(),
        });
      }
      setViewMode("list");
      setEditingCar(null);
      fetchCars();
    } catch (error) {
      console.error("Error saving car:", error);
    }
  }

  async function handleDeleteCar(id) {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteDoc(doc(db, "cars", id));
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 md:p-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-text">Inventory Management</h1>
        <p className="mt-0.5 text-xs text-text-faint">Create, update, and manage public car listings.</p>
      </div>

      {viewMode === "list" ? (
        <CarList
          cars={cars}
          loading={loading}
          onCreateNew={handleOpenCreate}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteCar}
        />
      ) : (
        <CarForm
          editingCar={editingCar}
          onSubmit={handleSaveCar}
          onCancel={() => setViewMode("list")}
        />
      )}
    </div>
  );
}
