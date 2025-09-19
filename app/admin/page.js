import React from 'react'

import Link from 'next/link'




const dashboard  = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-700 to-purple-500 text-white p-5 space-y-6">
        <h2 className="text-xl font-bold">HEAL WELL</h2>
        {/* <nav className="space-y-4">
          {["Dashboard", "Doctors", "Treatment", "Pharmacy", "Patient"].map((item) => (
            <a key={item} href='#' className="block hover:bg-purple-600 p-2 rounded-lg">
              {item}
            </a>
          ))}
        </nav> */}
        <div className="space-y-4">
             <Link href="/admin" className="block hover:bg-purple-600 p-2 rounded-lg">Dashboard</Link>
             <Link href="/doctor" className="block hover:bg-purple-600 p-2 rounded-lg">Doctor</Link>
              <Link href="/pharmacy" className="block hover:bg-purple-600 p-2 rounded-lg">Pharmacy</Link>
               <Link href="/paitents" className="block hover:bg-purple-600 p-2 rounded-lg">Paitent</Link>
               
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-semibold">Madhusha</span>
          <span className="font-semibold">Prasad</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
          {[
            { title: "Total Patient", value: 20 },
            { title: "Total Doctors", value: 20 },

          ].map((card, i) => (
            <div key={i} className="bg-white text-black shadow rounded-xl p-4 text-center">
              <p className="text-xl font-bold">{card.value}</p>
              <p className="text-gray-500">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Graph + Appointments */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Patients Graph Placeholder */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold mb-2">Patients</h3>
            <div className="h-40 flex items-center justify-center text-gray-400">
              [Graph Placeholder]
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold mb-2">Appointments</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2">Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Chance Vences", date: "14.10.2023", status: "Rejected" },
                  { name: "Dexien Kenter", date: "18.10.2023", status: "Pending" },
                  { name: "Patijo Lukir", date: "19.10.2023", status: "Pending" },
                  { name: "Emerson Suerten", date: "20.10.2023", status: "Approved" },
                ].map((app, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{app.name}</td>
                    <td>{app.date}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          app.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Doctors */}
        <div className="bg-white shadow rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-2">Recent Doctors</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-600">
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Charge</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, name: "John", mobile: "12345", charge: "2000", status: "Online" },
                { id: 2, name: "Smith", mobile: "67890", charge: "2500", status: "Offline" },
              ].map((doc, i) => (
                <tr key={i} className="border-b">
                  <td>{doc.id}</td>
                  <td>{doc.name}</td>
                  <td>{doc.mobile}</td>
                  <td>{doc.charge}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        doc.status === "Online"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Out of Stock */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold mb-2">Out of Stock</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-600">
                <th>ID</th>
                <th>Drug</th>
                <th>Expiry</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, drug: "Paracetamol", expiry: "2025-10-12", qty: 0 },
                { id: 2, drug: "Azinole", expiry: "2025-12-21", qty: 0 },
              ].map((item, i) => (
                <tr key={i} className="border-b">
                  <td>{item.id}</td>
                  <td>{item.drug}</td>
                  <td>{item.expiry}</td>
                  <td>{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default dashboard 