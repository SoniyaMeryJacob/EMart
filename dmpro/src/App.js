import { lazy,Suspense } from 'react';
import {Routes,Route} from 'react-router-dom';
import { BrowserRouter as Router, Switch,  } from 'react-router-dom';
import Product from './components/product';
import UpdateProduct from './components/updateproduct';


function App() {

  const Reg=lazy(()=>import('./components/product'));
  const Defo=lazy(()=>import('./components/bstnvbr'));
  const Cat=lazy(()=>import('./components/category'));
  const Prolist=lazy(()=>import('./components/producttable'));
  const Updatepro=lazy(()=>import('./components/updateproduct'));
  

  return (
    <Suspense fallback={<div>Comming Soon</div>}>
      <Routes>
     
        <Route path='/' element={<Defo/>} />
        <Route path='/Product' element={<Reg/>} />
        <Route path='/Category' element={<Cat/>} />
        <Route path='/Productlist' element={<Prolist/>} />
        <Route path='/Updateproduct' element={<Updatepro/>} />
        
        <Route path="/" exact component={Product} />
        
        <Route path="/update/:productId" element={<UpdateProduct />} />
      
      </Routes>


    </Suspense>
  );

}

export default App;