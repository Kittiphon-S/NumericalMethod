import React, { Component } from 'react'
import {Card, Input, Button, Table} from 'antd';
import math from 'mathjs';
import '../screen.css';
import 'antd/dist/antd.css';
const InputStyle = {
    background: "#1890ff",
    color: "white", 
    fontWeight: "bold", 
    fontSize: "24px"

};


var A = [], B = [], matrixA = [], matrixB = [], matrixX = [],  x , epsilon, dataInTable = [], count=1, output
var columns = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
    },
    {
        title: "λ",
        dataIndex: "lambda",
        key: "lambda"
    },
    {
        title: "{X}",
        dataIndex: "X",
        key: "X"
    },
    {
        title: "Error",
        dataIndex: "error",
        key: "error"
    }
];
class Gradient extends Component {
    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            showDimentionForm : true,
            showDimentionButton: true,
            showMatrixForm: false,
            showMatrixButton: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.conjugate_gradient = this.conjugate_gradient.bind(this);
    
    }
    positive_definite(dimention) {
        var tempMatrix = []
        for (var i=0 ; i<dimention ; i++) {
            tempMatrix[i] = []
            for (var j=0 ; j<dimention ; j++) {
                tempMatrix[i][j] = A[i][j];
            }
        }
        if (math.det(tempMatrix) <= 0) {
            return false;
        }
        if (dimention !== this.state.row-1) {
            return this.positive_definite(++dimention);
        }
        return true;
    }
  
    conjugate_gradient() {
        this.initMatrix();
        if (!this.positive_definite(1)) {
            output = "This matrix doesn't positive definite"
            this.setState({
                showOutputCard: true
            });
            return false;
        }
        //find {R0}
        var R = math.subtract(math.multiply(A,x), B);
        console.log(R)
        //find D0
        var D = math.multiply(R, -1);
        console.log(D)
        do {
            //find λ
            var λ = (math.multiply(math.multiply(math.transpose(D), R), -1)) / 
                    (math.multiply(math.multiply(math.transpose(D), A), D))
            console.log(λ)
            /*------------------------------------------------------------------*/

            //find new {X}
            x = math.add(x, math.multiply(λ, D));
            console.log(x)
            //find new {R}
            R = math.subtract(math.multiply(A, x), B);
            console.log(R)
            //find epsilon
            epsilon = Math.sqrt(math.multiply(math.transpose(R), R)).toFixed(8);
            this.appendTable(λ, JSON.stringify(x).split(',').join(",\n"), epsilon);
            console.log(epsilon)
            var α = (math.multiply(math.multiply(math.transpose(R), A), D)) /
                    math.multiply(math.transpose(D), math.multiply(A, D)).toFixed(8);
            console.log(α)
            D = math.add(math.multiply(R, -1), math.multiply(α, D))
            console.log(D)
        }while (epsilon > 0.000001);
        output = x
        this.setState({
            showOutputCard: true
        });

      
    }
    createMatrix(row, column) {
        A = []
        B = []
        matrixA = []
        matrixB = []
        matrixX = []
        x = []
        dataInTable = []
        for (var i=1 ; i<=row ; i++) {
            for (var j=1 ; j<=column ; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%", 
                    backgroundColor:"#06d9a0", 
                    marginInlineEnd: "5%", 
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }} 
                id={"a"+i+""+j} key={"a"+i+""+j} placeholder={"a"+i+""+j} />)  
            }
            matrixA.push(<br/>)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%", 
                backgroundColor:"black", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"b"+i} key={"b"+i} placeholder={"b"+i} />)
            matrixX.push(<Input style={{
                width: "18%",
                height: "50%", 
                backgroundColor:"black", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"x"+i} key={"x"+i} placeholder={"x"+i} />)
                
            
        }

        this.setState({
            showDimentionForm: false,
            showDimentionButton: false,
            showMatrixForm: true,
            showMatrixButton: true
        })

        

    }
    initMatrix() {
        for(var i=0 ; i<this.state.row ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.column ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
            x.push(parseFloat(document.getElementById("x"+(i+1)).value));
        }
    }
    appendTable(lambda, x, error) {
         dataInTable.push({
             iteration: count++,
             lambda: lambda,
             X: x,
             error: error
         });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return(
            <div style={{ background: "#FFFF", padding: "30px", float:"left"}}>
                <h2 style={{color: "black", fontWeight: "bold"}}>Conjugate Gradient Iteration Method</h2>
                <div>
                    <Card
                    bordered={true}
                    style={{ width: 400, background: "#f44336", color: "#FFFFFFFF", float:"left"}}
                    onChange={this.handleChange}
                    >
                        {this.state.showMatrixForm && <div><h2>Matrix [A]</h2><br/>{matrixA}<h2>Vector [B]<br/></h2>{matrixB}<h2>Initial X<br/></h2>{matrixX}</div>}
                        
                        {this.state.showDimentionForm && 
                            <div>
                                <h2>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                                <h2>Column</h2><Input size="large" name="column" style={InputStyle}></Input>
                            </div> 
                        }
                        <br></br>
                        {this.state.showDimentionButton && 
                            <Button id="dimention_button" onClick= {
                                ()=>{this.createMatrix(this.state.row, this.state.column)}
                                }  
                                style={{background: "#4caf50", color: "white", fontSize: "20px"}}>
                                Submit<br></br>
                                </Button>
                        }
                        {this.state.showMatrixButton && 
                            <Button 
                                id="matrix_button"  
                                style={{background: "blue", color: "white", fontSize: "20px"}}
                                onClick={()=>this.conjugate_gradient(parseInt(this.state.row))}>
                                Submit
                            </Button>
                        }
                        
                    </Card>
                    

                    {this.state.showOutputCard && 
                        <div>     
                            <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: 400, background: "#3d683d", color: "#FFFFFFFF", float:"left"}}
                            onChange={this.handleChange}  id="answerCard">
                                <p style={{fontSize: "24px", fontWeight: "bold"}}>{JSON.stringify(output)}</p>
                            </Card>    
                            <Card
                            title={"Output"}
                            bordered={true}
                            style={{width: "100%", background: "#2196f3", color: "#FFFFFFFF", float:"left", marginBlockStart:"2%"}}
                            id="outputCard"
                            >
                                <Table columns={columns} dataSource={dataInTable} bordered={true} bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "black", overflowX: "scroll"}}
                                ></Table>
                            </Card>
                        
                        </div>

                    }   

                   
                </div>

                
            </div>
        );
    }
}
export default Gradient;



