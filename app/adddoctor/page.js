// "use client";
// import {Loader2} from "lucide-react"
// import React, { useState } from "react";
// import { uploadToCloudinary } from "../lib/config/uploadToCloudiary";
// const AddDoctorPage = () => {
//   const[loading,setLoading]=useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     degree: "",
//     fees: "",
//     licenseNumber: "",
//     gender: "",
//     image:"",
//     specialization: "",
//   });
// const changeFileHandler = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setLoading(true);

//     try {
//       const url = await uploadToCloudinary(file);
//       setFormData((prev) => ({ ...prev, image: url }));

//       console.log(url);

//       alert("File uploaded successfully");
//     } catch (err) {
//       console.error(err);
  
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();  

//     try {
//       const res = await fetch("/api/auth/adddoctor", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({

// name:formData?.name,
//     mobile:formData?.mobile,
//     degree:formData?.degree,
//     fees:formData?.fees,
//     licenseNumber:formData?.licenseNumber,
//     gender:formData?.gender,
//     imageUrl:formData?.image,
//     specialization:formData?.specialization,





//         }),
//       });

//       const result = await res.json();

//       if (result.succes="true") {
//         alert("Doctor added successfully!");
//         setFormData({
//           name: "",
//           mobile: "",
//           degree: "",
//           fees: "",
//           licenseNumber: "",
//           gender: "",
//           image: null,
//           specialization: "",
//         });
//       } else {
//         console.log(result)
//         alert("Failed to add doctor: " + result.error);
//       }
//     } catch (error) {
//       alert("An error occurred: " + error.message);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData((prev) => ({ ...prev, image: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   return (
//     <div className="min-h-screen text-black bg-white flex items-center justify-center p-6">
//       <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
//         <h2 className="text-3xl font-semibold mb-6 text-gray-900">Add New Doctor</h2>
//         <form
    
//           className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
//         >
//           <div className="flex flex-col">
//             <label htmlFor="name" className="mb-2 font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               type="text"
//               required
//               className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
//               placeholder="Doctor's full name"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="mobile" className="mb-2 font-medium text-gray-700">
//               Mobile
//             </label>
//             <input
//               id="mobile"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               type="tel"
//               pattern="[0-9]{10}"
//               required
//               className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
//               placeholder="10-digit mobile number"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="degree" className="mb-2 font-medium text-gray-700">
//               Degree
//             </label>
//             <input
//               id="degree"
//               name="degree"
//               value={formData.degree}
//               onChange={handleChange}
//               type="text"
//               required
//               className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
//               placeholder="e.g., MBBS, MD"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="fees" className="mb-2 font-medium text-gray-700">
//               Fees
//             </label>
//             <input
//               id="fees"
//               name="fees"
//               value={formData.fees}
//               onChange={handleChange}
//               type="number"
//               min="0"
//               required
//               className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
//               placeholder="Consultation fees"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="licenseNumber" className="mb-2 font-medium text-gray-700">
//               License Number
//             </label>
//             <input
//               id="licenseNumber"
//               name="licenseNumber"
//               value={formData.licenseNumber}
//               onChange={handleChange}
//               type="text"
//               required
//               className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
//               placeholder="Medical license number"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="gender" className="mb-2 font-medium text-gray-700">
//               Gender
//             </label>
//             <select
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               required
//               className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
//             >
//               <option value="" disabled>
//                 Select Gender
//               </option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="specialization" className="mb-2 font-medium text-gray-700">
//               Specialization
//             </label>
//             <input
//               id="specialization"
//               name="specialization"
//               value={formData.specialization}
//               onChange={handleChange}
//               type="text"
//               required
//               className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
//               placeholder="e.g., Cardiologist"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="image" className="mb-2 font-medium text-gray-700">
//               Image
//             </label>
//             <input
//               id="image"
//               name="image"
//               type="file"
//               accept="image/*"
//               onChange={changeFileHandler}
//               className="bg-white"
//             />
//             {formData.image && (
//               <p className="mt-2 text-sm text-gray-600">
//                 Selected file: {formData.image.name}
//               </p>
//             )}
//           </div>

//           {/* Empty div to fill grid column for alignment */}
//           <div></div>

//           <button
//             type="submit"
//             onClick={ handleSubmit}
//             className="w-full md:col-span-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded transition"
//           >
//             {loading?<Loader2 className="animate-spin"></Loader2>:"Add"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDoctorPage;




"use client";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { uploadToCloudinary } from "../lib/config/uploadToCloudiary";

const AddDoctorPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    degree: "",
    fees: "",
    licenseNumber: "",
    gender: "",
    image: "",
    specialization: "",
  });

  // Upload image to Cloudinary
  const changeFileHandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: url }));
      alert("File uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/adddoctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
          degree: formData.degree,
          fees: formData.fees,
          licenseNumber: formData.licenseNumber,
          gender: formData.gender,
          specialization: formData.specialization,
          imageUrl: formData.image,
        }),
      });

      const result = await res.json();

      if (result.success) {
        alert("Doctor added successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          mobile: "",
          degree: "",
          fees: "",
          licenseNumber: "",
          gender: "",
          image: "",
          specialization: "",
        });
      } else {
        alert("Failed to add doctor: " + result.message);
      }
    } catch (err) {
      alert("An error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Add New Doctor</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Doctor's full name"
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="doctor@example.com"
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Temporary Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Temporary password"
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
              placeholder="10-digit mobile number"
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Degree */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              placeholder="MBBS, MD, etc."
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Fees */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Fees</label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              min="0"
              required
              placeholder="Consultation fees"
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* License Number */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
              placeholder="Medical license number"
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Specialization */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              placeholder="Cardiologist, Neurologist, etc."
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Image */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Image</label>
            <input type="file" name="image" accept="image/*" onChange={changeFileHandler} />
            {formData.image && <p className="mt-2 text-sm text-gray-600">File uploaded</p>}
          </div>

          {/* Submit button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded transition"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorPage;
