
import { useState,useRef, useEffect} from 'react';
import './App.css';

const unique = () => {
  return Math.floor(Math.random() * (500 - 200 + 1)) + 200
}
const validate=(values)=>{
  const errors={};
  if(!values.username && values.username.length<4 ){
    errors.username="name should have at least 4 characters"
    
  }
  if(!values.surname && values.surname.length<4){
  errors.surname="surname should have at least 4 characters"
  }
  if(values.email && !values.email.includes("@gmail.com")){
    errors.email="email should include @gmail.com"
  }
  if(!values.age && values.age<18){
    errors.age="min 18 year"
  }
   if(!values.gender){
      errors.gender="gender is important"
    }
  return errors
    }
  
    

    
    
function App() {
  const[formErrors,setFormErrors]=useState([])
  const [userList, setUserList] = useState([])
  const usernameRef=useRef(undefined);
  const surnameRef=useRef(undefined);
  const emailRef=useRef(undefined);
  const ageRef=useRef(undefined)
  const genderRef=useRef(undefined)

  const handleSubmit=(e)=>{
    e.preventDefault()
    const username=usernameRef.current.value;
    const surname=surnameRef.current.value
    const email=emailRef.current.value;
    const age=ageRef.current.value
    const gender=genderRef.current.value
    const id=""
  const userData={username,surname,email,age,gender,id}
 const ValidationResult=validate(userData)
 if(
  !ValidationResult.username||
  !ValidationResult.surname||
  !ValidationResult.email||
  !ValidationResult.age||
  !ValidationResult.gender
 
  ){
    setFormErrors(ValidationResult)
  }

if(!Object.keys(ValidationResult).length  ){
  setUserList(prevuserslist => [...prevuserslist, userData])
console.log(userList)
}

   
  userData.id=unique()
  
  

  }
  console.log("userlist",userList)
  console.log("formErrors",formErrors)
  
 


return(
  <div>
      

    <form onSubmit={handleSubmit}>
      
      <input type="text" name="usename" placeholder="username" ref={usernameRef}>
      </input>
      {formErrors.username && <p style={{color:"red"}}>{formErrors.username}</p>}
      <input type="text" name="surname" placeholder="username" ref={surnameRef}>
      </input>
      {formErrors.surname && <p style={{color:"red"}}>{formErrors.surname}</p>}
      <input type="text" name="email" placeholder="email" ref={emailRef}>
      </input>
      {formErrors.email && <p style={{color:"red"}}>{formErrors.email}</p>}
      <input type="number" min="0" name="age" placeholder="age" ref={ageRef}>        
      </input>
      {formErrors.age && <p style={{color:"red"}}>{formErrors.age}</p>}

     <select name="gender" ref={genderRef}>
     <option defaultValue  ></option>
          <option value="female">female</option>
          <option value="male">male</option>
     </select>
     {formErrors.gender && <p style={{color:"red"}}>{formErrors.gender}</p>}

<button>submit</button>
    </form>


    <ul>
      {userList.map((elem, index) => {

        return (
          <li key={index}> {elem.username}
          {" "}{elem.surname}  {" "}
           {elem.age} years old   {" "}
           {elem.gender}  {" "} id: {elem.id}
            <button>EDIT</button>   
            <button onClick={()=>{
              const newList=userList.filter((item,indexs)=>{
                return index !==indexs
              })
              setUserList(newList)
            }}>DELETE</button>
          </li>

        )

      })}
    </ul>
  </div>
)

}

export default App;
