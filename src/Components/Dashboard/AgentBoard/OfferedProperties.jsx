import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthProvider';
import { SiVerizon } from "react-icons/si";
import { RxCross1 } from "react-icons/rx";
import toast, { Toaster } from 'react-hot-toast';

const OfferedProperties = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext)
  const { data: reqItem = [], refetch, isLoading } = useQuery({
    queryKey: ['offeredItem', user?.email],
    enabled: !!user?.displayName,
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?name=${user.displayName}&status=pending`)
      return res.data
    }
  })

  const handleConfirm = async (id) => {
    try {
      const res = await axiosSecure.patch(`/offers/${id}`)
      if (res.data.modifiedCount > 0) {
        toast.success('Offer confirmed')
        refetch()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleReject = (id) => {
    axiosSecure.patch(`/rejectOffer/${id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          toast.success('Offer has been rejected')
          refetch()
        }
      })
      .catch(error => {
        toast.error(error.message)
      })
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Toaster />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Offered Properties</h2>
        <span className="badge badge-primary badge-lg">{reqItem.length} pending</span>
      </div>

      {reqItem.length === 0 ? (
        <div className="text-center py-24 rounded-2xl bg-base-200">
          <p className="text-lg font-medium">No pending offers</p>
          <p className="text-sm text-gray-500">New offers on your properties will show up here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="table">
            {/* head */}
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Location</th>
                <th>Buyer Email</th>
                <th>Buyer Name</th>
                <th>Offered Price</th>
                <th className="text-center">Accept</th>
                <th className="text-center">Reject</th>
              </tr>
            </thead>
            <tbody>
              {reqItem.map((item, index) => (
                <tr key={item._id} className="hover:bg-base-200">
                  <th>{index + 1}</th>
                  <td className="font-medium">{item.title}</td>
                  <td>{item.location}</td>
                  <td>{item.userEmail}</td>
                  <td>{item.userName}</td>
                  <td className="font-semibold text-success">${item.offerAmount}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleConfirm(item._id)}
                      className="btn btn-circle btn-sm btn-ghost text-green-600 hover:bg-green-100"
                      title="Accept"
                    >
                      <SiVerizon />
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleReject(item._id)}
                      className="btn btn-circle btn-sm btn-ghost text-red-600 hover:bg-red-100"
                      title="Reject"
                    >
                      <RxCross1 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OfferedProperties;