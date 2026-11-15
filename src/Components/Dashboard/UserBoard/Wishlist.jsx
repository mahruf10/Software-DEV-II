import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { MdLocationOn, MdDeleteOutline } from 'react-icons/md';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Authentication/AuthProvider';

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: wishlistData = [], refetch, isLoading } = useQuery({
    queryKey: ['wishlist', user?.email],
    enabled: !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/wishlist?email=${user.email}`)).data,
  });

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/wishlist/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success('Removed from wishlist');
          refetch();
        }
      })
      .catch((err) => toast.error(err.message));
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <Toaster />

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">My Wishlist</h2>
        <span className="badge badge-primary badge-lg">{wishlistData.length} saved</span>
      </div>

   {wishlistData.length === 0 ? (
  <div className="text-center py-24 rounded-2xl bg-base-200">
    <p className="text-lg font-medium">Your wishlist is empty</p>
    <p className="text-sm text-gray-500 mb-5">Save properties you like and they will show up here.</p>
    <Link to="/" className="btn btn-primary btn-sm">Browse properties</Link>
  </div>
) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistData.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden"
            >
              <figure className="relative h-52">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover hover:scale-105 transition duration-500"
                />
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-circle btn-sm absolute top-3 right-3 bg-white/90 border-0 text-red-500 hover:bg-red-500 hover:text-white"
                  title="Remove"
                >
                  <MdDeleteOutline size={18} />
                </button>
              </figure>

              <div className="card-body gap-2">
                <h3 className="card-title line-clamp-1">{item.title}</h3>
                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <MdLocationOn className="text-primary" /> {item.location}
                </p>
                <p className="text-lg font-semibold text-primary">
                  ${item.priceRange?.min} - ${item.priceRange?.max}
                </p>
                <Link to={`/makeanoffer/${item._id}`} className="btn btn-primary btn-block mt-2">
                  Make an offer
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;