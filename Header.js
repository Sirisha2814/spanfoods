"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/features/auth/authSlice'

function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout()).then(
      ()=>{

        router.push('/login')
      }
    )
  }

  return (
    <header className='flex items-center justify-between p-2 bg-blue-500 text-black'>
      <div> 
        <Link href='/'>
          <p className='text-1xl font-semibold'>Span Foods</p>
        </Link>
      </div>
      <ul className='flex items-center space-x-2'>
        {user ? (
          <li>
            <button className='bg-white text-blue-500 hover:bg-blue-500 hover:text-black font-semibold py-1 px-2 rounded' onClick={onLogout} >
            <Image
             src="/logout.png"
             width={30}
             height={10}
             alt="logout pic" /> Logout
            </button>
          
          </li>
        ) : (
          <>
            <li>
              <Link href='/login'>
                <p className='bg-white text-black-500 hover:bg-blue-500 hover:text-black font-semibold py-2 px-4 rounded'>Login</p>
              </Link>
            </li>
            <li>
              <Link href='/register'>
                <p className='bg-white text-black-500 hover:bg-blue-500 hover:text-black font-semibold py-2 px-4 rounded'>Register</p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
   )
   
}

export default Header