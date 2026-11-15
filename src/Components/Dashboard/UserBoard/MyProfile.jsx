import { useContext } from "react"
import { MdEmail, MdCalendarToday, MdVerified } from "react-icons/md"
import { AuthContext } from "../../Authentication/AuthProvider"
import useAdmin from "../../Hooks/useAdmin"
import useAgent from "../../Hooks/useAgent"

const MyProfile = () => {
  const { user } = useContext(AuthContext)
  const [isAdmin] = useAdmin()
  const [isAgent] = useAgent()
  const role = isAdmin ? 'admin' : isAgent ? 'agent' : 'user'
  const joined = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const infoItems = [
    { icon: <MdEmail size={20} />, label: 'Email', value: user?.email },
    { icon: <MdCalendarToday size={20} />, label: 'Joined', value: joined },
    { icon: <MdVerified size={20} />, label: 'Status', value: 'Active', highlight: true },
  ]

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="card bg-base-100 shadow-xl overflow-hidden">

        {/* Cover */}
      <div className="h-28 bg-gradient-to-r from-slate-800 to-slate-600"></div>

        <div className="card-body items-center text-center pt-0">

          {/* Image (cover er upor overlap) */}
          <div className="avatar -mt-12">
            <div className="w-24 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2 bg-base-200">
              <img
                src={user?.photoURL || 'https://i.ibb.co/2kR5zq0/user.png'}
                alt="profile"
              />
            </div>
          </div>

          {/* Name */}
          <h2 className="card-title text-2xl mt-2">{user?.displayName}</h2>

          {/* Role: shudhu user na hole dekhabe */}
          {role !== 'user' && (
            <span className="badge badge-success badge-lg capitalize">{role}</span>
          )}

          {/* Info */}
          <div className="w-full mt-6 space-y-3">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 bg-base-200 rounded-xl px-4 py-3 text-left"
              >
                <span className="text-primary">{item.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p
                    className={`font-medium truncate ${
                      item.highlight ? 'text-success' : ''
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
export default MyProfile;