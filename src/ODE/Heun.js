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
var x = [], yE = [], exactEquation;
class Heun extends Component {
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
    heun = (start, finish, y0, h) => {
        exactEquation = this.state.exactEquation
        x = []
        yE = []
        dataInTable = []
        var y = y0
        var xi = start
        for (var i = start; i <= finish; i += h) {
            var euler = this.euler(xi, y, h)
            y = y + ((this.func(xi, y) + this.func((xi += h), euler)) / 2) * h
            yE.push(y)
            x.push(i)
        }
        this.createTable(x, yE)
        this.setState({
            showGraph: true
        })
    }
    euler = (x, y, h) => {
        return y + this.func(x, y) * h

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

                    <alert color="primary"><h1>Heun's Method</h1></alert>

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
                                () => this.heun(parseFloat(this.state.start), parseFloat(this.state.finish), parseFloat(this.state.y0), parseFloat(this.state.h))
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
                                            x: x,
                                            y: yE,
                                            type: 'scatter',
                                            marker: { color: 'blue' },
                                            name: "Euler's"
                                        },
                                        {
                                            x: x,
                                            y: x.map(function (x) {
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
export default Heun;