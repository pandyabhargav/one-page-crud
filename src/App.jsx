
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useEffect, useState } from "react";
import generateUniqueId from 'generate-unique-id';
import getData from './utli/helper';



function App() {

    const [inputText, setInputText] = useState({
        id: '',
        fname: '',
        lname: '',
        email: '',
        address: '',
        gender: ''
    })

    const [viewData, setViewData] = useState(getData());


    const handleInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        setInputText({ ...inputText, [name]: value });
    }

    const handleEdit = (id) => {

        console.log("ID", id);
        let records = [...viewData];
        let singleRecord = records.filter((record) => {
            return record.id === id
        })

        console.log("Single Record", singleRecord);

        setInputText(singleRecord[0]);

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        if (inputText.id) {
            let records = [...viewData];

            let updatedData = records.map((record) => {
                if (record.id == inputText.id) {
                    return record = inputText
                } else {
                    return record;
                }
            })

            setViewData(updatedData);
        } else {

            let obj = {
                ...inputText
            }

            obj.id = generateUniqueId({ length: 4 });

            console.log("OBJ", obj);
            setViewData([...viewData, obj]);


        }


        setInputText({
            id: '',
            fname: '',
            lname: '',
            email: '',
            address: '',
            age: '',
            gender: ''
        })
    }

    const handleDelete = (id) => {

        let records = [...viewData];

        let deletedRecord = records.filter((record) => {
            return id !== record.id
        })

        setViewData(deletedRecord);



    }

    useEffect(() => {

        localStorage.setItem('datas', JSON.stringify(viewData));

    }, [viewData])

    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h2 className="bg-orange">
                            Pandya Royal Residences
                        </h2>
                    </div>

                    <div className="col-12 d-flex flex-wrap justify-content-between">
                        <div className='col-12 image d-flex justify-content-around'>
                            <img src="image/img.avif" />
                            <img src="image/photo.avif" />
                            <img src="image/spa.jpg" />
                        </div>
                        <div className="d-flex justify-content-center col-3">
                            <button className="btn btn-primary  student m-3 px-3" id="add-btn" data-bs-toggle="modal"
                                data-bs-target="#exampleModal" type="submit"> <i
                                    className="fa-solid fa-plus mx-2"></i>Add</button>
                            <button className="btn text-white btn-danger reset m-3 px-3" type="submit"><i
                                className="fa-solid fa-eraser mx-2"></i>Reset</button>
                        </div>
                        <div className="d-flex col-5 p-3">
                            <form className="d-flex col-12" role="search">
                                <input className="form-control me-2" id="serch1" type="search" placeholder="Search"
                                    aria-label="Search" />
                                <button className="btn serch text-white btn-info" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="pt-5">
                        <table border="1" width="100%">
                            <thead>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        Name.
                                    </th>
                                    <th>
                                        sur Name.
                                    </th>
                                    <th>
                                        Email.
                                    </th>
                                    <th>
                                        address.
                                    </th>
                                    <th>
                                        Age.
                                    </th>
                                    <th>
                                        gender
                                    </th>
                                    <th>
                                        update / Deleat
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="table-data">
                                {

                                    viewData.map((data, index) => {

                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{
                                                    data.fname
                                                }</td>
                                                <td>{
                                                    data.lname
                                                }</td>
                                                <td>{
                                                    data.email
                                                }</td>
                                                <td>{
                                                    data.address
                                                }</td>
                                                <td>{
                                                    data.age
                                                }</td>
                                                <td>{
                                                    data.gender
                                                }</td>
                                                <td>
                                                    <button class="btn  edit edit-btn bg-success text-white px-4 m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(data.id)} type="submit"><i class="fa-solid fa-eye"></i></button>
                                                    <button class="btn  del-btn trash bg-danger text-white px-4 m-2" onClick={() => handleDelete(data.id)} type="submit"><i class="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-wrap">
                                <form className="d-flex flex-wrap justify-content-center m-5" onSubmit={handleSubmit}>
                                    <div className="col-4">
                                        <div className="img d-flex">
                                            <img src="image/add-user.png" className="justify-content-start d-flex"
                                                alt="img" />
                                            <i className="fa-solid fa-plus"></i>
                                            <input type="file" />
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div>
                                            <label >Name :-</label>
                                            <input type="text" className="form-control mb-3" name='lname' value={inputText.lname} onChange={handleInput} />
                                            <label >Surname No:-</label>
                                            <input type="text" className="form-control mb-3" name='fname' value={inputText.fname} onChange={handleInput} />
                                            {/* <label >Contact No :-</label> */}
                                            <input type="text" className="form-control mb-3" name='id' value={inputText.id} onChange={handleInput} hidden />
                                            <label >Email :-</label>
                                            <input type="text" className="form-control mb-3" name='email' value={inputText.email} onChange={handleInput} />
                                            <label >Gender :-</label>
                                            <input type="text" className="form-control mb-3" name='gender' value={inputText.gender} onChange={handleInput} />
                                            <label >Email :-</label>
                                            <input type="text" className="form-control mb-3" name='address' value={inputText.address} onChange={handleInput} />
                                            <label >Age :-</label>
                                            <input type="number" className="form-control mb-3" name='age' value={inputText.age} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn Register bg-primary text-white p-3">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default App;
