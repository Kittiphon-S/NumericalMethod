import React, { Component } from 'react'
import { Table } from 'antd';
import '../screen.css';
import 'antd/dist/antd.css';
import math from 'mathjs';
import Plot from 'react-plotly.js';

// import { alert, form } from 'reactstrap';

var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
const xValues = math.range(-10, 10, 0.5).toArray();
var fx = " ";

class Onepoint extends Component {

    constructor() {
        super();
        this.state = {
            fx: "2-e^(x/4)",
            x0: 1,
            x1: 0,
            err: 0.00001,

            data: [],

            showGraph: false
        }
        //this.handleChange = this.handleChange.bind(this);
        //this.onepoint = this.onepoint.bind(this);
    }
    onepoint = (x0) => {
        fx = this.state.fx;
        var x1 = this.state.x1;
        var epsilon = parseFloat(0.000000);
        var n = 0;
        this.state.data['x'] = []
        this.state.data['error'] = []

        do {
            x1 = this.func(x0);
            epsilon = this.error(x1, x0)
            this.state.data['x'][n] = x1.toFixed(8);
            this.state.data['error'][n] = Math.abs(epsilon * 100).toFixed(8);
            n++;
            x0 = x1;

        } while (Math.abs(epsilon) > this.state.err);

        this.state.x1 = x1

        this.createTable(this.state.data['x'], this.state.data['error']);
        this.setState({
            showGraph: true
        })


    }
    func = (X) => {
        var expr = math.compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error = (xnew, xold) => {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable = (x, error) => {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                error: error[i]
            });
        }

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div class="content">
                <div class="container-fluid">

                    <alert color="primary"><h1>One-Point Iteration Method</h1></alert>

                    <div class="card">
                        <div class="card-body">
                            <form>
                                <div class="form-row" onChange={this.handleChange}>


                                    <div class="form-group col-md-12">
                                        <label for="fx"> <p className="text-primary">input Equal</p></label>
                                        <input type="text" class="form-control" name="fx" placeholder="2-e^(x/4)" value={this.state.fx} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="x0"><p className="text-primary">INITIAL NUMBER (X0)</p></label>
                                        <input type="text" class="form-control" name="x0" placeholder="1" value={this.state.x0} />
                                    </div>


                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success btn-sm btn-block" onClick={
                                () => this.onepoint(parseFloat(this.state.x0))
                            }>ENTER</button>
                        </div>
                    </div>


                    <br />

                    {this.state.showGraph &&
                        <div class="card">
                            <div class="card-body">
                                <Plot
                                    data={[
                                        {
                                            x: math.range(-10, 10, 0.5).toArray(),
                                            y: xValues.map(function (x) {
                                                return math.compile(fx).eval({ x: x })
                                            }),
                                            name: "Exact",
                                            type: 'scatter',
                                            marker: { color: 'red' },
                                        },
                                        /*{
                                            x: this.state.data['x'],
                                            y: 0,
                                            name: "Iteration",
                                            mode: 'markers',
                                            type: 'scatter',
                                            marker: {color: 'blue'},
                                        },*/
                                        {
                                            x: [this.state.x1],
                                            y: 0,
                                            name: "Appoximate",
                                            type: 'scatter',
                                            mode: 'markers',
                                            marker: { color: 'orange', size: 12 },
                                        },
                                    ]}
                                    layout={{ title: 'One-Point Iteration Method' }}

                                    style={{ width: "100%", float: "left", height: "370px" }}
                                />
                            </div>
                        </div>
                    }


                    <br />

                    {this.state.showGraph &&
                        <div class="card">
                            <div class="card-body">
                                <Table bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black", backgroundColor: "white" }} columns={columns} dataSource={dataInTable}>
                                </Table>

                            </div>
                        </div>
                    }

                </div>

            </div>

        );
    }
}
export default Onepoint;