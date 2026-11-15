import React, { useContext } from 'react';
import SectionTitle from '../../Shared/SectionTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Authentication/AuthProvider';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PropertyBought = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext)
  const { data: boughtItem = [], isLoading ,refetch} = useQuery({
    queryKey: ['boughtItem', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?email=${user.email}`)
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
  const handleDelete=async(id)=>{
    console.log(id);
    const res=await axiosSecure.delete(`/offers/${id}`)
    if (res.data.deletedCount > 0) {
  toast.success('Deleted successfully')
  refetch()
}
  }
  return (
    <div>
      <SectionTitle heading='my bougth item'></SectionTitle>

      {boughtItem.length === 0 ? (
        <div className="text-center py-24 mx-8 rounded-2xl bg-base-200">
          <p className="text-lg font-medium">You haven't bought any property yet</p>
          <p className="text-sm text-gray-500 mb-5">Properties you make an offer on will show up here.</p>
          <Link to="/" className="btn btn-primary btn-sm">Browse properties</Link>
        </div>
      ) : (
        <div className="overflow-x-auto ml-8 md:size-220">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Img</th>
                <th>Title</th>
                <th>Agent</th>
                <th>Location</th>
                <th>off.amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {boughtItem.map(item => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt={item.title} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.agentName}</td>
                  <td>{item.location}</td>
                  <td>${item.offerAmount}</td>
                  <td>
                    {item.status === 'Confirm'
                      ? <p className="text-green-600">{item.status}</p>
                      : <p>{item.status}</p>
                    }
                  </td>
                  <td>
                    {item.status === 'Confirm' ? (
                      <Link to={`/payment/${item._id}`}>
                        <button className="btn btn-sm bg-yellow-700">Pay</button>
                      </Link>
                    ) : (
                       <button onClick={()=>handleDelete(item._id)} className="btn btn-sm"><FaTrash color='red'></FaTrash></button>
                    )}
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

export default PropertyBought;