import React, { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext)
  const { data: reviewData = [], refetch, isLoading } = useQuery({
    queryKey: ['review', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/review?email=${user.email}`)
      return res.data
    }
  })

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleDelete = (id) => {
    axiosSecure.delete(`/review/${id}`)
      .then(res => {
        if (res.data.deletedCount > 0) {
          toast.success('Review deleted successfully')
          refetch()
        }
      })
      .catch(error => {
        toast.error('Something went wrong. Please try again')
      })
  }

  return (
    <div className="p-8">
      <Toaster />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">My Reviews</h2>
        <span className="badge badge-primary badge-lg">{reviewData.length} total</span>
      </div>

      {reviewData.length === 0 ? (
        <div className="text-center py-24 rounded-2xl bg-base-200">
          <p className="text-lg font-medium">You haven't added any reviews yet</p>
          <p className="text-sm text-gray-500">Reviews you write will show up here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="table">
            {/* head */}
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Review Time</th>
                <th>Review Description</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {reviewData.map((item, index) => (
                <tr key={item._id} className="hover:bg-base-200">
                  <th>{index + 1}</th>
                  <td className="font-medium">{item.title}</td>
                  <td className="whitespace-nowrap">{item.reviewTime}</td>
                  <td className="max-w-xs">{item.description}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost btn-circle btn-sm hover:bg-red-100"
                      title="Delete"
                    >
                      <FaTrashAlt className="text-red-500" />
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

export default MyReviews;