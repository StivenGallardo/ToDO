import { useWorkSpaceStore } from '../../hooks/useWorkSpaceStore';
import DashboardLayout from '../layout/DashboardLayout';
import ColumnsDnDWorkSpace from '../components/ColumnsDnDWorkSpace';
const WorkSpacePage = () => {

    const {selectedWorkSpace} = useWorkSpaceStore();

    return (
        <DashboardLayout classNameMain='overflow-hidden'>
            <div className='flex flex-wrap w-full px-7 py-3 bg-blue-950'>
                <p className='text-white font-bold text-xl' >{selectedWorkSpace.name}</p>
            </div>

           
            <ColumnsDnDWorkSpace />
           
            
        </DashboardLayout>
    )
}

export default WorkSpacePage