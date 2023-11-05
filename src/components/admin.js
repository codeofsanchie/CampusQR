//-------------------------------------------------------------------------------------------------


// import React, { useState } from 'react';
// import { Table, Pagination } from 'react-bootstrap';
// const itemsPerPage = 10; // Number of rows per page
// const totalRows = 61; // Total number of rows

// function Admin() {
//     const [currentPage, setCurrentPage] = useState(1);
//     // Calculate the indexes for pagination
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     // Generate an array of rows based on the current page
//     const students = [
//         { id: 1, name: 'John Doe', age: 20, grade: 'A' },
//         { id: 2, name: 'Jane Smith', age: 21, grade: 'B' },
//       ];
//       for (let i = startIndex; i < endIndex && i < totalRows; i++) {
//           students.push(
//               <tr key={i}>
//                 <td>Row {i + 1}</td>
//                 <td>Column 1</td>
//                 <td>Column 2</td>
//                 <td>Column 3</td>
//               </tr>
//             );
//           }
//           // Calculate the total number of pages
//           const totalPages = Math.ceil(totalRows / itemsPerPage);
//   // Handle page change
//   const handlePageChange = (page) => {
//       setCurrentPage(page);
//     };

//     return (
//         <div className='container my-3'>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>UCID</th>
//                 <th>Name of the Student</th>
//                 <th>Email id</th>
//                 <th>QR</th>
//               </tr>
//             </thead>
//             <tbody>{students.map((student) => (
//                 <tr key={student.id}>
//                   <td>{student.id}</td>
//                   <td>{student.name}</td>
//                   <td>{student.age}</td>
//                   <td>{student.grade}</td>
//                 </tr>
//               ))}</tbody>
//             </Table>
//             <Pagination className='d-flex justify-content-center'>
//               <Pagination.Prev
//                 onClick={() =>
//                   currentPage > 1 && handlePageChange(currentPage - 1)
//                 }
//               />
//               {Array.from({ length: totalPages }, (_, index) => (
//           <Pagination.Item
//             key={index + 1}
//             active={index + 1 === currentPage}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}
//         <Pagination.Next
//           onClick={() =>
//             currentPage < totalPages && handlePageChange(currentPage +
//               1)
//           }
//         />
//       </Pagination>

//       <br /><br />
//           < div className=''>
//               <p><a href="https://docs.google.com/spreadsheets/d/1CV8ATJ5E-zDO8pWNBPHH3uz9oZlVoeagy0nyKhX0Mrc/edit?usp=sharing">CC 2023 Attendance</a></p>
//             <p><a href="https://lookerstudio.google.com/reporting/32e805ac-ea26-46ef-b7cf-42260d2ff9ec">CC 2023 Attendance Report</a></p>
//           </div>

//     </div>
//   );
// }

// export default Admin



//--------------------------------------------------------------------------------------------------

import React, { useState } from 'react'
import { Viewer } from '@react-pdf-viewer/core';
import { useNavigate } from 'react-router-dom';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';

export const Admin = () => {

  // new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);
  const navigate = useNavigate();

  // onchange event
  const fileType = ['application/pdf'];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError('');
        }
      }
      else {
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else {
      console.log('select your file');
    }
  }

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    }
    else {
      setViewPdf(null);
    }
  }

  return (
    <div className="container  mt-5">

<span className="title"> Campus QR </span>

      <br></br><br></br>

      <form className='form-group' onSubmit={handlePdfFileSubmit}>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange}
        />
        {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
        <br></br>
        <button type="submit" className='btn btn-primary btn-sm'>
          UPLOAD
        </button>
      </form>
      <br></br>
      <h4>View PDF</h4>
      <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf}
            plugins={[defaultLayoutPluginInstance]} />
        </Worker></>}

        {/* if we dont have pdf or viewPdf state is null */}
        {!viewPdf && <>No pdf file selected</>}
      </div>

      <br /><br />
      < div className="card-header border border-primary text-light mb-3 text-center h5">
        <p><a href="https://docs.google.com/spreadsheets/d/1CV8ATJ5E-zDO8pWNBPHH3uz9oZlVoeagy0nyKhX0Mrc/edit?usp=sharing">CC MCA 2023 Attendance</a></p>
        <p><a href="https://lookerstudio.google.com/reporting/32e805ac-ea26-46ef-b7cf-42260d2ff9ec">CC MCA 2023 Attendance Report</a></p>
      </div>
      <div className="text-center">
      <button className="btn btn-danger center" onClick={()=>navigate("/")}>
          Logout
      </button>
      </div>

    </div>

  )
}

export default Admin