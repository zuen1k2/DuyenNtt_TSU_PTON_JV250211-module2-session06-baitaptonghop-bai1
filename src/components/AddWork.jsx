import React, { useEffect, useState } from 'react'


export default function AddWork() {
    const [taskList,setTaskList] = useState([]);
    const [taskInput,setTaskInput] = useState('');
    const [showModal,setShowModal] = useState(false);
    const [modalMessen, setModalMessen] = useState('');

    useEffect(()=>{
      const local = JSON.parse(localStorage.getItem('tasks')) || [];
      setTaskList(local);
    }, []);

    const handSubmit = (e)=> {
        e.preventDefault();

        if (taskInput=='') {
         setModalMessen('Tên công việc không được phép để trống.');
         setShowModal(true);
          return;
        }
        if (taskList.includes(taskInput)){
          setModalMessen('Tên công việc không được trùng.');
          setShowModal(true);
          return;
        }
        const NewTask = [...taskList,taskInput];
        setTaskList(NewTask);
        localStorage.setItem('tasks', JSON.stringify(NewTask));
        setTaskInput('');
    }
        const handCloseModal = ()=>{
          setShowModal(false);
        }

  return (
    <div>
        <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handSubmit}>
                <div className="form-outline flex-fill">
                  <input type="text" id="form2" className="form-control" value={taskInput} onChange={(e)=> setTaskInput(e.target.value)}/>
                  <label className="form-label" htmlFor="form2">
                    Nhập tên công việc
                  </label>
                </div>
                <button type="submit" className="btn btn-info ms-2" >
                  Thêm
                </button>
               </form>
               {/* Modal cảnh báo lỗi */}
              {showModal &&  
   <div className="overlay" >
     <div className="modal-custom">
       <div className="modal-header-custom">
         <h5>Cảnh báo</h5>
        <i className="fas fa-xmark" onClick={handCloseModal} />
      </div>
      <div className="modal-body-custom">
          <p>{modalMessen}</p>
      </div>
      <div className="modal-footer-footer">
        <button className="btn btn-light" onClick={handCloseModal}>Đóng</button>
      </div>
    </div>
  </div> 
}

  </div>
  )
}

