import { useEffect, useState, } from "react"
import { useFilter } from "./useFilter"

interface Product{
  category:string
}

interface FetchResponse{
products:Product[]
}


const Siebar = () => {
const [cateories,setCategories]=useState<string []>([])
const[keywords]=useState<string []>([
  "apple",
  "watch",
  "shoes",
  "fashion",
  "shirt"
])

useEffect(()=>{
  const featchCategory= async()=>{
    try {
      const response=await fetch('https://dummyjson.com/products')
      const data:FetchResponse=await response.json()
      const uniqueCategories=Array.from(
        new Set(data.products.map((product)=>product.category))
      )
      console.log(data)
      setCategories(uniqueCategories)

    } catch (error) {
      console.error('error featching products',error)
    } 
  }
  
  featchCategory()
},[])

const {        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyWord}=useFilter()


  return (
    <div className="w-64 p-5 shadow h-screen">

{/* heading */}
<h2 className="text-xl font-bold text-center">React Store</h2>

{/* search and filter */}
<section className="mt-4">
<input type="text" placeholder="Search Product" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} className="border-2 px-2 border-gray-500 w-full rounded"/>
<div className="flex justify-center items-center gap-2 mt-2">
<input type="text" placeholder="min"  className="border-2 border-gray-500 rounded w-full px-2"/>
<input type="text" placeholder="max"  className="border-2 border-gray-500 rounded w-full px-2"/>
</div>
</section>

{/* category */}
<section>
  <h2 className="text-xl font-semibold  mt-4">Categories</h2>

  {cateories.map((category,index)=>(
<label key={index} className="block mb-2">

  <input type="radio"
  name="category"
  value={category}
  className="mr-2 w-4 h-4"

 />{category.toUpperCase()}
</label>

  ))}
</section>


{/* keywords */}
<section>
    <h2 className="text-xl font-semibold mt-4">Keywords</h2>

    {keywords.map((keyword,index)=>(
      <button key={index} className="block mb-2 px-4 py-1 w-full rounded border-2 hover:bg-gray-200 transition-all">
        {keyword.toUpperCase()}
      </button>
    ))}
</section>

{/* reset button */}

<button className="mb-4 mt-10 bg-black text-white w-full border-2 px-4 py-1 rounded">Reset filters</button>

    </div>
  )
}

export default Siebar