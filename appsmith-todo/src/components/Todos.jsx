import React, { useState, useEffect } from 'react'
import { databases } from '../appwrite/appwriteConfig'

function Todos() {
  const [todos, setTodos] = useState()
  const [loader, setLoader] = useState(false)

  const time = [];
  const [responseTimes, setResponseTimes] = useState([]);

  const handleButtonClick = async () => {

    const start = Date.now();

    const getTodos = databases.listDocuments("643b3618c368e3faec81")
    getTodos.then(
      function (response) {
        const endTime = Date.now()
        const responseTime = endTime - start

        setResponseTimes(responseTime);
        //console.log(responseTimes);

        console.log(`TEST Response time after data is fetched is: ${responseTime} ms`)
        setTodos(response.documents)

      },
      function (error) {
        console.log(error);
      }
    )
  };



  useEffect(() => {
    setLoader(true)
    const startTime = Date.now()
    const getTodos = databases.listDocuments("643b3618c368e3faec81")
    getTodos.then(
      function (response) {
        const endTime = Date.now()
        const responseTime = endTime - startTime
        // console.log(`Response time after data is fetched is: ${responseTime} ms`)
        setTodos(response.documents)
        //console.log(Todos)
      },
      function (error) {
        console.log(error);
      }
    )
    setLoader(false)
  }, [])


  const deleteTodo = (id) => {
    const promise = databases.deleteDocument("643b3618c368e3faec81", id)
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    )
    window.location.reload()
  }



  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-xl font-bold mb-2">Todo List</p>
      {loader ? (
        <p>Loading ...</p>
      ) : (
        <div>

          {todos && todos.map(item => (
            <div key={item.$id} >
              <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                <div>
                  <p>{item.todo}</p>
                </div>
                <div>
                  <span
                    className="text-red-400 cursor-pointer"
                    onClick={() => {
                      deleteTodo(item.$id)
                    }}
                  >
                    Delete
                  </span>
                </div>
              </div>


            </div>
          ))}

        </div>
      )}

      <button onClick={handleButtonClick}>Make Request 100 Times</button>
    </div>
  )
}

export default Todos