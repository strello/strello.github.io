import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { routes, externalRedirects } from "./config";
import { Styles } from "../styles/styles";

const Router = () => {
    return (
        <Suspense fallback={null}>
            <Styles />
            <Header />
            <Switch>
                {routes.map((routeItem) => {
                    return (
                        <Route
                            key={routeItem.component}
                            path={routeItem.path}
                            exact={routeItem.exact}
                            component={lazy(() => import(`../pages/${routeItem.component}`))}
                        />
                    );
                })}
                {externalRedirects.map((extRoute) => {
                    return (
                        <Route
                            path={extRoute.path}
                            exact={true}
                            component={() => {
                                window.location.replace(extRoute.link);
                                return null;
                            }}
                        />
                    )
                })}
            </Switch>
            <Footer />
        </Suspense>
    );
};

export default Router;
