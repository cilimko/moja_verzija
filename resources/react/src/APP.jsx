
import './App.css';
import NavBar from '../components/NavBar';
import Products from '../components/Products';
import { useState, useEffect } from 'react';
import Cart from '../components/Cart';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Meni from '../components/Meni';
import Login from '../components/Login';
import Register from '../components/Register';
import axios from 'axios';
import AdministratorLogin from '../components/AdministratorLogin';
import CreatePlanerForm from '../components/CreatePlanerForm';

function App() {
  const[cartNum, setCartNum] = useState(0);
  const[cartProducts, setCartProducts] = useState([]);

  const [token, setToken] = useState();
  const [token2, setToken2] = useState();

  function addToken(auth_token) {
    setToken(auth_token);
  }

  function addToken2(auth_token2) {
    setToken2(auth_token2);
  }

  const [products, setProducts] = useState();

useEffect(() => {
  if (!products) {
    axios.get("api/planers")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }
}, [products]); 


  function refreshCart(){
  let newProducts = products.filter((prod) => prod.amount > 0);
  setCartProducts(newProducts);
  }

  function addProduct(name, id){
    setCartNum(cartNum + 1);
    products.forEach((prod)=>{
    if(prod.id === id){
      prod.amount++;
    }
    })
    refreshCart();
  }

  function removeProduct(name, id){
    products.forEach((prod)=> {
      if(prod.id === id){
        if(prod.amount > 0){
          prod.amount--;
          setCartNum(cartNum-1);
        }
      }
    });
    refreshCart();
  }

  return (
    <BrowserRouter className="App">
     
        <NavBar cartNum={cartNum} token={token} addToken = { addToken } token2={token2} addToken2 = {addToken2}/>
        <Routes>
        <Route
          path="/products"
          element={
            <>
              <Products
                products={products}
                addProduct={addProduct}
                removeProduct={removeProduct}  
                token={token2} 
              />
            </>
          }
        />
          <Route path="/" element={<Meni/>}/>
          <Route path="/createPlaner" element={<CreatePlanerForm/>}/>
          <Route path="/login" element={<Login addToken = { addToken }/>}/>
          <Route path="/login2" element={<AdministratorLogin addToken = { addToken2 }/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/cart" element={
          <Cart products={cartProducts} />
          }
          />
        </Routes>
       
      
    </BrowserRouter>
  );
}

export default App;
