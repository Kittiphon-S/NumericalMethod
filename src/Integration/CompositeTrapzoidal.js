import React, { Component } from 'react';
import { Card, Input, Button } from 'antd';
import '../screen.css';
import 'antd/dist/antd.css';
import math from 'mathjs';
// import { alert , form} from 'reactstrap';
import Plot from 'react-plotly.js';
var Algebrite = require('algebrite')

var I, exact, error, G = [];

const xValues = math.range(-10, 10, 0.5).toArray();
var fx = " ";

class Composite_Trapezoidal extends Component {
    constructor() {
        super();
        this.state = {
            fx: "1/3*x^3",
            a: 0,
            b: 5,
            n: 10,
            showGraph: false,
        }
        //this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    composite_trapezoidal = (a, b, n) => {
        var h = (b - a) / n

        G = []
        G['x'] = []
        G['y'] = []
        for (var i = a; i < b;) {
            i += h
            G['x'].push(i);
            G['y'].push(this.func(i).toFixed(8));
        }


        I = (h / 2) * (this.func(a) + this.func(b) + 2 * this.summationFunction(n, h))
        exact = this.exactIntegrate(a, b)
        error = Math.abs((exact - I) / exact) * 100
        this.setState({
            showGraph: true
        })
    }
    exactIntegrate = (a, b) => {
        var expr = math.compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({ x: b }) - expr.eval({ x: a })

    }
    summationFunction = (n, h) => {
        var sum = 0
        var counter = h
        for (var i = 1; i < n; i++) {
            sum += this.func(counter)
            counter += h
        }
        return sum
    }
    func = (X) => {
        var expr = math.compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    render() {
        return (
            <div class="content">
                <div class="container-fluid">

                    <alert color="primary"><h1>Composite Trapezoidal Rule</h1></alert>

                    <div class="card">
                        <div class="card-body">
                            <form>
                                <div class="form-row" onChange={this.handleChange}>


                                    <div class="form-group col-md-12">
                                        <label for="fx"> <p className="text-primary">input Equal</p></label>
                                        <input type="text" class="form-control" name="fx" placeholder="1/3*x^3" value={this.state.fx} />
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="a"><p className="text-primary">INPUT X START</p></label>
                                        <input type="text" class="form-control" name="a" placeholder="0" value={this.state.a} />
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="b"><p className="text-primary">INPUT X END</p></label>
                                        <input type="text" class="form-control" name="b" placeholder="5" value={this.state.b} />
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="n"><p className="text-primary">INPUT f(xn) SPLIT</p></label>
                                        <input type="text" class="form-control" name="n" placeholder="10" value={this.state.n} />
                                    </div>


                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success btn-sm btn-block" onClick={
                                () => this.composite_trapezoidal(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))
                            }>ENTER</button>
                        </div>
                    </div>


                    <br />

                    <div class="card">
                        <div class="card-body">
                            <Plot
                                data={[
                                    {
                                        x: G['x'],
                                        y: G['y'],
                                        name: "Exact",
                                        type: 'scatter',
                                        line: { shape: 'spline' },
                                        marker: { color: 'red' },
                                    },

                                ]}
                                layout={{ title: 'Composite Trapezoidal Rule' }}

                                style={{ width: "100%", float: "left", height: "370px" }}
                            />
                        </div>
                    </div>



                    <br />

                    <div class="card">
                        <div class="card-body">
                            {this.state.showGraph &&
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                    Approximate = {I}<br />
                                        Exact = {exact}<br />
                                        Error = {error}%
                                    </p>

                            }
                        </div>
                    </div>


                </div>

            </div>
        );
    }
}
export default Composite_Trapezoidal;