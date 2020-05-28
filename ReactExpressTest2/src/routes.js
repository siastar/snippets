import React from 'react';
import Login from './components/Login';
import Main from './components/Main';
import MenuEditor from './components/menu/MenuEditor';
import MenuDetail from './components/menu/MenuDetail';
import SServiceEditor from './components/sideservices/SServiceEditor';
import SServices from './components/sideservices/SServiceDetails';
import MServices from './components/maintenance/MaintenanceServices';
import CatDetails from './components/sideservices/CatDetails';
import CatEditor from './components/sideservices/CatEditor';
import Chat from './components/chat/Chat'; 
import NotFound from './components/commons/NotFound';
import RentalRequests from './components/rentalservices/RentalRequests';
import RentalEditor from './components/rentalservices/RentalEditor';
import {BrowserRouter,Switch,Route} from 'react-browser-router';
import PrivateRoute from './PrivateRoute';
import CommonView from './components/rentalservices/CommonView';
import ContentEditor from './components/content/ContentEditor';
export default class Routes extends React.Component{

  constructor(props){
   super(props);
  }



render() {
  return(
      <BrowserRouter>
          <Switch>            
            <Route path="/login" component={Login}/>
            <Route path='/content' component={ContentEditor}/>
            <Route path='/chat' component={Chat}/>
            <Route path='/rentalrequests' component={RentalRequests}/>
            <Route path = '/commonview' component={CommonView}/>
            <Route path='/rentaleditor/' component={RentalEditor}/>
            <PrivateRoute path='/dashboard' component={Main} />
            <Route path='/servicecatergory' component={CatDetails}/>
            <Route path='/service' component={SServices}/>
            <Route path= '/sserviceeditor/:pid/:cid' component = {SServiceEditor}/>
            <Route path= '/sserviceeditor/' component = {SServiceEditor}/>
	          <Route path= '/maintenance' component={ MServices } />
            <Route path='/cateditor/:id' component={CatEditor}/>
            <Route path='/cateditor/' component={CatEditor}/>
            <Route path='/menusettings' component={MenuDetail}/>
            <Route path="/menueditor/:id" component={MenuEditor}/>
            <Route path="/" exact component={Login}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      )}
}
     
