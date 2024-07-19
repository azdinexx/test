import Aside from "@/components/aside";
import { NotificationSvg } from "@/components/icons/notification";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Aside/>
        <main className='flex flex-col w-full'>
        <Header/>
        {children}
     </main>
    </>
  );
}


function Header({firtName = 'Yahya' , lastName = 'Ajakal' , role='Agent'}) {
    return (
        <header className='bg-white shadow-sm border-b p-4 w-full flex justify-end items-center '>
            <NotificationBar/>
            <div className='ml-4 pl-4 border-l flex gap-2'>
                <div className='w-10 h-10 bg-gray-200 rounded-md overflow-hidden flex justify-center items-center text-2xl font-bold text-gray-500 '>

                    {
                        firtName[0].toUpperCase()
                    }
                    {
                        lastName[0].toUpperCase()
                    }
                </div>
                <p className='flex flex-col text-sm text-gray-700'>
                    <span>{firtName + ' ' + lastName}</span>
                    <span className='text-xs text-gray-400' >{role}</span>
                </p>
            </div>
        </header>
    )
}


function NotificationBar() {
    return (
        <div className="relative">
            <NotificationSvg className='w-6 h-6' />
            <div className="text-xs absolute top-0 -right-1 bg-red-500 text-white w-4 h-4 text-center rounded-full">3</div>
        </div>
    )
}