"use client";
import {
  createCarThunk,
  deleteCarThunk,
  getAllCarsThunk,
  updateCarThunk,
} from "@/redux/slices/carSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@mui/material";
import { AttachMoney, CalendarToday, Phone } from "@mui/icons-material";
import { carDefaultImage } from "@/assets/defaultImages";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CarType } from "@/types/carType";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { getUserThunk } from "@/redux/slices/userSlice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { cars: carsData, accessToken } = useSelector(
    (state: RootState) => state.car
  );
  const { accessToken: authAccessToken } = useSelector(
    (state: RootState) => state.auth
  );
  const { user }: any = useSelector((state: RootState) => state.user);

  const [cars, setCars] = useState([]);
  const [carDialog, setCarDialog] = useState(false);
  const [editingCar, setEditingCar] = useState(false);
  const [carData, setCarData] = useState<CarType>({
    id: "",
    make: "",
    model: "",
    year: "",
    price: "",
    contactNumber: "",
    description: "",
    image_url: null,
  });

  useEffect(() => {
    dispatch(getAllCarsThunk());
    authAccessToken && dispatch(getUserThunk(authAccessToken));
  }, []);

  useEffect(() => {
    setCars(carsData);
  }, [carsData]);

  const handleOpenCarDialog = (car?: CarType) => {
    if (!user.id) {
      router.push("un-auth-user-feature");
      return;
    }

    if (car) setEditingCar(true);
    setCarData(
      car || {
        id: "",
        make: "",
        model: "",
        year: "",
        price: "",
        contactNumber: "",
        description: "",
        image_url: null,
      }
    );
    setCarDialog(true);
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setCarData({ ...carData, image_url: file });
  }

  function handleCloseCarDialog() {
    setEditingCar(false);
    setCarDialog(false);
  }

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("make", carData.make);
    formData.append("model", carData.model);
    formData.append("year", carData.year);
    formData.append("price", carData.price);
    formData.append("contactNumber", carData.contactNumber);
    formData.append("description", carData.description);
    if (carData.image_url instanceof File)
      formData.append("image_url", carData.image_url);

    if (editingCar) {
      dispatch(
        updateCarThunk({ accessToken, carId: carData.id, formData })
      ).then(() => dispatch(getAllCarsThunk()));
    } else {
      dispatch(createCarThunk({ accessToken, formData })).then(() =>
        dispatch(getAllCarsThunk())
      );
    }
    handleCloseCarDialog();
  };

  function handleDeleteCar(carId: string) {
    dispatch(deleteCarThunk({ accessToken, carId })).then(() =>
      dispatch(getAllCarsThunk())
    );
  }
  return (
    <div className="p-2">
      <div className="text-center">
        <Button
          onClick={() => handleOpenCarDialog()}
          size="lg"
          className="mb-3 bg-blue-200 text-dark hover:bg-blue-300 transition duration-200 rounded-4xl"
        >
          <Plus /> Add New Ads
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 space-x-2 space-y-2">
        {cars.map((car: any) => (
          <Card
            className="hover:scale-101 duration-100"
            style={{ padding: "0", cursor: "pointer" }}
            onClick={() => console.log("got to details page")}
            key={car.id}
          >
            {user?.id === car.userId && (
              <div className="flex justify-between p-1">
                <Button
                  onClick={() => handleDeleteCar(car.id)}
                  variant="outline"
                >
                  <Trash className="text-red-500" />
                </Button>
                <Button
                  onClick={() => handleOpenCarDialog(car)}
                  variant="outline"
                  size="sm"
                >
                  <Pencil />
                </Button>
              </div>
            )}
            <img
              src={car.image_url || carDefaultImage}
              className="h-50"
              style={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {car.make} {car.model}
              </Typography>
              <div className="w-full flex justify-between">
                <div className="flex space-x-1">
                  <CalendarToday style={{ fontSize: "20px" }} />
                  <Typography variant="body2" color="text.secondary">
                    {car.year}
                  </Typography>
                </div>
                <div className="flex space-x-1">
                  <AttachMoney style={{ fontSize: "20px" }} />
                  <Typography variant="body2" color="text.secondary">
                    {car.price}
                  </Typography>
                </div>
                <div className="flex space-x-1">
                  <Phone style={{ fontSize: "20px" }} />
                  <Typography variant="body2" color="text.secondary">
                    {car.contactNumber}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={carDialog} onOpenChange={handleCloseCarDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCar ? "Edite" : "Add"}</DialogTitle>
          </DialogHeader>
          <div>
            <Label className="my-2" htmlFor="make">
              Make
            </Label>
            <Input
              id="make"
              name="make"
              value={carData.make}
              onChange={handleInputChange}
              placeholder="Car Make"
              required
            />
            <Label className="my-2" htmlFor="model">
              Model
            </Label>
            <Input
              id="model"
              name="model"
              value={carData.model}
              onChange={handleInputChange}
              placeholder="Car Model"
              required
            />
            <Label className="my-2" htmlFor="year">
              Year
            </Label>
            <Input
              type="number"
              id="year"
              name="year"
              value={carData.year}
              onChange={handleInputChange}
              placeholder="Car Year"
              required
            />
            <Label className="my-2" htmlFor="number">
              Price
            </Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={carData.price}
              onChange={handleInputChange}
              placeholder="Car Price"
              required
            />
            <Label className="my-2" htmlFor="description">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={carData.description}
              onChange={handleInputChange}
              placeholder="Car Description"
              required
            />
            <Label className="my-2" htmlFor="contactNumber">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              value={carData.contactNumber}
              onChange={handleInputChange}
              placeholder="Contact Number"
              required
            />
            <Label className="my-2" htmlFor="image_url">
              Car Image (Optional)
            </Label>
            <Input
              type="file"
              id="image_url"
              name="image_url"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handleCloseCarDialog}
              style={{ backgroundColor: "#ebe2e1", color: "black" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              style={{ backgroundColor: "#a0a7eb", color: "black" }}
            >
              {editingCar ? "Save" : "Add"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
