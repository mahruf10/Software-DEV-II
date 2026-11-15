import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MySoldProperties = () => {
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()
  const { data: soldData = [], isLoading } = useQuery({
    queryKey: ['soldData', user?.email],
    enabled: !!user?.displayName,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?name=${user.displayName}`)
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

  const totalSold = soldData.reduce((sum, item) => sum + Number(item.price || 0), 0)

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-3xl font-bold">My Sold Properties</h2>
        <div className="flex gap-2">
          <span className="badge badge-primary badge-lg">{soldData.length} sold</span>
          <span className="badge badge-success badge-lg">Total: ${totalSold}</span>
        </div>
      </div>

      {soldData.length === 0 ? (
        <div className="text-center py-24 rounded-2xl bg-base-200">
          <p className="text-lg font-medium">No properties sold yet</p>
          <p className="text-sm text-gray-500">Your sold properties will show up here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="table">
            {/* head */}
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Buyer Email</th>
                <th>Transaction Id</th>
                <th>Date</th>
                <th>Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {soldData.map((item, index) => (
                <tr key={item._id} className="hover:bg-base-200">
                  <th>{index + 1}</th>
                  <td className="font-medium">{item.userEmail}</td>
                  <td>
                    <span className="badge badge-ghost font-mono text-xs">{item.transactionId}</span>
                  </td>
                  <td className="whitespace-nowrap">
                    {item.date ? new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }) : ''}
                  </td>
                  <td className="font-semibold text-success">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySoldProperties;