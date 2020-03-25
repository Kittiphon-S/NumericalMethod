import React from "react";
import clsx from "clsx";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";

import AppMenu from "./AppMenu";

import Bisection from './Root of Equation/Bisection'
import False from './Root of Equation/False_position';
import Onepoint from './Root of Equation/Onepoint';
import Newton from './Root of Equation/Newton-raphson';
import Secant from './Root of Equation/Secant';
import Cramer from './Linear Algebra/Cramer';
import Gauss from './Linear Algebra/Gauss';
import Jordan from './Linear Algebra/Jordan';
import Inverse from './Linear Algebra/Inverse';
import LU from './Linear Algebra/LU';
import Cholesky from './Linear Algebra/Cholesky';
import Jacobi from './Linear Algebra/Jacobi';
import Seidel from './Linear Algebra/Seidel';
import Gradient from './Linear Algebra/Gradient';
import NewtonInterpolate from './Interpolation/Newton';
import Lagrange from './Interpolation/Lagrange';
import Spline from './Interpolation/Spline';
import Linear from './Regression/Linear';
import Polynomial from './Regression/Polynomial';
import MultipleLinear from './Regression/MultipleLinear';
import CompositeTrapezoidal from './Integration/CompositeTrapzoidal';
import CompositeSimpson from './Integration/CompositeSimpson';
import ForwardH from './Differentiation/Forwardh';
import ForwardH2 from './Differentiation/ForwardH2';
import BackwardH from './Differentiation/Backwardh';
import BackwardH2 from './Differentiation/Backwardh2';
import CentralH from './Differentiation/Centralh';
import CentralH2 from './Differentiation/Centralh2';
import Euler from './ODE/Euler';
import Heun from './ODE/Heun';
import ModifiedEuler from './ODE/Modified_Euler';

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={clsx("App", classes.root)}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <AppMenu />
        </Drawer>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route path="/" exact component={Bisection} />
              <Route path="/Bisection" component={Bisection} />
              <Route path="/False" component={False} />
              <Route path="/Onepoint" component={Onepoint} />
              <Route path="/Newton" component={Newton} />
              <Route path="/Secant" component={Secant} />
              <Route path="/Cramer" component={Cramer} />
              <Route path="/Gauss" component={Gauss} />
              <Route path="/Jordan" component={Jordan} />
              <Route path="/Inverse" component={Inverse} />
              <Route path="/LU" component={LU} />
              <Route path="/Cholesky" component={Cholesky} />
              <Route path="/Jacobi" component={Jacobi} />
              <Route path="/Seidel" component={Seidel} />
              <Route path="/Gradient" component={Gradient} />
              <Route path="/NewtonInterpolate" component={NewtonInterpolate} />
              <Route path="/Lagrange" component={Lagrange} />
              <Route path="/Spline" component={Spline} />
              <Route path="/Linear" component={Linear} />
              <Route path="/Polynomial" component={Polynomial} />
              <Route path="/MultipleLinear" component={MultipleLinear} />
              <Route path="/CompositeTrapezoidal" component={CompositeTrapezoidal} />
              <Route path="/CompositeSimpson" component={CompositeSimpson} />
              <Route path="/ForwardH" component={ForwardH} />
              <Route path="/ForwardH2" component={ForwardH2} />
              <Route path="/BackwardH" component={BackwardH} />
              <Route path="/BackwardH2" component={BackwardH2} />
              <Route path="/CentralH" component={CentralH} />
              <Route path="/CentralH2" component={CentralH2} />
              <Route path="/Euler" component={Euler} />
              <Route path="/Heun" component={Heun} />
              <Route path="/ModifiedEuler" component={ModifiedEuler} />

            </Switch>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
};

const drawerWidth = 320;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    // แก้พื้นหลังเมนู
    background: "#1a1a1a",
    // แกสีตัวหนังสือ
    color: "#fff"
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

export default App;
