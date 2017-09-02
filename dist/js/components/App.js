import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Catalog from './Catalog';
import Collections from './Collections';
import Coins from './Coins';
import Coin from './Coin';
import GenericNotFound from './404';

class App extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <div className='container'>
                        <Switch>
                            <Route exact path='/' component={Catalog} />
                            <Route exact path='/euro-regular' component={(props) => <Collections {...props} data='/json/eu-countries.json' />} />
                            <Route exact path='/euro-regular/:collection' component={(props) => <Coins {...props} data='/json/eu-countries.json' />} />
                            <Route exact path='/euro-regular/:collection/:id' component={(props) => <Coin {...props} data='/json/eu-countries.json' />} />
                            <Route exact path='/euro-commemorative' component={(props) => <Collections {...props} data='/json/eu-years.json' />} />
                            <Route exact path='/euro-commemorative/:collection' component={(props) => <Coins {...props} data='/json/eu-years.json' />} />
                            <Route exact path='/euro-commemorative/:collection/:id' component={(props) => <Coin {...props} data='/json/eu-years.json' />} />
                            <Route path='*' component={GenericNotFound} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
