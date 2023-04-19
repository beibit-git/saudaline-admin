import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CategoriesPage from '../../pages/CategoriesPage';
import CategoryCreationPage from '../../pages/CategoriesPage/CategoryCreationPage/CategoryCreationPage';
import ProductsPage from '../../pages/ProductPage';
import ProductCreationPage from '../../pages/ProductPage/ProductCreationPage/ProductCreationPage';
import UserPage from '../../pages/UserPage';
import OrdersPage from '../../pages/OrdersPage';
import OrderShowPage from '../../pages/OrdersPage/OrderShowPage/OrderShowPage';
import PromotionsPage from '../../pages/PromotionPage';
import PromotionCreationPage from '../../pages/PromotionPage/PromotionCreatePage/PromotionCreationPage';
import PromotionShowPage from '../../pages/PromotionPage/PromotionShowPage/PromotionShowPage';
import TariffPage from '../../pages/TariffPage';

const PageContent = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={UserPage}></Route>
        <Route exact path="/categories" component={CategoriesPage}></Route>
        <Route path="/categories/create" component={CategoryCreationPage} />
        <Route
          path="/categories/edit/:id"
          render={({ match }) => <CategoryCreationPage categoryId={parseInt(match.params.id)} />}
        />
        <Route exact path="/products" component={ProductsPage}></Route>
        <Route exact path="/products/create" component={ProductCreationPage}></Route>
        <Route
          path="/products/edit/:id"
          render={({ match }) => <ProductCreationPage productId={parseInt(match.params.id)} />}
        />
        <Route exact path="/orders" component={OrdersPage}></Route>
        <Route path="/orders/show/:id" render={({ match }) => <OrderShowPage orderId={parseInt(match.params.id)} />} />
        <Route exact path="/promotions" component={PromotionsPage}></Route>
        <Route exact path="/promotions/create" component={PromotionCreationPage}></Route>
        <Route
          path="/promotions/edit/:id"
          render={({ match }) => <PromotionCreationPage promotionId={parseInt(match.params.id)} />}
        />
        <Route
          path="/promotions/show/:id"
          render={({ match }) => <PromotionShowPage promotionId={parseInt(match.params.id)} />}
        />
        <Route exact path="/tarif" component={TariffPage}></Route>
        {/* <Route exact path="/teachers" component={TeachersPage}></Route>
        <Route exact path="/teacher/:id" render={({ match }) => <TeacherPage isPublic={false} />} /> */}
      </Switch>
    </React.Fragment>
  );
};

export default PageContent;
