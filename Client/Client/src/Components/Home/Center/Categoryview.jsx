import React from 'react'
import { useParams } from 'react-router-dom'

function Categoryview() {
  const {id}=useParams(
    console.log(id)
  )
  return (
    <div>
      hello heyyy
    </div>
  )
}

export default Categoryview
