import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../Authentication/AuthProvider';

const AddReview = () => {
  const data = useLoaderData()
  const axiosPublic = useAxiosPublic()
  const { user } = useContext(AuthContext)

  const handlesubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const review = form.review.value
    const reviewInfo = {
      email: user?.email,
      title: data.title,
      reviewerName: user?.displayName,
      reviewerImage: user?.photoURL,
      reviewTime: new Date(),
      description: review
    }

    axiosPublic.post('/review', reviewInfo)
      .then(res => {
        if (res.data.insertedId) {
          toast.success('Your review has been added!')
          form.reset()
        }
        else {
          toast.error("Something went wrong. Try again")
        }
      })
      .catch(error => {
        toast.error(error.message)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Toaster />

      <div className="card bg-base-100 w-full max-w-lg shadow-xl overflow-hidden">
        <figure className="h-56">
          <img
            src={data.image}
            alt={data.title}
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="card-body gap-4">
          <div>
            <p className="text-sm text-gray-500">You are reviewing</p>
            <h2 className="card-title text-2xl">{data.title}</h2>
          </div>

          <form onSubmit={handlesubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <textarea
                name="review"
                required
                className="textarea textarea-bordered w-full h-32 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Share your experience about this property..."
              ></textarea>
            </div>

            <button className="btn btn-primary btn-block">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;