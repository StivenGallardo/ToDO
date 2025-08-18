import { useWorkSpaceStore } from '../../hooks/useWorkSpaceStore';
import DashboardLayout from '../layout/DashboardLayout';
const DashboardPage = () => {

    const {workSpaces} =useWorkSpaceStore();

    return (
        <DashboardLayout>
            <div className='flex flex-wrap w-7/12 m-auto'>
                <p className='text-blue-950 font-bold text-xl' >TUS ESPACIOS DE TRABAJO</p>
                <div className='w-full flex flex-wrap gap-6 mt-8'>
                    {workSpaces.map((item) => (
                        <div key={item.id} className='bg-white rounded-lg shadow-md w-56 flex flex-col'>
                            <img src={item.cover_image} alt='Card' className=' rounded-t-md  w-full h-20 object-cover'/>
                            <span className='text-gray-800 font-medium text-base p-2'> {item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            
        </DashboardLayout>
    )
}

export default DashboardPage