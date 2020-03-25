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
        title: "Y",
        key: "y",
        dataIndex: "y"
    }
];
const xValues = math.range(-10, 10, 0.5).toArray();
var fx = " ";
class Graphical extends Component {

    constructor() {
        super();
        this.state = {
            fx: "e^(-x/4)*(2-x)-1",
            start: 0,
            finish: 10,
            err: 0.0001,

            data: [],

            showGraph: false

        }
        //this.handleChange = this.handleChange.bind(this);
        //this.graphical = this.graphical.bind(this);
    }

    graphical = () => {
        if (this.state.start > this.state.finish) {
            window.alert("Start < Finish");
        } else {
            fx = this.state.fx;
            this.state.data['x'] = []
            this.state.data['y'] = []
            console.log(typeof (this.state.start))
            for (var i = parseInt(this.state.start); i <= parseInt(this.state.finish); i++) {
                this.state.data['x'].push(i);
                this.state.data['y'].push(this.func(i).toFixed(8));
            }


            this.createTable(this.state.data['x'], this.state.data['y']);
            this.setState({
                showGraph: true
            })
        }

    }
    func = (X) => {
        var expr = math.compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    createTable = (x, y) => {
        dataInTable = []
        for (var i = 0; i < parseInt(this.state.finish - this.state.start); i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                y: y[i]
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

                    <alert color="primary"><h1>Graphical Method</h1></alert>

                    <div class="card">
                        <div class="card-body">
                            <form>
                                <div class="form-row" onChange={this.handleChange}>


                                    <div class="form-group col-md-12">
                                        <label for="fx"> <p className="text-primary">input Equal</p></label>
                                        <input type="text" class="form-control" name="fx" placeholder="e^(-x/4)*(2-x)-1" value={this.state.fx} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="start"><p className="text-primary">Start</p></label>
                                        <input type="text" class="form-control" name="start" placeholder="0" value={this.state.start} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="finish"><p className="text-primary">Finish</p></label>
                                        <input type="text" class="form-control" name="finish" placeholder="10" value={this.state.finish} />
                                    </div>


                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary btn-lg btn-block" onClick={
                                () => this.graphical(parseFloat(this.state.start), parseFloat(this.state.finish))
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
                                        {
                                            x: this.state.data['x'],
                                            y: this.state.data['y'],
                                            name: "Iteration",
                                            mode: 'markers',
                                            type: 'scatter',
                                            marker: { color: 'blue' },
                                        },
                                    ]}
                                    layout={{ title: 'Graphical Method' }}

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
export default Graphical;