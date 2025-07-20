import DashboardLayout from '../layout/DashboardLayout';
const DashboardPage = () => {
    return (
        <DashboardLayout>
            <div className='flex flex-wrap w-7/12 m-auto'>
                <p className='text-blue-950 font-bold text-xl' >TUS ESPACIOS DE TRABAJO</p>
                <div className='w-full flex flex-wrap gap-6 mt-8'>
                    {[1,2,3,4, 5].map((item) => (
                        <div key={item} className='bg-white rounded-lg shadow-md w-56 flex flex-col'>
                            <img src={`https://picsum.photos/seed/${item}/120/80`} alt='Card' className=' rounded-t-md  w-full h-20 object-cover'/>
                            <span className='text-gray-800 font-medium text-base p-2'>Título {item}</span>
                        </div>
                    ))}
                </div>
            </div>
            
        </DashboardLayout>
    )
}

export default DashboardPage