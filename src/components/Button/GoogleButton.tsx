import Image from 'next/image'
import Google from '@/assets/Login/google.svg'

interface Props {
     className?: string,
     onClick?: () => void
}

export const GoogleButton: React.FC<Props> = ({ className, onClick }) => {
     return <button type="button" onClick={onClick} className={`${className} flex flex-row items-center justify-center gap-x-4 bg-white text-black hover:bg-gray-300 px-11 py-3 rounded-md`}>
          <Image
               src={Google}
               alt='google logo'
               width={24}
               height={24}
          />
          <p>เข้าสู่ระบบด้วย  Google</p>
     </button>
}