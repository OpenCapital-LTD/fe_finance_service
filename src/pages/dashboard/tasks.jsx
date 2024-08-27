import { CloseOutlined } from '@mui/icons-material'
import '../../assets/styles/tasks.scss'
import { useGiraf } from '../../giraff'

const Tasks = () => {
    const { gHead, addGHead } = useGiraf()
    return (
        <div className='task_box'>
            <div className='main_box'>
                <CloseOutlined className='close' onClick={() => {
                    addGHead('task_box', false)
                }} />

                <label>
                    <p>Task Name</p>
                    <input placeholder='name of task' type='text' />
                </label>
                <label>
                    <p>Due Date</p>
                    <input placeholder='' type='date' />
                </label>
                <div className='save'>Save</div>
            </div>
        </div>
    )
}
export default Tasks