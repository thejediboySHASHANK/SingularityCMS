import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from "@/pages/IndexPage.tsx";
import Layout from "@/components/globals/Layout.tsx";
import SignInPage from "@/Authroutes/sign-in.tsx";
import SignUpPage from "@/Authroutes/sign-up.tsx";

function App() {

  return (
      <>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<IndexPage />} />
                  <Route path="/sign-in" element={<SignInPage />}/>
                  <Route path="/sign-up" element={<SignUpPage />}/>
              </Route>
          </Routes>
      </>
  )
}

export default App
