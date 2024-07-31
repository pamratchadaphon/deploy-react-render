import {BrowserRouter, Routes, Route} from 'react-router-dom'

//Login & Register
import Login from './pages/Login'
import Register from './pages/Register'

//Page Admin
import ManageRiceVariety from './pages/admin/ManageRiceVariety'
import ManageRiceCaltivation from './pages/admin/ManageRiceCaltivation'
import ManageUser from './pages/admin/ManageUser'
import Dashboard from './pages/admin/Dashboard'
import ManageNewsService from './pages/admin/ManageNewsService'
import ManageIncomeExpense from './pages/admin/ManageIncomeExpense'

//Page User
import HomepageUser from './pages/user/HomePageUser'
import Ricecrop from './pages/user/Ricecrop';
import RiceVariety from './pages/user/RiceVariety';
import Income_Expense_History from './pages/user/Income_Expense_History';
import Detail_RiceCaltivation from './pages/user/Detail_RiceCaltivation';

//Route
import AdminAuthen from './auth/AdminAuthen'
import UserAuthen from './auth/UserAuthen';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route path='/user/home/:user_id' element={<UserAuthen><HomepageUser/></UserAuthen>}/>
          <Route path='/ricecrop/:user_id' element={<UserAuthen><Ricecrop/></UserAuthen>}/>
          <Route path='/ricevariety/:user_id' element={<UserAuthen><RiceVariety/></UserAuthen>}/>
          <Route path='/ricecrop/history/:user_id/:riceCaltivation_id' element={<UserAuthen><Income_Expense_History/></UserAuthen>} />
          <Route path='/ricecrop/detail/:user_id/:riceCaltivation_id' element={<UserAuthen><Detail_RiceCaltivation/></UserAuthen>} />

          <Route path='/admin/riceVariety' element={<AdminAuthen><ManageRiceVariety/></AdminAuthen>}/>
          <Route path='/admin/riceCaltivaion' element={<AdminAuthen><ManageRiceCaltivation/></AdminAuthen>}/>
          <Route path='/admin/user' element={<AdminAuthen><ManageUser/></AdminAuthen>}/>
          <Route path='/admin/dashboard' element={<AdminAuthen><Dashboard/></AdminAuthen>}/>
          <Route path='/admin/newsService' element={<AdminAuthen><ManageNewsService/></AdminAuthen>}/>
          <Route path='/admin/incomeExpense' element={<AdminAuthen><ManageIncomeExpense/></AdminAuthen>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
