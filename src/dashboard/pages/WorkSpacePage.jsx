import { useWorkSpaceStore } from '../../hooks/useWorkSpaceStore';
import DashboardLayout from '../layout/DashboardLayout';
const WorkSpacePage = () => {

    const {selectedWorkSpace} = useWorkSpaceStore();

    return (
        <DashboardLayout>
            <div className='flex flex-wrap w-full px-7 py-3 bg-blue-950'>
                <p className='text-white font-bold text-xl' >{selectedWorkSpace.name}</p>
            </div>

            <div className='w-full px-7 py-3 cols-12 flex flex-wrap gap-4 items-start bg-blue-400 min-h-screen'>

                <div className='flex flex-wrap w-2/12 bg-gray-100 p-3 rounded-lg shadow-md '>
                    <p className='text-blue-950 font-semibold'>Por hacer</p>
                    <li className='flex items-center px-3 w-full h-10 bg-white rounded-lg mt-2 cursor-pointer'>
                        <span className='text-blue-950 font-semibold'>Lista 1</span>
                    </li>

                    <li className='flex items-center px-3 w-full h-10 bg-white rounded-lg mt-2 cursor-pointer'>
                        <span className='text-blue-950 font-semibold'>Lista 2</span>
                    </li>
                </div>

                <div className='flex flex-wrap w-2/12 bg-blue-500 p-3 cursor-pointer rounded-lg shadow-md'>
                    <p className='text-white font-semibold'> + Añadir lista</p>
                </div>
            </div>
            
        </DashboardLayout>
    )
}

export default WorkSpacePage