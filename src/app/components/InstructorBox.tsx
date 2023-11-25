
import UnstyledLink from "@/components/links/UnstyledLink"

import { useGlobalStore } from "@/app/stores/UserStore"

export default function InstructorBox() {

  const instructor = useGlobalStore(state => state.instructor)
  const setInstructor = useGlobalStore(state => state.updateInstructor)
  return (
    <div className="px-8 py-4">
      <h4 className="text-pink-500">Instructor Detail</h4>
      <div className="text-black">
      
        <h5>Name: {instructor.name}</h5>
        <h5>Bio: {instructor.bio}</h5>
        <h5>Email: {instructor.email}</h5>
        <h5>Courses taught:</h5>
        <div className=" flex space-x-4 mt-2 mb-4">
        {instructor.courses.map((item, index) => 
            <div className='max-w-[100px]' key={index}>
              <UnstyledLink onClick={() => {setInstructor({...instructor, id: -1})}} className='bg-pink-300 mb-2 text-white py-1 px-2 hover:bg-pink-500 rounded' href={'/community/' + item.id}>
                {item.name}
              </UnstyledLink>
            </div>
        )} 

        </div>
      </div>
    </div>
  )
}