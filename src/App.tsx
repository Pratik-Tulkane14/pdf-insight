import './App.css'
// import  CompareDemo  from './components/CompareDemo'
import Form from './components/Form'
import Navbar from './components/Navbar'
// import GoogleGeminiEffect from './components/ui/google-gemini-effect'

function App() {

  return (
    <div className='relative'>
      {/* <CompareDemo/> */}
      {/* <GoogleGeminiEffect/> */}
      <Navbar />
      <Form />
    </div>
  )
}

export default App