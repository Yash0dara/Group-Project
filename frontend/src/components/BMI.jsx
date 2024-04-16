import React, {useState} from 'react'



function BMI() {

    const [weight, setWeight] = useState(0)
    const [weightlb, setWeightlb] = useState(0)
    const [weightkg, setWeightkg] = useState(0)
    const [heightin, setHeightin] = useState(0)
    const [heightcm, setHeightcm] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')



  let calcBmi = (event) => {
    //prevent submitting
    event.preventDefault()

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let bmi = (weight / (height * height)*10000 )
      setBmi(bmi.toFixed(1))

      // Logic for message

      if (bmi < 25) {
        setMessage('You are underweight')
      } else if (bmi >= 25 && bmi < 30) {
        setMessage('You are a healthy weight')
      } else {
        setMessage('You are overweight')
      }
    }
  }

  //  show image based on bmi calculation
  let imgSrc;

  if (bmi < 1) {
    imgSrc = null
  } else {
    if(bmi < 25) {
      imgSrc = ('../assets/underweight.png')
    } else if (bmi >= 25 && bmi < 30) {
      imgSrc = ('../assets/healthy.png')
    } else {
      imgSrc = ('../assets/overweight.png')
    }
  }


  let reload = () => {
    window.location.reload()
  }

/*weight convertor*/

  let calcWei = (event) => {
    //prevent submitting
    event.preventDefault()

    if (weightlb === 0) {
      alert('Please enter a valid weight ')
    } else {
        let weightkg = (weightlb * 0.453592 )
        setWeightkg(weightkg.toFixed(1))

    }
  }

  /*Height convertor*/

  let calcHei = (event) => {
    //prevent submitting
    event.preventDefault()

    if (heightin === 0) {
      alert('Please enter a valid weight and height')
    } else {
        let heightcm = (heightin * 2.54 )
        setHeightcm(heightcm.toFixed(2))

    }
  }


  return (
    <div>
      <div className="flex justify-center">
      <div className='w-full max-w-xs m-3 m-10'>
        <h2 className='flex items-center'>BMI Calculator</h2>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={calcBmi}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Weight (kg)</label>
            <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Height (cm)</label>
            <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={height} onChange={(event) => setHeight(event.target.value)} />
          </div>
          <div className='flex items-center space-x-6 lg:space-x-3 justify-center mb-4'>
            <button className='bg-blue-600 text-white px-2 py-1  rounded-lg' type='submit'>Submit</button>
            <button className='bg-green-600 text-white px-2 py-1  rounded-lg' onClick={reload} type='submit'>Reload</button>
          </div>

          <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>

        <div className='img-container'>
          <img src= {imgSrc} alt=''></img>
        </div>

        </form>

        
      </div>
    </div>

    <div className="flex justify-center">
      <div className='w-full max-w-xs m-3 m-10'>
        <h2 className='flex items-center'>Weight Convertor(lbs to kg)</h2>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={calcWei}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Weight (lbs)</label>
            <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={weightlb} onChange={(e) => setWeightlb(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Weight (kg)</label>
            <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={weightkg} onChange={(event) => setWeightkg(event.target.value)} />
          </div>
          <div className='flex items-center space-x-6 lg:space-x-3 justify-center mb-4'>
            <button className='bg-blue-600 text-white px-2 py-1  rounded-lg' type='submit'>Submit</button>
            <button className='bg-green-600 text-white px-2 py-1  rounded-lg' onClick={reload} type='submit'>Reload</button>
          </div>

        </form>

        
      </div>
    </div>


    <div className="flex justify-center">
      <div className='w-full max-w-xs m-3 m-10'>
        <h2 className='flex items-center'>Height Convertor(in to cm)</h2>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={calcHei}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Height (in)</label>
            <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={heightin} onChange={(e) => setHeightin(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Height (cm)</label>
            <input className='shadow appearance-none border rounded w-ull py-2 px-3 text-gray-700 leading-tight focus:outline' value={heightcm} onChange={(event) => setHeightcm(event.target.value)} />
          </div>
          <div className='flex items-center space-x-6 lg:space-x-3 justify-center mb-4'>
            <button className='bg-blue-600 text-white px-2 py-1  rounded-lg' type='submit'>Submit</button>
            <button className='bg-green-600 text-white px-2 py-1  rounded-lg' onClick={reload} type='submit'>Reload</button>
          </div>

        </form>

        
      </div>
    </div>

    </div>

    

  )
}

export default BMI
