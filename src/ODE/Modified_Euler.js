import React, { Component } from 'react'
import { Table } from 'antd';
import '../screen.css';
import 'antd/dist/antd.css';
import math from 'mathjs';
import Plot from 'react-plotly.js';

// import { alert, form } from 'reactstrap';
var dataInTable;
const columns = [
    {
        title: "x",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "y",
        key: "y",
        dataIndex: "y"
    }
];
var X = [], yE = [], exactEquation;
class Modified_Euler extends Component {
    constructor() {
        super();
        this.state = {
            fx: "4x-2y/x",
            start: 1,
            finish: 2,
            y0: 1,
            h: 0.25,
            exactEquation: "x^2",
            showGraph: false
        }
        //this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    euler = (x, y, h) => {
        return y + this.func(x, y) * h;
    }
    modified_euler = (start, finish, y0, h) => {
        exactEquation = this.state.exactEquation
        X = []
        var pointX = []
        var pointfx = []
        yE = []
        dataInTable = []
        var y = y0
        var xi = start
        //create x and fx
        for (var i = 0; i <= finish; i++) {
            pointX.push(parseFloat(start) + i * parseFloat(h))
            pointfx.push(this.func(parseFloat(start) + i * parseFloat(h)))
        }
        for (i = 1; i < finish; i++) {
            var y_half = this.euler(pointX[i - 1], pointfx[i - 1], h / 2)
            var x_half = (pointX[i] + pointX[i - 1]) / 2
            pointfx[i] = pointfx[i - 1] + this.func(x_half, y_half) * h;
            yE.push(pointfx[i])
            X.push(i)

        }
        this.createTable(X, yE)
        this.setState({

            showGraph: true
        })
    }

    func = (X, Y) => {
        var expr = math.compile(this.state.fx);
        let scope = { x: parseFloat(X), y: parseFloat(Y) };
        return expr.eval(scope);
    }
    createTable = (x, y) => {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                x: x[i],
                y: y[i]
            });
        }

    }
    render() {
        return (
            <div class="content">
                <div class="container-fluid">

                    <alert color="primary"><h1>Modified Euler's Method</h1></alert>

                    <div class="card">
                        <div class="card-body">
                            <form>
                                <div class="form-row" onChange={this.handleChange}>


                                    <div class="form-group col-md-12">
                                        <label for="fx"> <p className="text-primary">input Equal</p></label>
                                        <input type="text" class="form-control" name="fx" placeholder="4x-2y/x" value={this.state.fx} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="start"><p className="text-primary">Start (X)</p></label>
                                        <input type="text" class="form-control" name="start" placeholder="1" value={this.state.start} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="finish"><p className="text-primary">End (X)</p></label>
                                        <input type="text" class="form-control" name="finish" placeholder="2" value={this.state.finish} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="y"><p className="text-primary">Y(0)</p></label>
                                        <input type="text" class="form-control" name="y" placeholder="1" value={this.state.y} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="h"><p className="text-primary">H</p></label>
                                        <input type="text" class="form-control" name="h" placeholder="0.25" value={this.state.h} />
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label for="exactEquation"> <p className="text-primary">Exact Equation</p></label>
                                        <input type="text" class="form-control" name="exactEquation" placeholder="x^2" value={this.state.exactEquation} />
                                    </div>


                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success btn-sm btn-block" onClick={
                                () => this.modified_euler(parseFloat(this.state.start), parseFloat(this.state.finish), parseFloat(this.state.y0), parseFloat(this.state.h))
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
                                            x: X,
                                            y: yE,
                                            type: 'scatter',
                                            marker: { color: 'blue' },
                                            name: "Euler's"
                                        },
                                        {
                                            x: X,
                                            y: X.map(function (x) {
                                                return math.compile(exactEquation).eval({ x: x })
                                            }),
                                            type: 'scatter',
                                            marker: { color: 'red' },
                                            name: "exact equation"
                                        },
                                    ]}
                                    layout={{ title: 'Heun\'s' }}

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
export default Modified_Euler;